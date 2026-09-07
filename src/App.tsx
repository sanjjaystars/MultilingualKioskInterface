import { useState, useEffect, useRef } from "react";
import signVideo from "./imports/sign_language.mp4";

type Language = {
  key: string;
  num: number;
  name: string;
  prompt: string;
  backLabel: string;
  inputPlaceholder: string;
  userGreeting: string;
  botGreeting: string;
  sendLabel: string;
};

const LANGUAGES: Language[] = [
  {
    key: "en", num: 1,
    name: "English Chatbot",
    prompt: "Press 1 to enable English chatbot",
    backLabel: "Back to Language Selection",
    inputPlaceholder: "Ask me anything in English...",
    userGreeting: "Hello",
    botGreeting: "Welcome. How can I assist you today?",
    sendLabel: "Send",
  },
  {
    key: "hi", num: 2,
    name: "हिंदी चैटबॉट",
    prompt: "हिंदी चैटबॉट शुरू करने के लिए 2 दबाएँ",
    backLabel: "भाषा चयन पर वापस जाएँ",
    inputPlaceholder: "हिंदी में कुछ भी पूछें...",
    userGreeting: "नमस्ते",
    botGreeting: "स्वागत है। मैं आपकी किस तरह मदद कर सकता हूँ?",
    sendLabel: "भेजें",
  },
  {
    key: "ta", num: 3,
    name: "தமிழ் சாட்பாட்",
    prompt: "தமிழ் சாட்பாட்டை இயக்க 3-ஐ அழுத்தவும்",
    backLabel: "மொழித் தேர்வுக்குத் திரும்பு",
    inputPlaceholder: "தமிழில் கேளுங்கள்...",
    userGreeting: "வணக்கம்",
    botGreeting: "வணக்கம். நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    sendLabel: "அனுப்பு",
  },
  {
    key: "mr", num: 4,
    name: "मराठी चॅटबॉट",
    prompt: "मराठी चॅटबॉट सुरू करण्यासाठी 4 दाबा",
    backLabel: "भाषा निवडीवर परत जा",
    inputPlaceholder: "मराठीत काहीही विचारा...",
    userGreeting: "नमस्कार",
    botGreeting: "स्वागत आहे. मी तुम्हाला कशी मदत करू शकतो?",
    sendLabel: "पाठवा",
  },
  {
    key: "bn", num: 5,
    name: "বাংলা চ্যাটবট",
    prompt: "বাংলা চ্যাটবট চালু করতে 5 চাপুন",
    backLabel: "ভাষা নির্বাচনে ফিরে যান",
    inputPlaceholder: "বাংলায় যেকোনো কিছু জিজ্ঞেস করুন...",
    userGreeting: "হ্যালো",
    botGreeting: "স্বাগতম। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    sendLabel: "পাঠান",
  },
  {
    key: "te", num: 6,
    name: "తెలుగు చాట్‌బాట్",
    prompt: "తెలుగు చాట్‌బాట్‌ను ప్రారంభించడానికి 6 నొక్కండి",
    backLabel: "భాష ఎంపికకు తిరిగి వెళ్ళండి",
    inputPlaceholder: "తెలుగులో ఏదైనా అడగండి...",
    userGreeting: "హలో",
    botGreeting: "స్వాగతం. నేను మీకు ఎలా సహాయపడగలను?",
    sendLabel: "పంపండి",
  },
  {
    key: "kn", num: 7,
    name: "ಕನ್ನಡ ಚಾಟ್‌ಬಾಟ್",
    prompt: "ಕನ್ನಡ ಚಾಟ್‌ಬಾಟ್ ಅನ್ನು ಪ್ರಾರಂಭಿಸಲು 7 ಒತ್ತಿರಿ",
    backLabel: "ಭಾಷಾ ಆಯ್ಕೆಗೆ ಹಿಂತಿರುಗಿ",
    inputPlaceholder: "ಕನ್ನಡದಲ್ಲಿ ಏನಾದರೂ ಕೇಳಿ...",
    userGreeting: "ನಮಸ್ಕಾರ",
    botGreeting: "ಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
    sendLabel: "ಕಳುಹಿಸಿ",
  },
  {
    key: "ml", num: 8,
    name: "മലയാളം ചാറ്റ്‌ബോട്ട്",
    prompt: "മലയാളം ചാറ്റ്‌ബോട്ട് പ്രവർത്തനക്ഷമമാക്കാൻ 8 അമർത്തുക",
    backLabel: "ഭാഷ തിരഞ്ഞെടുക്കലിലേക്ക് മടങ്ങുക",
    inputPlaceholder: "മലയാളത്തിൽ എന്തും ചോദിക്കൂ...",
    userGreeting: "ഹലോ",
    botGreeting: "സ്വാഗതം. ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കട്ടെ?",
    sendLabel: "അയയ്ക്കുക",
  },
  {
    key: "pa", num: 9,
    name: "ਪੰਜਾਬੀ ਚੈਟਬੋਟ",
    prompt: "ਪੰਜਾਬੀ ਚੈਟਬੋਟ ਚਾਲੂ ਕਰਨ ਲਈ 9 ਦਬਾਓ",
    backLabel: "ਭਾਸ਼ਾ ਚੋਣ ਤੇ ਵਾਪਸ ਜਾਓ",
    inputPlaceholder: "ਪੰਜਾਬੀ ਵਿੱਚ ਕੁਝ ਵੀ ਪੁੱਛੋ...",
    userGreeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    botGreeting: "ਜੀ ਆਇਆਂ ਨੂੰ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    sendLabel: "ਭੇਜੋ",
  },
];

type Message = { role: "user" | "bot"; text: string };

/* ─── Language Selection Screen ─────────────────────────────────────── */
function SelectionScreen({ onSelect }: { onSelect: (l: Language) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#E3F2FD",
      display: "flex", flexDirection: "column",
      padding: "6px 8px",
      gap: 4,
      overflow: "hidden",
      fontFamily: "'Noto Sans', sans-serif",
    }}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.key}
          onClick={() => onSelect(lang)}
          onMouseEnter={() => setHovered(lang.num)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: hovered === lang.num ? "#F0F8FF" : "#FFFFFF",
            border: hovered === lang.num ? "1.5px solid #1976D2" : "1.5px solid rgba(25,118,210,0.12)",
            borderRadius: 7,
            padding: "6px 11px",
            cursor: "pointer",
            textAlign: "left",
            width: "100%",
            flex: 1,
            boxShadow: hovered === lang.num
              ? "0 2px 8px rgba(25,118,210,0.18)"
              : "0 1px 3px rgba(13,71,161,0.09)",
            transition: "all 0.13s",
            fontFamily: "'Noto Sans', sans-serif",
            minHeight: 0,
          }}
        >
          {/* Rounded-square number badge */}
          <div style={{
            width: 30, height: 30,
            borderRadius: 6,
            background: "#1565C0",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FFFFFF",
            fontSize: 14, fontWeight: 700,
            flexShrink: 0,
            boxShadow: "0 2px 5px rgba(21,101,192,0.35)",
          }}>
            {lang.num}
          </div>
          <span style={{
            color: "#0D47A1",
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1.25,
          }}>
            {lang.prompt}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Sign Language Avatar ───────────────────────────────────────────── */
function SignAvatar({ active }: { active: boolean }) {
  useEffect(() => {
    if (document.getElementById("sign-keyframes")) return;
    const style = document.createElement("style");
    style.id = "sign-keyframes";
    style.textContent = `
      @keyframes signFloat {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-5px); }
      }
      @keyframes signBob {
        0%, 100% { transform: translateY(0px) scale(1); }
        50%       { transform: translateY(-3px) scale(1.012); }
      }
      @keyframes signPulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.45; }
      }
      @keyframes signGlow {
        0%, 100% { opacity: 0.4; transform: translateX(-50%) scale(1); }
        50%       { opacity: 0.9; transform: translateX(-50%) scale(1.18); }
      }
      @keyframes signActive {
        0%   { box-shadow: 0 0 0 0 rgba(105,240,174,0.5); }
        70%  { box-shadow: 0 0 0 8px rgba(105,240,174,0); }
        100% { box-shadow: 0 0 0 0 rgba(105,240,174,0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const anim = active ? "running" : "paused";

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(180deg, #071a4a 0%, #0a2a72 60%, #0d3a8a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Radial glow behind avatar */}
      <div style={{
        position: "absolute",
        bottom: 30, left: "50%",
        width: 110, height: 110,
        borderRadius: "50%",
        background: active
          ? "radial-gradient(circle, rgba(105,240,174,0.22) 0%, rgba(66,165,245,0.18) 50%, transparent 75%)"
          : "radial-gradient(circle, rgba(66,165,245,0.10) 0%, transparent 70%)",
        transition: "background 0.6s ease",
        animation: active ? `signGlow 2.2s ease-in-out infinite ${anim}` : "none",
        pointerEvents: "none",
        transform: "translateX(-50%)",
      }} />

      {/* Floor reflection */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 28,
        background: "linear-gradient(0deg, rgba(13,71,161,0.55) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Avatar video */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}>
        <video
          src={signVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            filter: active
              ? "drop-shadow(0 0 8px rgba(105,240,174,0.4)) brightness(1.05)"
              : "brightness(0.95)",
            transition: "filter 0.5s ease",
          }}
        />
      </div>

      {/* Status label */}
      <div style={{
        flexShrink: 0,
        background: "rgba(0,0,20,0.55)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        width: "100%",
        padding: "5px 8px",
        textAlign: "center",
        backdropFilter: "blur(6px)",
      }}>
        <div style={{
          color: "#E3F2FD", fontSize: 8, fontWeight: 700,
          letterSpacing: "0.13em", textTransform: "uppercase",
          marginBottom: 3,
        }}>
          AI Sign Language
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: active ? "#69F0AE" : "#90CAF9",
            boxShadow: active ? "0 0 7px #69F0AE" : "none",
            animation: active ? `signPulse 1.1s ease-in-out infinite ${anim}` : "none",
            transition: "background 0.4s, box-shadow 0.4s",
          }} />
          <span style={{ color: "#BBDEFB", fontSize: 7.5, fontWeight: 600, letterSpacing: "0.05em" }}>
            {active ? "Interpreting..." : "Standby"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Chatbot Screen ─────────────────────────────────────────────────── */
function ChatScreen({ lang, onBack }: { lang: Language; onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "user", text: lang.userGreeting },
    { role: "bot", text: lang.botGreeting },
  ]);
  const [input, setInput] = useState("");
  const [signing, setSigning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animate avatar whenever a bot message arrives
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === "bot") {
      setSigning(true);
      const t = setTimeout(() => setSigning(false), 4000);
      return () => clearTimeout(t);
    }
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [
      ...prev,
      { role: "user", text },
      { role: "bot", text: lang.botGreeting },
    ]);
    setInput("");
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#E3F2FD",
      display: "flex", flexDirection: "column",
      fontFamily: "'Noto Sans', sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        background: "#0D47A1",
        padding: "8px 12px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>
            {lang.name}
          </span>
        </div>
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            borderRadius: 7,
            padding: "5px 10px",
            color: "#E3F2FD",
            fontSize: 10, fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Noto Sans', sans-serif",
            flexShrink: 0,
            transition: "background 0.13s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          ← {lang.backLabel}
        </button>
      </div>

      {/* Body: full-width chat with PiP video overlay */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>

        {/* ── Picture-in-picture sign language box ── */}
        <div style={{
          position: "absolute",
          bottom: 58,
          left: 10,
          width: 120,
          height: 144,
          borderRadius: 10,
          overflow: "hidden",
          zIndex: 20,
          boxShadow: signing
            ? "0 0 0 2px #69F0AE, 0 4px 16px rgba(0,0,0,0.45)"
            : "0 0 0 2px rgba(25,118,210,0.5), 0 4px 14px rgba(0,0,0,0.35)",
          transition: "box-shadow 0.4s ease",
          background: "#071a4a",
        }}>
          <SignAvatar active={signing} />
        </div>

        {/* ── Chat messages ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: "8px 8px 4px",
            display: "flex", flexDirection: "column", gap: 6,
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: 5,
              }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "8px 11px",
                  borderRadius: msg.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                  background: msg.role === "user" ? "#1565C0" : "#FFFFFF",
                  color: msg.role === "user" ? "#FFFFFF" : "#0D47A1",
                  fontSize: 12, fontWeight: 400, lineHeight: 1.4,
                  boxShadow: msg.role === "user"
                    ? "0 2px 6px rgba(21,101,192,0.28)"
                    : "0 2px 6px rgba(13,71,161,0.09)",
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            background: "#FFFFFF",
            borderTop: "1.5px solid rgba(25,118,210,0.13)",
            padding: "7px 8px",
            display: "flex", gap: 6, alignItems: "center",
            flexShrink: 0,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder={lang.inputPlaceholder}
              style={{
                flex: 1,
                padding: "7px 10px",
                borderRadius: 7,
                border: "2px solid #BBDEFB",
                fontSize: 11, color: "#0D47A1",
                background: "#F8FBFF",
                outline: "none",
                fontFamily: "'Noto Sans', sans-serif",
                transition: "border-color 0.13s",
              }}
              onFocus={e => e.target.style.borderColor = "#1976D2"}
              onBlur={e => e.target.style.borderColor = "#BBDEFB"}
            />
            <button
              onClick={send}
              style={{
                background: "#1565C0",
                border: "none", borderRadius: 7,
                padding: "7px 13px",
                color: "#FFFFFF",
                fontSize: 11, fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Noto Sans', sans-serif",
                transition: "background 0.13s",
                flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#0D47A1"}
              onMouseLeave={e => e.currentTarget.style.background = "#1565C0"}
            >
              {lang.sendLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Physical Keypad Key ────────────────────────────────────────────── */
function Key({ label, onPress }: { label: string; onPress?: () => void }) {
  const [pressed, setPressed] = useState(false);
  const isNumeric = /^[1-9]$/.test(label);
  const isReset = label === "RST";
  const isUndo = label === "UND";

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); onPress?.(); }}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={e => { e.preventDefault(); setPressed(true); }}
      onTouchEnd={e => { e.preventDefault(); setPressed(false); onPress?.(); }}
      style={{
        width: 46, height: 36,
        borderRadius: 6,
        background: pressed
          ? "#9aa4ae"
          : "linear-gradient(180deg, #dde3e8 0%, #c4ccd4 100%)",
        border: "1px solid #8a949e",
        boxShadow: pressed
          ? "inset 0 2px 4px rgba(0,0,0,0.28)"
          : "0 3px 0 #7a838c, 0 4px 5px rgba(0,0,0,0.22)",
        color: isReset ? "#b71c1c" : isUndo ? "#e65100" : isNumeric ? "#1565C0" : "#445",
        fontSize: isNumeric ? 16 : 10,
        fontWeight: 700,
        cursor: "pointer",
        transform: pressed ? "translateY(2px)" : "none",
        transition: "transform 0.05s, box-shadow 0.05s",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "monospace",
        userSelect: "none",
        outline: "none",
      }}
    >
      {label}
    </button>
  );
}

/* ─── App Root ───────────────────────────────────────────────────────── */
export default function App() {
  const [activeLang, setActiveLang] = useState<Language | null>(null);
  const [micActive, setMicActive] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        setActiveLang(LANGUAGES.find(l => l.num === num) ?? null);
      }
      if (e.key === "Escape") setActiveLang(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const pressKey = (label: string) => {
    const num = parseInt(label, 10);
    if (num >= 1 && num <= 9) {
      setActiveLang(LANGUAGES.find(l => l.num === num) ?? null);
    }
    if (label === "RST") setActiveLang(null);
  };

  const KEYPAD_ROWS = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["RST", "0", "UND"],
  ];

  // 10" × 7" at 80px/inch → 800 × 560px shell
  const W = 800;
  const H = 560;

  // Screen area: left portion of the panel (inside bezel)
  // Control panel: right portion
  const CTRL_W = 200;
  const SCREEN_W = W - CTRL_W - 36 - 18; // margins

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#3a4450",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Noto Sans', sans-serif",
    }}>
      {/*
        Kiosk shell — 10 × 7 inch landscape
        Rendered at 80 px/inch → 800 × 560 px
      */}
      <div style={{
        width: W,
        height: H,
        background: "linear-gradient(160deg, #c6cdd5 0%, #b2bac2 55%, #96a0a8 100%)",
        borderRadius: 20,
        boxShadow: `
          0 24px 64px rgba(0,0,0,0.60),
          0 6px 16px rgba(0,0,0,0.40),
          inset 0 1px 0 rgba(255,255,255,0.45),
          inset 0 -1px 0 rgba(0,0,0,0.20)
        `,
        border: "2px solid #7e878f",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        overflow: "hidden",
        position: "relative",
      }}>

        {/* ── Subtle top-edge highlight ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 100%)",
          borderRadius: "20px 20px 0 0",
          pointerEvents: "none",
          zIndex: 20,
        }} />

        {/* ══ LEFT: Screen area ══ */}
        <div style={{
          flex: 1,
          padding: "18px 0 18px 18px",
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Bezel */}
          <div style={{
            flex: 1,
            background: "#111",
            borderRadius: 10,
            padding: 7,
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.3)",
          }}>
            {/* Screen glass */}
            <div style={{
              width: "100%", height: "100%",
              borderRadius: 5,
              overflow: "hidden",
              position: "relative",
              background: "#E3F2FD",
            }}>
              {/* Glare overlay */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "28%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
                pointerEvents: "none", zIndex: 10,
                borderRadius: "5px 5px 0 0",
              }} />

              {activeLang
                ? <ChatScreen lang={activeLang} onBack={() => setActiveLang(null)} />
                : <SelectionScreen onSelect={setActiveLang} />
              }
            </div>
          </div>
        </div>

        {/* ══ DIVIDER ridge ══ */}
        <div style={{
          width: 10,
          margin: "24px 0",
          background: "linear-gradient(90deg, #8a949c 0%, #a8b0b8 40%, #8a949c 100%)",
          borderRadius: 4,
          boxShadow: "inset 1px 0 2px rgba(0,0,0,0.2), inset -1px 0 2px rgba(255,255,255,0.2)",
          alignSelf: "stretch",
          flexShrink: 0,
        }} />

        {/* ══ RIGHT: Control panel ══ */}
        <div style={{
          width: CTRL_W,
          padding: "20px 16px 20px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexShrink: 0,
        }}>

          {/* Brand label */}
          <div style={{
            textAlign: "center",
            color: "#4a5260",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            lineHeight: 1.4,
          }}>
            SAHAYAK
          </div>

          {/* Keypad */}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {KEYPAD_ROWS.map((row, ri) => (
              <div key={ri} style={{ display: "flex", gap: 7 }}>
                {row.map(label => (
                  <Key key={label} label={label} onPress={() => pressKey(label)} />
                ))}
              </div>
            ))}
          </div>

          {/* MIC + SPEAKER row */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            width: "100%",
          }}>
            {/* MIC */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <button
                onMouseDown={() => setMicActive(true)}
                onMouseUp={() => setMicActive(false)}
                onMouseLeave={() => setMicActive(false)}
                style={{
                  width: 48, height: 48,
                  borderRadius: "50%",
                  background: micActive
                    ? "radial-gradient(circle, #1a1a1a 0%, #111 100%)"
                    : "radial-gradient(circle, #2e2e2e 0%, #181818 100%)",
                  border: "2.5px solid #4a4a4a",
                  boxShadow: micActive
                    ? "inset 0 2px 6px rgba(0,0,0,0.7), 0 0 14px rgba(25,118,210,0.55)"
                    : "0 3px 8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "box-shadow 0.1s",
                  outline: "none",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="9" y="2" width="6" height="11" rx="3"
                    fill={micActive ? "#42A5F5" : "#999"} />
                  <path d="M5 11c0 3.866 3.134 7 7 7s7-3.134 7-7"
                    stroke={micActive ? "#42A5F5" : "#999"}
                    strokeWidth="2" strokeLinecap="round" fill="none" />
                  <line x1="12" y1="18" x2="12" y2="22"
                    stroke={micActive ? "#42A5F5" : "#999"}
                    strokeWidth="2" strokeLinecap="round" />
                  <line x1="9" y1="22" x2="15" y2="22"
                    stroke={micActive ? "#42A5F5" : "#999"}
                    strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <span style={{ color: "#4a5260", fontSize: 8, fontWeight: 700, letterSpacing: "0.12em" }}>MIC</span>
            </div>

            {/* SPEAKER grille */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 58, height: 58,
                borderRadius: 9,
                background: "linear-gradient(135deg, #2e2e2e 0%, #1a1a1a 100%)",
                border: "2px solid #444",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.3)",
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 3,
                padding: 8,
                alignContent: "center",
              }}>
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} style={{
                    width: 5, height: 5,
                    borderRadius: "50%",
                    background: "#4a4a4a",
                    boxShadow: "inset 0 1px 1px rgba(0,0,0,0.9)",
                  }} />
                ))}
              </div>
              <span style={{ color: "#4a5260", fontSize: 8, fontWeight: 700, letterSpacing: "0.12em" }}>SPEAKER</span>
            </div>
          </div>

          {/* Status LED */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <div style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: activeLang ? "#4CAF50" : "#42A5F5",
              boxShadow: activeLang
                ? "0 0 6px #4CAF50"
                : "0 0 6px #42A5F5",
            }} />
            <span style={{ color: "#556", fontSize: 8, fontWeight: 600, letterSpacing: "0.08em" }}>
              {activeLang ? "ACTIVE" : "READY"}
            </span>
          </div>
        </div>
      </div>

      {/* Dimension label */}
      <div style={{
        position: "fixed", bottom: 12, right: 16,
        color: "rgba(255,255,255,0.35)",
        fontSize: 11, fontFamily: "monospace",
        letterSpacing: "0.06em",
      }}>
        10″ × 7″
      </div>
    </div>
  );
}
