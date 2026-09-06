import { useState, useEffect, useRef } from "react";

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
      @keyframes signLeftArm {
        0%   { transform: rotate(-15deg); }
        15%  { transform: rotate(-55deg); }
        35%  { transform: rotate(-25deg); }
        55%  { transform: rotate(-65deg); }
        75%  { transform: rotate(-10deg); }
        100% { transform: rotate(-15deg); }
      }
      @keyframes signRightArm {
        0%   { transform: rotate(20deg); }
        20%  { transform: rotate(58deg); }
        40%  { transform: rotate(12deg); }
        60%  { transform: rotate(48deg); }
        80%  { transform: rotate(28deg); }
        100% { transform: rotate(20deg); }
      }
      @keyframes signLeftFore {
        0%   { transform: rotate(5deg); }
        25%  { transform: rotate(-30deg); }
        50%  { transform: rotate(20deg); }
        75%  { transform: rotate(-15deg); }
        100% { transform: rotate(5deg); }
      }
      @keyframes signRightFore {
        0%   { transform: rotate(-5deg); }
        25%  { transform: rotate(28deg); }
        50%  { transform: rotate(-18deg); }
        75%  { transform: rotate(22deg); }
        100% { transform: rotate(-5deg); }
      }
      @keyframes signLeftWrist {
        0%   { transform: rotate(0deg); }
        30%  { transform: rotate(-25deg); }
        60%  { transform: rotate(20deg); }
        100% { transform: rotate(0deg); }
      }
      @keyframes signRightWrist {
        0%   { transform: rotate(0deg); }
        30%  { transform: rotate(22deg); }
        60%  { transform: rotate(-18deg); }
        100% { transform: rotate(0deg); }
      }
      @keyframes signBlink {
        0%, 88%, 100% { scaleY: 1; transform: scaleY(1); }
        93%            { transform: scaleY(0.08); }
      }
      @keyframes signPulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.5; }
      }
      @keyframes signFloat {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-4px); }
      }
      @keyframes bgGlow {
        0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
        50%       { opacity: 0.85; transform: translateX(-50%) scale(1.12); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const anim = active ? "running" : "paused";

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(180deg, #071a4a 0%, #0a2a72 55%, #0d3a8a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Floor gradient */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 32,
        background: "linear-gradient(0deg, rgba(13,71,161,0.6) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Ambient glow behind figure */}
      <div style={{
        position: "absolute",
        bottom: 38, left: "50%",
        width: 90, height: 90,
        borderRadius: "50%",
        background: active
          ? "radial-gradient(circle, rgba(66,165,245,0.35) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(66,165,245,0.12) 0%, transparent 70%)",
        animation: active ? `bgGlow 2s ease-in-out infinite ${anim}` : "none",
        pointerEvents: "none",
        transform: "translateX(-50%)",
        transition: "background 0.5s",
      }} />

      {/* ── Avatar figure ── */}
      <div style={{
        animation: active ? `signFloat 3s ease-in-out infinite ${anim}` : "none",
        marginBottom: 10,
        position: "relative",
        filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.55))",
      }}>
        <svg width="106" height="154" viewBox="0 0 106 154" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Skin gradient */}
            <radialGradient id="skinFace" cx="45%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#f5c5a3" />
              <stop offset="60%" stopColor="#e8a882" />
              <stop offset="100%" stopColor="#c97c50" />
            </radialGradient>
            <linearGradient id="skinArm" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e8a882" />
              <stop offset="100%" stopColor="#d4895e" />
            </linearGradient>
            <linearGradient id="skinHand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0b48a" />
              <stop offset="100%" stopColor="#d48060" />
            </linearGradient>
            {/* Hair */}
            <radialGradient id="hairGrad" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#5c3317" />
              <stop offset="100%" stopColor="#1a0a00" />
            </radialGradient>
            {/* Shirt */}
            <linearGradient id="shirtGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1976D2" />
              <stop offset="100%" stopColor="#0d47a1" />
            </linearGradient>
            {/* Pants */}
            <linearGradient id="pantsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a237e" />
              <stop offset="100%" stopColor="#0d1642" />
            </linearGradient>
            {/* Shoe */}
            <linearGradient id="shoeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2a2a" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
            {/* Eye iris */}
            <radialGradient id="irisGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#6b4226" />
              <stop offset="100%" stopColor="#2a1500" />
            </radialGradient>
          </defs>

          {/* ══ SHADOW on floor ══ */}
          <ellipse cx="53" cy="151" rx="22" ry="4" fill="rgba(0,0,0,0.35)" />

          {/* ══ LEGS ══ */}
          {/* Left leg */}
          <path d="M36 95 Q33 118 32 140 Q34 142 39 142 Q42 142 43 140 Q42 118 42 95Z" fill="url(#pantsGrad)" />
          {/* Right leg */}
          <path d="M63 95 Q64 118 63 140 Q61 142 56 142 Q53 142 52 140 Q52 118 57 95Z" fill="url(#pantsGrad)" />
          {/* Knee highlight */}
          <ellipse cx="37" cy="118" rx="3.5" ry="2" fill="rgba(255,255,255,0.07)" />
          <ellipse cx="60" cy="118" rx="3.5" ry="2" fill="rgba(255,255,255,0.07)" />

          {/* ══ SHOES ══ */}
          {/* Left shoe */}
          <path d="M28 140 Q29 146 35 148 Q42 149 46 146 Q47 143 43 141 Q40 140 28 140Z" fill="url(#shoeGrad)" />
          <path d="M28 140 Q28 143 31 144 Q34 145 28 140Z" fill="rgba(255,255,255,0.12)" />
          {/* Right shoe */}
          <path d="M78 140 Q77 146 71 148 Q64 149 60 146 Q59 143 63 141 Q66 140 78 140Z" fill="url(#shoeGrad)" />

          {/* ══ TORSO ══ */}
          <path d="M30 56 Q28 95 30 96 L45 98 L60 96 Q62 95 60 56 Q55 52 45 52 Q35 52 30 56Z" fill="url(#shirtGrad)" />
          {/* Shirt shading */}
          <path d="M30 56 Q29 75 30 96 L35 97 Q34 75 34 56Z" fill="rgba(0,0,0,0.12)" />
          <path d="M60 56 Q61 75 60 96 L55 97 Q56 75 56 56Z" fill="rgba(0,0,0,0.08)" />
          {/* Shirt collar V */}
          <path d="M42 54 L45 64 L48 54" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Shirt button line */}
          <line x1="45" y1="64" x2="45" y2="94" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 3" />
          {/* Chest pocket */}
          <rect x="32" y="62" width="9" height="7" rx="1.5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />

          {/* ══ NECK ══ */}
          <path d="M41 46 Q41 54 43 55 L47 55 Q49 54 49 46Z" fill="#d4895e" />
          {/* Neck shadow */}
          <path d="M41 46 Q41 54 43 55 L44 55 Q43 54 42 46Z" fill="rgba(0,0,0,0.15)" />

          {/* ══ LEFT ARM ══ (pivot at left shoulder ~x30,y58) */}
          <g style={{ transformOrigin: "30px 60px", animation: `signLeftArm 2.8s ease-in-out infinite ${anim}` }}>
            {/* Upper arm */}
            <path d="M30 58 Q22 60 16 70 Q14 75 16 78 Q19 80 22 78 Q26 70 30 65Z" fill="url(#shirtGrad)" />
            {/* Elbow joint */}
            <circle cx="17" cy="77" r="4" fill="#1565C0" />
            {/* Forearm pivot at elbow */}
            <g style={{ transformOrigin: "17px 77px", animation: `signLeftFore 2.8s ease-in-out infinite ${anim}` }}>
              <path d="M17 77 Q10 83 7 93 Q6 97 9 99 Q12 100 14 97 Q16 89 19 80Z" fill="url(#skinArm)" />
              {/* Wrist / hand pivot */}
              <g style={{ transformOrigin: "10px 97px", animation: `signLeftWrist 2.8s ease-in-out infinite ${anim}` }}>
                {/* Palm */}
                <path d="M7 94 Q4 97 5 103 Q7 108 12 108 Q17 107 18 103 Q18 97 15 94Z" fill="url(#skinHand)" />
                {/* Thumb */}
                <path d="M5 100 Q1 98 1 94 Q2 91 5 92 Q7 93 7 96Z" fill="url(#skinHand)" />
                {/* Index finger */}
                <path d="M9 94 Q8 88 9 84 Q10 82 12 83 Q13 84 13 88 Q13 92 12 94Z" fill="url(#skinHand)" />
                {/* Middle finger */}
                <path d="M12 94 Q11 87 12 83 Q13 81 15 82 Q16 83 16 87 Q16 92 15 94Z" fill="url(#skinHand)" />
                {/* Ring finger */}
                <path d="M15 94 Q14 88 15 84 Q16 82 18 83 Q19 84 19 88 Q18 92 17 94Z" fill="url(#skinHand)" />
                {/* Pinky */}
                <path d="M17 95 Q17 90 18 87 Q19 85 20 86 Q21 87 21 90 Q20 93 19 95Z" fill="url(#skinHand)" />
                {/* Knuckle lines */}
                <path d="M8 94 Q12 96 18 94" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" fill="none" />
              </g>
            </g>
          </g>

          {/* ══ RIGHT ARM ══ (pivot at right shoulder ~x60,y58) */}
          <g style={{ transformOrigin: "70px 60px", animation: `signRightArm 2.4s ease-in-out infinite ${anim}` }}>
            {/* Upper arm */}
            <path d="M70 58 Q78 60 84 70 Q86 75 84 78 Q81 80 78 78 Q74 70 70 65Z" fill="url(#shirtGrad)" />
            {/* Elbow joint */}
            <circle cx="83" cy="77" r="4" fill="#1565C0" />
            {/* Forearm */}
            <g style={{ transformOrigin: "83px 77px", animation: `signRightFore 2.4s ease-in-out infinite ${anim}` }}>
              <path d="M83 77 Q90 83 93 93 Q94 97 91 99 Q88 100 86 97 Q84 89 81 80Z" fill="url(#skinArm)" />
              {/* Wrist/hand */}
              <g style={{ transformOrigin: "90px 97px", animation: `signRightWrist 2.4s ease-in-out infinite ${anim}` }}>
                {/* Palm */}
                <path d="M93 94 Q96 97 95 103 Q93 108 88 108 Q83 107 82 103 Q82 97 85 94Z" fill="url(#skinHand)" />
                {/* Thumb */}
                <path d="M95 100 Q99 98 99 94 Q98 91 95 92 Q93 93 93 96Z" fill="url(#skinHand)" />
                {/* Index */}
                <path d="M91 94 Q92 88 91 84 Q90 82 88 83 Q87 84 87 88 Q87 92 88 94Z" fill="url(#skinHand)" />
                {/* Middle */}
                <path d="M88 94 Q89 87 88 83 Q87 81 85 82 Q84 83 84 87 Q84 92 85 94Z" fill="url(#skinHand)" />
                {/* Ring */}
                <path d="M85 94 Q86 88 85 84 Q84 82 82 83 Q81 84 81 88 Q82 92 83 94Z" fill="url(#skinHand)" />
                {/* Pinky */}
                <path d="M83 95 Q83 90 82 87 Q81 85 80 86 Q79 87 79 90 Q80 93 81 95Z" fill="url(#skinHand)" />
                {/* Knuckle */}
                <path d="M92 94 Q88 96 82 94" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" fill="none" />
              </g>
            </g>
          </g>

          {/* ══ HEAD ══ */}
          {/* Hair back */}
          <ellipse cx="45" cy="22" rx="18" ry="17" fill="url(#hairGrad)" />
          {/* Hair side pieces */}
          <path d="M27 22 Q25 30 27 38 Q30 36 31 30 Q30 26 27 22Z" fill="url(#hairGrad)" />
          <path d="M63 22 Q65 30 63 38 Q60 36 59 30 Q60 26 63 22Z" fill="url(#hairGrad)" />

          {/* Face */}
          <path d="M30 24 Q30 10 45 8 Q60 10 60 24 Q61 36 58 42 Q54 48 45 48 Q36 48 32 42 Q29 36 30 24Z" fill="url(#skinFace)" />

          {/* Ear left */}
          <path d="M30 26 Q26 26 25 30 Q25 34 28 35 Q30 35 30 32Z" fill="#d4895e" />
          <path d="M27 28 Q26 30 27 32" stroke="#c07050" strokeWidth="0.8" fill="none" />
          {/* Ear right */}
          <path d="M60 26 Q64 26 65 30 Q65 34 62 35 Q60 35 60 32Z" fill="#d4895e" />
          <path d="M63 28 Q64 30 63 32" stroke="#c07050" strokeWidth="0.8" fill="none" />

          {/* Eyebrows */}
          <path d="M33 22 Q37 19 41 21" stroke="#3e1f00" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M49 21 Q53 19 57 22" stroke="#3e1f00" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Eyes — whites */}
          <ellipse cx="37" cy="27" rx="5" ry="4" fill="white" />
          <ellipse cx="53" cy="27" rx="5" ry="4" fill="white" />

          {/* Iris + pupil left */}
          <g style={{ transformOrigin: "37px 27px", animation: `signBlink 4s ease-in-out infinite ${anim}` }}>
            <circle cx="37" cy="27" r="3" fill="url(#irisGrad)" />
            <circle cx="37" cy="27" r="1.6" fill="#0a0500" />
            <circle cx="38.2" cy="25.8" r="0.9" fill="rgba(255,255,255,0.85)" />
            <circle cx="36" cy="28" r="0.4" fill="rgba(255,255,255,0.4)" />
          </g>
          {/* Eyelid crease left */}
          <path d="M32 27 Q37 24 42 27" stroke="rgba(180,100,60,0.4)" strokeWidth="0.7" fill="none" />

          {/* Iris + pupil right */}
          <g style={{ transformOrigin: "53px 27px", animation: `signBlink 4s ease-in-out 0.06s infinite ${anim}` }}>
            <circle cx="53" cy="27" r="3" fill="url(#irisGrad)" />
            <circle cx="53" cy="27" r="1.6" fill="#0a0500" />
            <circle cx="54.2" cy="25.8" r="0.9" fill="rgba(255,255,255,0.85)" />
            <circle cx="52" cy="28" r="0.4" fill="rgba(255,255,255,0.4)" />
          </g>
          <path d="M48 27 Q53 24 58 27" stroke="rgba(180,100,60,0.4)" strokeWidth="0.7" fill="none" />

          {/* Nose */}
          <path d="M44 30 Q42 36 43 39 Q45 41 47 39 Q48 36 46 30Z" fill="rgba(0,0,0,0.07)" />
          <path d="M42 39 Q45 42 48 39" stroke="#c07050" strokeWidth="1.1" strokeLinecap="round" fill="none" />
          <circle cx="43" cy="39" r="1.2" fill="#c8806a" />
          <circle cx="47" cy="39" r="1.2" fill="#c8806a" />

          {/* Mouth */}
          <path d="M38 43 Q45 47 52 43" stroke="#a05030" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M40 43 Q45 45 50 43" fill="rgba(180,80,60,0.25)" />
          {/* Lower lip */}
          <path d="M40 44 Q45 48 50 44" stroke="rgba(200,120,90,0.5)" strokeWidth="0.8" fill="none" />

          {/* Face shadow / cheek blush */}
          <ellipse cx="35" cy="36" rx="4" ry="2.5" fill="rgba(220,120,90,0.18)" />
          <ellipse cx="55" cy="36" rx="4" ry="2.5" fill="rgba(220,120,90,0.18)" />

          {/* Hair forelock / fringe */}
          <path d="M31 16 Q35 8 45 7 Q55 8 59 16 Q54 12 45 12 Q36 12 31 16Z" fill="#1a0a00" />
          <path d="M32 16 Q34 10 39 9" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />

          {/* ══ BELT ══ */}
          <rect x="30" y="93" width="30" height="5" rx="2" fill="#0a1030" />
          <rect x="43" y="93" width="6" height="5" rx="1" fill="#8a7030" />
          <rect x="44.5" y="94" width="3" height="3" rx="0.5" fill="#c8a040" />

          {/* Shirt wrinkle lines */}
          <path d="M36 65 Q37 78 36 92" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" fill="none" />
          <path d="M54 65 Q53 78 54 92" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" fill="none" />

          {/* Pant crease */}
          <line x1="37" y1="96" x2="35" y2="138" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="58" y1="96" x2="60" y2="138" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Label bar */}
      <div style={{
        background: "rgba(255,255,255,0.09)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 6,
        padding: "4px 10px",
        marginBottom: 7,
        textAlign: "center",
        backdropFilter: "blur(4px)",
      }}>
        <div style={{
          color: "#E3F2FD", fontSize: 8, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
        }}>
          🤟 AI Sign Language
        </div>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 2,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: active ? "#69F0AE" : "#90CAF9",
            boxShadow: active ? "0 0 6px #69F0AE" : "none",
            animation: active ? `signPulse 1s ease-in-out infinite ${anim}` : "none",
          }} />
          <span style={{ color: "#BBDEFB", fontSize: 7, fontWeight: 600 }}>
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
          <span style={{ fontSize: 14 }}>🤟</span>
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

      {/* Body: sign avatar + chat side by side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "row", minHeight: 0 }}>

        {/* ── Sign Language Avatar Panel ── */}
        <div style={{
          width: 130,
          flexShrink: 0,
          borderRight: "1.5px solid rgba(25,118,210,0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          <SignAvatar active={signing} />
        </div>

        {/* ── Chat Panel ── */}
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
