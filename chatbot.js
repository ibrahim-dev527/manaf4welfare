/**
 * ============================================================
 *  Abdul Manaf Yussif — Campaign Chatbot Widget
 *  Self-contained: drop ONE line into your HTML to activate.
 *
 *  HOW TO ADD TO YOUR WEBSITE:
 *  Paste this line just before </body> in your index.html:
 *
 *  <script src="chatbot.js"></script>
 *
 *  That's it. No other changes needed.
 * ============================================================
 */

(function () {
  "use strict";

  /* =========================================================
     1. INJECT CSS
  ========================================================= */
  const style = document.createElement("style");
  style.textContent = `
    /* --- FAB Button --- */
    .mnf-fab {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 9500;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, #0A1AFF 0%, #060fcc 100%);
      color: #ffffff;
      border: none;
      border-radius: 50px;
      padding: 0.85rem 1.5rem 0.85rem 1.1rem;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 40px rgba(10,26,255,0.45), 0 0 0 0 rgba(10,26,255,0.4);
      animation: mnfFabPulse 3s ease-in-out infinite;
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
                  box-shadow 0.4s ease;
      outline: none;
    }
    .mnf-fab:hover {
      transform: translateY(-4px) scale(1.05);
      box-shadow: 0 16px 60px rgba(10,26,255,0.55);
      animation: none;
    }
    .mnf-fab:active { transform: scale(0.96); }

    @keyframes mnfFabPulse {
      0%,100% { box-shadow: 0 8px 40px rgba(10,26,255,0.45), 0 0 0 0 rgba(10,26,255,0.4); }
      50%      { box-shadow: 0 8px 40px rgba(10,26,255,0.45), 0 0 0 16px rgba(10,26,255,0); }
    }

    .mnf-fab-icon {
      width: 38px; height: 38px;
      background: #F4C430;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
      transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }
    .mnf-fab:hover .mnf-fab-icon { transform: rotate(-15deg) scale(1.1); }
    .mnf-fab.mnf-open .mnf-fab-icon { transform: rotate(180deg); }

    .mnf-fab-label { line-height: 1.2; }
    .mnf-fab-label small {
      display: block;
      font-size: 0.67rem;
      font-weight: 400;
      opacity: 0.7;
      letter-spacing: 0.05em;
    }

    .mnf-badge {
      position: absolute;
      top: -5px; right: -5px;
      width: 20px; height: 20px;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid #f8f7f3;
      font-size: 0.65rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      animation: mnfBadgeBounce 0.7s cubic-bezier(0.34,1.56,0.64,1) 2.8s both;
    }
    @keyframes mnfBadgeBounce {
      from { transform: scale(0); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
    .mnf-fab.mnf-open .mnf-badge { display: none; }

    /* --- Chat Window --- */
    .mnf-window {
      position: fixed;
      bottom: 6.5rem;
      right: 2rem;
      z-index: 9499;
      width: 420px;
      max-width: calc(100vw - 2rem);
      height: 600px;
      max-height: calc(100vh - 8.5rem);
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 32px 100px rgba(0,0,0,0.22),
                  0 0 0 1px rgba(10,26,255,0.07);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(24px) scale(0.94);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.42s cubic-bezier(0.19,1,0.22,1),
                  transform 0.42s cubic-bezier(0.19,1,0.22,1);
      transform-origin: bottom right;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
    }
    .mnf-window.mnf-open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    /* Header */
    .mnf-header {
      background: linear-gradient(135deg, #0A1AFF 0%, #060fcc 100%);
      padding: 1.2rem 1.4rem;
      display: flex;
      align-items: center;
      gap: 0.9rem;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    .mnf-header::before {
      content: '';
      position: absolute;
      right: -40px; top: -40px;
      width: 140px; height: 140px;
      background: rgba(244,196,48,0.1);
      border-radius: 50%;
      pointer-events: none;
    }
    .mnf-header::after {
      content: '';
      position: absolute;
      right: 30px; bottom: -50px;
      width: 90px; height: 90px;
      background: rgba(255,255,255,0.04);
      border-radius: 50%;
      pointer-events: none;
    }

    .mnf-avatar {
      width: 50px; height: 50px;
      border-radius: 50%;
      background: #F4C430;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      flex-shrink: 0;
      border: 2px solid rgba(255,255,255,0.25);
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    .mnf-avatar img {
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: top center;
    }
    .mnf-avatar-dot {
      position: absolute;
      bottom: 3px; right: 3px;
      width: 11px; height: 11px;
      background: #22c55e;
      border-radius: 50%;
      border: 2px solid #0A1AFF;
    }

    .mnf-header-info { flex: 1; position: relative; z-index: 1; }
    .mnf-header-name {
      font-weight: 700;
      font-size: 0.97rem;
      color: #ffffff;
      line-height: 1.2;
      font-family: 'Playfair Display', 'Georgia', serif;
    }
    .mnf-header-role {
      font-size: 0.68rem;
      color: #ffe082;
      letter-spacing: 0.05em;
      margin-top: 1px;
    }
    .mnf-header-status {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.64rem;
      color: rgba(255,255,255,0.55);
      margin-top: 3px;
    }
    .mnf-status-dot {
      width: 7px; height: 7px;
      background: #22c55e;
      border-radius: 50%;
      flex-shrink: 0;
      animation: mnfStatusPulse 2s ease-in-out infinite;
    }
    @keyframes mnfStatusPulse {
      0%,100% { opacity: 1; }
      50%      { opacity: 0.35; }
    }

    .mnf-close {
      background: rgba(255,255,255,0.13);
      border: none;
      border-radius: 8px;
      width: 34px; height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      transition: background 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
      position: relative; z-index: 1;
      flex-shrink: 0;
    }
    .mnf-close:hover { background: rgba(255,255,255,0.24); transform: rotate(90deg); }

    /* Messages area */
    .mnf-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      background: #f9fafb;
      scroll-behavior: smooth;
    }
    .mnf-messages::-webkit-scrollbar { width: 4px; }
    .mnf-messages::-webkit-scrollbar-track { background: transparent; }
    .mnf-messages::-webkit-scrollbar-thumb {
      background: rgba(10,26,255,0.18);
      border-radius: 4px;
    }

    /* Date separator */
    .mnf-date-sep {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 0.63rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #9ca3af;
      flex-shrink: 0;
    }
    .mnf-date-sep::before, .mnf-date-sep::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e5e7eb;
    }

    /* Message rows */
    .mnf-msg {
      display: flex;
      gap: 0.6rem;
      align-items: flex-end;
      animation: mnfMsgIn 0.38s cubic-bezier(0.19,1,0.22,1) both;
    }
    @keyframes mnfMsgIn {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .mnf-msg.mnf-user { flex-direction: row-reverse; }

    .mnf-msg-ava {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: #F4C430;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
      overflow: hidden;
      border: 1.5px solid rgba(10,26,255,0.12);
      color: #06090c;
    }
    .mnf-msg-ava img {
      width: 100%; height: 100%;
      object-fit: cover;
      object-position: top center;
    }
    .mnf-msg.mnf-user .mnf-msg-ava {
      background: #0A1AFF;
      color: #ffffff;
      font-size: 0.7rem;
      border: 1.5px solid rgba(10,26,255,0.2);
    }

    .mnf-bubble-wrap { max-width: 82%; }
    .mnf-bubble {
      padding: 0.72rem 1rem;
      border-radius: 18px;
      font-size: 0.865rem;
      line-height: 1.62;
      position: relative;
    }
    .mnf-msg:not(.mnf-user) .mnf-bubble {
      background: #ffffff;
      color: #0a0a14;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      border: 1px solid rgba(0,0,0,0.05);
    }
    .mnf-msg.mnf-user .mnf-bubble {
      background: #0A1AFF;
      color: #ffffff;
      border-bottom-right-radius: 4px;
    }
    .mnf-bubble strong { color: #0A1AFF; font-weight: 700; }
    .mnf-msg.mnf-user .mnf-bubble strong { color: #F4C430; }
    .mnf-bubble em { font-style: italic; }
    .mnf-bubble ul {
      margin: 0.5rem 0 0.3rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .mnf-bubble li { list-style: disc; }

    .mnf-tag {
      display: inline-block;
      background: rgba(10,26,255,0.07);
      color: #0A1AFF;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 0.22rem 0.65rem;
      border-radius: 50px;
      margin-bottom: 0.45rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .mnf-time {
      font-size: 0.59rem;
      color: #9ca3af;
      margin-top: 4px;
    }
    .mnf-msg.mnf-user .mnf-time { text-align: right; }

    /* Typing */
    .mnf-typing {
      display: flex;
      gap: 0.6rem;
      align-items: flex-end;
    }
    .mnf-typing-bubble {
      background: #ffffff;
      border-radius: 18px;
      border-bottom-left-radius: 4px;
      padding: 0.7rem 1rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      display: flex;
      gap: 5px;
      align-items: center;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .mnf-dot {
      width: 7px; height: 7px;
      background: #d1d5db;
      border-radius: 50%;
      animation: mnfDotBounce 1.4s ease-in-out infinite;
    }
    .mnf-dot:nth-child(2) { animation-delay: 0.2s; }
    .mnf-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes mnfDotBounce {
      0%,60%,100% { transform: translateY(0); background: #d1d5db; }
      30%          { transform: translateY(-9px); background: #0A1AFF; }
    }

    /* Quick-reply section */
    .mnf-quick {
      background: #ffffff;
      border-top: 1px solid #f3f4f6;
      padding: 0.85rem 1rem 0.55rem;
      flex-shrink: 0;
    }
    .mnf-quick-label {
      font-size: 0.63rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #9ca3af;
      margin-bottom: 0.55rem;
    }

    /* Category tabs */
    .mnf-cat-tabs {
      display: flex;
      gap: 0.35rem;
      margin-bottom: 0.6rem;
      flex-wrap: wrap;
    }
    .mnf-cat-tab {
      font-size: 0.67rem;
      font-weight: 600;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      padding: 0.25rem 0.72rem;
      border-radius: 50px;
      border: 1.5px solid #e5e7eb;
      color: #6b7280;
      cursor: pointer;
      background: transparent;
      transition: all 0.28s ease;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
    }
    .mnf-cat-tab:hover,
    .mnf-cat-tab.mnf-active {
      background: #0A1AFF;
      border-color: #0A1AFF;
      color: #ffffff;
    }

    /* Chip container */
    .mnf-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      max-height: 96px;
      overflow-y: auto;
      padding-bottom: 2px;
    }
    .mnf-chips::-webkit-scrollbar { height: 3px; }
    .mnf-chips::-webkit-scrollbar-thumb {
      background: rgba(10,26,255,0.18);
      border-radius: 2px;
    }
    .mnf-chip {
      background: rgba(10,26,255,0.06);
      border: 1.5px solid rgba(10,26,255,0.14);
      color: #0A1AFF;
      font-size: 0.74rem;
      font-weight: 500;
      padding: 0.33rem 0.85rem;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      white-space: nowrap;
      flex-shrink: 0;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      outline: none;
      border-style: solid;
    }
    .mnf-chip:hover {
      background: #0A1AFF;
      color: #ffffff;
      border-color: #0A1AFF;
      transform: translateY(-2px);
      box-shadow: 0 5px 18px rgba(10,26,255,0.28);
    }
    .mnf-chip:active { transform: scale(0.95); }

    /* Input row */
    .mnf-input-row {
      padding: 0.75rem 1rem;
      border-top: 1px solid #f3f4f6;
      display: flex;
      gap: 0.55rem;
      align-items: flex-end;
      background: #ffffff;
      flex-shrink: 0;
    }
    .mnf-textarea {
      flex: 1;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      padding: 0.62rem 1rem;
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      font-size: 0.875rem;
      color: #0a0a14;
      outline: none;
      resize: none;
      min-height: 42px;
      max-height: 96px;
      line-height: 1.45;
      background: #f9fafb;
      transition: border-color 0.28s, box-shadow 0.28s;
    }
    .mnf-textarea:focus {
      border-color: #0A1AFF;
      box-shadow: 0 0 0 3px rgba(10,26,255,0.1);
      background: #ffffff;
    }
    .mnf-textarea::placeholder { color: #9ca3af; }
    .mnf-send {
      width: 42px; height: 42px;
      background: #0A1AFF;
      border: none;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      color: #ffffff;
      font-size: 1.05rem;
      line-height: 1;
    }
    .mnf-send:hover {
      background: #F4C430;
      transform: scale(1.12) rotate(8deg);
      box-shadow: 0 6px 22px rgba(244,196,48,0.45);
    }
    .mnf-send:active { transform: scale(0.94); }

    /* Powered by footer */
    .mnf-powered {
      text-align: center;
      font-size: 0.58rem;
      color: #c4c9d4;
      padding: 0.45rem 0 0.55rem;
      letter-spacing: 0.07em;
      background: #ffffff;
      flex-shrink: 0;
    }
    .mnf-powered span { color: #F4C430; font-weight: 700; }

    /* ---- RESPONSIVE ---- */
    @media (max-width: 480px) {
      .mnf-window {
        bottom: 0 !important;
        right: 0 !important;
        left: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 22px 22px 0 0 !important;
        height: 78vh !important;
        max-height: 78vh !important;
        transform-origin: bottom center;
        transform: translateY(100%) !important;
      }
      .mnf-window.mnf-open {
        transform: translateY(0) !important;
      }
      .mnf-fab {
        bottom: 1.2rem !important;
        right: 1.2rem !important;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        padding: 0 !important;
        justify-content: center !important;
        gap: 0 !important;
      }
      .mnf-fab-label { display: none !important; }
      .mnf-fab-icon {
        width: 34px !important;
        height: 34px !important;
        font-size: 1.15rem !important;
        margin: 0 !important;
      }
      .mnf-badge {
        top: -3px !important;
        right: -3px !important;
      }
    }
    @media (min-width: 481px) and (max-width: 680px) {
      .mnf-window {
        right: 1rem !important;
        bottom: 5.5rem !important;
        width: calc(100vw - 2rem) !important;
        height: 68vh !important;
        max-height: 68vh !important;
      }
    }
  `;
  document.head.appendChild(style);

  /* =========================================================
     2. KNOWLEDGE BASE (20 Q&A pairs)
  ========================================================= */
  const KB = [
    {
      id: "who",
      cat: "about",
      chip: "👤 Who is Abdul Manaf?",
      keys: ["who are you","who is manaf","about yourself","introduce yourself","who is abdul","tell me about"],
      tag: "About Me",
      ans: `I'm <strong>Abdul Manaf Yussif</strong> — a <strong>Fashion &amp; Textiles (Top-Up)</strong> student at ATU and your SRC Welfare Officer Aspirant.<br><br>I'm a national titleholder, mental health advocate, community organizer, and passionate student leader. I believe student wellbeing is the foundation of academic success — and I'm running to make sure every student is <strong>heard, supported, and cared for</strong>.`
    },
    {
      id: "dept",
      cat: "about",
      chip: "🎨 Department & Course",
      keys: ["department","course","what do you study","fashion textiles","faculty","school"],
      tag: "Academic Background",
      ans: `I study in the <strong>Department of Fashion and Textiles (Top-Up)</strong> at ATU.<br><br>My creative background gives me a <strong>human-centered approach</strong> to problem-solving — exactly what student welfare requires. I also serve as an active <strong>Departmental Organizer</strong> for Fashion &amp; Textiles.`
    },
    {
      id: "motivation",
      cat: "about",
      chip: "💡 Why Is He Running?",
      keys: ["why running","motivated you","why welfare officer","why you","what drives","your reason"],
      tag: "His Motivation",
      ans: `I'm running because I've <strong>lived these challenges firsthand</strong>. I've felt the mental health pressure, the frustration of poor facilities, and the anxiety of financial uncertainty as a student.<br><br>I'm passionate about creating an environment where <strong>every student's voice is heard and valued</strong>. I don't just talk about change — <em>I act on it</em>.`
    },
    {
      id: "vision",
      cat: "about",
      chip: "🔭 His Vision Statement",
      keys: ["vision","vision statement","campus vision","future campus","goal","aim"],
      tag: "Vision Statement",
      ans: `<em>"To build an <strong>inclusive campus</strong> where students are supported academically, financially, and emotionally — and where every student feels <strong>heard and cared for</strong>."</em><br><br>This guides every policy, every plan, and every conversation I have. It's not a slogan — it's my roadmap.`
    },
    {
      id: "position",
      cat: "about",
      chip: "📌 What is a Welfare Officer?",
      keys: ["what position","welfare officer role","what does welfare officer do","responsibilities","duties"],
      tag: "The Role",
      ans: `The <strong>SRC Welfare Officer</strong> is responsible for:<br><ul>
        <li>Advocating for student welfare and rights</li>
        <li>Addressing mental health, health &amp; safety concerns</li>
        <li>Coordinating financial aid and support programs</li>
        <li>Ensuring campus facilities meet student standards</li>
        <li>Being the official student voice on wellbeing in SRC</li>
      </ul><br>It's one of the most impactful roles in student government — and I'm fully ready for it.`
    },
    {
      id: "mentalhealth",
      cat: "agenda",
      chip: "🧠 Mental Health Plan",
      keys: ["mental health","counseling","emotional support","peer support","stress","anxiety","depression","psychological"],
      tag: "Welfare Agenda · Mental Health",
      ans: `<strong>The Problem:</strong> Students face mounting mental health challenges with little access to counseling on campus.<br><br>
      <strong>My Solution:</strong><br><ul>
        <li>Establish a campus-wide <strong>peer-support network</strong> of trained student counselors</li>
        <li>Create safe, accessible mental health discussion spaces</li>
        <li>Partner with qualified professionals to back the peer network</li>
        <li>Run regular <strong>mental health awareness campaigns</strong></li>
      </ul><br>No student should ever suffer in silence.`
    },
    {
      id: "facilities",
      cat: "agenda",
      chip: "🚿 Campus Facilities Plan",
      keys: ["washroom","toilet","accommodation","hostel","facilities","campus condition","maintenance","rooms","hygiene"],
      tag: "Welfare Agenda · Facilities",
      ans: `<strong>The Problem:</strong> Poor washroom conditions and limited housing options affect student dignity every day.<br><br>
      <strong>My Solution:</strong><br><ul>
        <li>Launch a <strong>maintenance feedback system</strong> for instant issue reporting</li>
        <li>Conduct structured <strong>campus facility audits</strong> each semester</li>
        <li>Push administration to prioritize urgent renovation</li>
        <li>Advocate for improved accommodation standards</li>
      </ul>`
    },
    {
      id: "financial",
      cat: "agenda",
      chip: "💰 Financial Support Plan",
      keys: ["financial support","scholarship","money","financial aid","emergency fund","bursary","struggling","broke","fees"],
      tag: "Welfare Agenda · Financial Aid",
      ans: `<strong>The Problem:</strong> Students in financial hardship have no safety net — scholarships go unclaimed, emergencies go unsupported.<br><br>
      <strong>My Solution:</strong><br><ul>
        <li>Set up an <strong>Emergency Student Welfare Fund</strong> for immediate crises</li>
        <li>Create a centralized <strong>scholarship &amp; aid database</strong> all students can access</li>
        <li>Host <strong>financial literacy workshops</strong></li>
        <li>Actively connect students with bursaries and opportunities</li>
      </ul>`
    },
    {
      id: "agenda-overview",
      cat: "agenda",
      chip: "📋 Full Welfare Agenda",
      keys: ["welfare agenda","your plan","what will you do","policies","agenda","three priorities","plans","proposals"],
      tag: "Three-Point Welfare Plan",
      ans: `My entire welfare agenda rests on <strong>three clear priorities</strong>:<br><br>
      <strong>1. 🧠 Mental Health</strong> — Peer-support network &amp; accessible counseling<br><br>
      <strong>2. 🚿 Campus Facilities</strong> — Feedback system &amp; structured audits<br><br>
      <strong>3. 💰 Financial Support</strong> — Emergency welfare fund &amp; scholarship info<br><br>
      Each is <strong>specific, actionable, and ready from Day 1</strong>. Ask me about any one!`
    },
    {
      id: "leadership",
      cat: "leadership",
      chip: "🏆 Leadership Roles",
      keys: ["leadership","experience","what have you done","track record","roles","positions","history","background"],
      tag: "Leadership & Experience",
      ans: `I bring <strong>7+ verified leadership roles</strong>:<br><ul>
        <li>👑 <strong>Man of Africa Ghana '23</strong> — National title winner</li>
        <li>🌟 <strong>Mister Ideal Top Model</strong></li>
        <li>🎨 <strong>Departmental Organizer</strong> — Fashion &amp; Textiles, ATU</li>
        <li>🎭 <strong>Vice President</strong> — ATU Drama &amp; Dance Club</li>
        <li>🧠 <strong>Mental Health &amp; Streetism Advocate</strong></li>
        <li>📸 <strong>President</strong> — The Prefect Photo Challenge</li>
        <li>💼 <strong>Student Groomer, Pageantry Director &amp; Organizer</strong></li>
      </ul><br>Leadership isn't claimed — it's <strong>proven</strong>. My record proves it.`
    },
    {
      id: "model",
      cat: "leadership",
      chip: "🌟 Pageantry & Modelling",
      keys: ["model","pageant","man of africa","mister ideal","fashion show","competition","title"],
      tag: "Pageantry & Modelling",
      ans: `Yes! I'm a national titleholder 🌟<br><br>As <strong>Man of Africa Ghana '23</strong> and <strong>Mister Ideal Top Model</strong>, I competed and succeeded on a national stage — demonstrating poise, character, confidence, and the ability to <strong>represent a community with pride</strong>.<br><br>These experiences shaped exactly the skills I'll bring as Welfare Officer: speaking up, representing with integrity, and leading with presence.`
    },
    {
      id: "drama",
      cat: "leadership",
      chip: "🎭 ATU Drama & Dance Club",
      keys: ["drama","dance","arts","drama club","vice president club","entertainment"],
      tag: "ATU Drama & Dance Club",
      ans: `As <strong>Vice President of ATU's Drama and Dance Club</strong>, I've helped build one of campus's most vibrant creative communities.<br><br>This taught me <strong>event coordination, team management, and student engagement</strong> — creating spaces where students feel free to express themselves. Those same skills drive my welfare plans.`
    },
    {
      id: "advocate",
      cat: "leadership",
      chip: "🧠 Mental Health Advocate",
      keys: ["advocate","streetism","mental health advocate","activism","awareness","outreach"],
      tag: "Student Advocacy",
      ans: `I've been an active <strong>Mental Health &amp; Streetism Student Advocate</strong> — raising awareness, reducing stigma, and connecting vulnerable students to support.<br><br>This is not a new interest for me. <strong>Mental health advocacy is personal</strong>. It's why it's the first and most urgent item on my welfare agenda.`
    },
    {
      id: "why-vote",
      cat: "vote",
      chip: "🗳️ Why Vote for Manaf?",
      keys: ["why should i vote","why vote for you","convince me","why manaf","why you and not others","reason to vote","best candidate"],
      tag: "Why Vote for Me",
      ans: `Three reasons — <strong>backed by evidence</strong>:<br><br>
      <strong>1. I've lived it</strong> — I understand student challenges from the inside, not from a distance.<br><br>
      <strong>2. I have a real plan</strong> — Not vague promises. Specific, executable proposals ready from Day 1.<br><br>
      <strong>3. My record speaks</strong> — 7+ leadership roles, national titles, advocacy work, community organizing.<br><br>
      Your vote isn't just for me — it's for <strong>every student who deserves better</strong>.`
    },
    {
      id: "promises",
      cat: "vote",
      chip: "✅ His 6 Promises",
      keys: ["promises","commitments","what do you promise","can i trust you","will you follow","guarantee"],
      tag: "Campaign Commitments",
      ans: `I make <strong>6 firm commitments</strong> to every student:<br><ul>
        <li>✅ Listen to every student concern — no voice is too small</li>
        <li>✅ Launch a peer counseling network within the first semester</li>
        <li>✅ Conduct a campus facility audit &amp; push for urgent fixes</li>
        <li>✅ Create and actively manage an emergency welfare fund</li>
        <li>✅ Promote scholarships &amp; financial aid to every student</li>
        <li>✅ Advocate relentlessly at every SRC level for student wellbeing</li>
      </ul><br>My track record shows I <strong>follow through</strong> on what I start.`
    },
    {
      id: "message",
      cat: "vote",
      chip: "📢 Campaign Message",
      keys: ["campaign message","slogan","motto","message to students","what do you say"],
      tag: "Campaign Message",
      ans: `<em>"Let's make our voices heard! Vote for <strong>Abdul Manaf Yussif</strong> as your SRC Welfare Officer. Together, we can build a supportive community where <strong>every student's voice matters</strong>."</em><br><br>This is a call to action — your participation, your vote, your voice is what makes real change possible.`
    },
    {
      id: "vote-how",
      cat: "vote",
      chip: "🗳️ How & When to Vote",
      keys: ["how do i vote","voting process","when is voting","where to vote","election day","polling","ballot"],
      tag: "Voting Information",
      ans: `Watch for official announcements from <strong>SRC &amp; ATU</strong> about:<br><ul>
        <li>📅 <strong>Voting date &amp; time</strong></li>
        <li>📍 <strong>Polling station locations</strong> on campus</li>
        <li>🪪 <strong>Credentials required</strong> to vote</li>
      </ul><br>When that moment comes — vote for <strong>Abdul Manaf Yussif</strong> for SRC Welfare Officer. <strong>Every single vote counts.</strong>`
    },
    {
      id: "contact",
      cat: "vote",
      chip: "📱 How to Reach Him",
      keys: ["contact","reach you","social media","talk to you","get in touch","find you","communicate"],
      tag: "Get in Touch",
      ans: `Want to connect with Manaf directly?<br><ul>
        <li>📍 <strong>On campus</strong> — he's always accessible and approachable</li>
        <li>🎭 Attend <strong>ATU Drama &amp; Dance Club</strong> events</li>
        <li>🏛️ Visit the <strong>Department of Fashion &amp; Textiles</strong></li>
        <li>📣 Look out for his <strong>campaign events &amp; town halls</strong></li>
      </ul><br>Manaf believes in <strong>open-door communication</strong>. He will always make time for students.`
    },
    {
      id: "wellbeing",
      cat: "agenda",
      chip: "❤️ Student Wellbeing",
      keys: ["student welfare","student wellbeing","student support","care for students","student life","student needs"],
      tag: "Student Wellbeing",
      ans: `Student wellbeing is the <strong>core of everything I stand for</strong>.<br><br>When students feel:<br><ul>
        <li>🧠 <strong>Mentally healthy</strong> — they perform better academically</li>
        <li>🏠 <strong>Comfortable on campus</strong> — they focus better</li>
        <li>💰 <strong>Financially stable</strong> — they stress less</li>
      </ul><br>Every initiative in my welfare agenda is built to make this a reality for <em>every student at ATU</em>.`
    },
    {
      id: "unique",
      cat: "about",
      chip: "⭐ What Makes Him Different?",
      keys: ["what makes you different","unique","special","stand out","better than others","qualification","why him"],
      tag: "What Sets Him Apart",
      ans: `Several things set me apart from any other candidate:<br><br>
      <strong>🎓 Lived Experience</strong> — I've faced the same pressures every student faces. I get it.<br><br>
      <strong>🏆 Proven Leadership</strong> — 7+ roles across advocacy, arts, fashion, and governance.<br><br>
      <strong>📋 Ready Plans</strong> — Not vague promises. Detailed, executable proposals for Day 1.<br><br>
      <strong>🤝 Community Builder</strong> — I've spent years bringing people together, not dividing them.<br><br>
      <strong>🧠 Advocacy First</strong> — Mental health and student welfare aren't campaign points for me — they're personal missions.`
    }
  ];

  /* =========================================================
     3. BUILD HTML
  ========================================================= */
  const html = `
    <!-- CHATBOT FAB -->
    <button class="mnf-fab" id="mnfFab" aria-label="Open campaign chatbot">
      <div class="mnf-fab-icon">💬</div>
      <div class="mnf-fab-label">
        <span>Ask Manaf</span>
        <small>Campaign Assistant</small>
      </div>
      <div class="mnf-badge" id="mnfBadge">3</div>
    </button>

    <!-- CHATBOT WINDOW -->
    <div class="mnf-window" id="mnfWindow" role="dialog" aria-label="Campaign chatbot">

      <!-- Header -->
      <div class="mnf-header">
        <div class="mnf-avatar">
          <img src="images/manaf6.jpeg" alt="Abdul Manaf Yussif"
               onerror="this.style.display='none'; this.parentNode.textContent='👤'">
          <div class="mnf-avatar-dot"></div>
        </div>
        <div class="mnf-header-info">
          <div class="mnf-header-name">Abdul Manaf Yussif</div>
          <div class="mnf-header-role">SRC Welfare Officer Aspirant · ATU</div>
          <div class="mnf-header-status">
            <div class="mnf-status-dot"></div>
            Online · Replies instantly
          </div>
        </div>
        <button class="mnf-close" id="mnfClose" aria-label="Close chat">✕</button>
      </div>

      <!-- Messages -->
      <div class="mnf-messages" id="mnfMessages">
        <div class="mnf-date-sep">Today</div>
        <!-- Welcome injected by JS -->
      </div>

      <!-- Quick replies -->
      <div class="mnf-quick">
        <div class="mnf-quick-label">Frequently Asked Questions</div>
        <div class="mnf-cat-tabs" id="mnfTabs"></div>
        <div class="mnf-chips" id="mnfChips"></div>
      </div>

      <!-- Input -->
      <div class="mnf-input-row">
        <textarea
          class="mnf-textarea"
          id="mnfTextarea"
          placeholder="Type your question…"
          rows="1"
          aria-label="Your message"
        ></textarea>
        <button class="mnf-send" id="mnfSend" aria-label="Send">➤</button>
      </div>

      <!-- Powered -->
      <div class="mnf-powered">Campaign Assistant · <span>Abdul Manaf Yussif</span> SRC 2024</div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  /* =========================================================
     4. STATE & ELEMENTS
  ========================================================= */
  const fab      = document.getElementById("mnfFab");
  const win      = document.getElementById("mnfWindow");
  const msgs     = document.getElementById("mnfMessages");
  const textarea = document.getElementById("mnfTextarea");
  const sendBtn  = document.getElementById("mnfSend");
  const closeBtn = document.getElementById("mnfClose");
  const chipsEl  = document.getElementById("mnfChips");
  const tabsEl   = document.getElementById("mnfTabs");

  let isOpen  = false;
  let curCat  = "all";
  const CATS  = ["all","about","agenda","leadership","vote"];
  const ICONS = { all:"🔍", about:"👤", agenda:"📋", leadership:"🏆", vote:"🗳️" };

  /* =========================================================
     5. OPEN / CLOSE
  ========================================================= */
  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle("mnf-open", isOpen);
    fab.classList.toggle("mnf-open", isOpen);
    if (isOpen) {
      document.getElementById("mnfBadge").style.display = "none";
      setTimeout(scrollBottom, 80);
      textarea.focus();
    }
  }
  fab.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  /* =========================================================
     6. BUILD TABS
  ========================================================= */
  CATS.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "mnf-cat-tab" + (cat === "all" ? " mnf-active" : "");
    btn.textContent = (ICONS[cat] || "") + " " + (cat === "all" ? "All" : cap(cat));
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mnf-cat-tab").forEach(t => t.classList.remove("mnf-active"));
      btn.classList.add("mnf-active");
      curCat = cat;
      buildChips(cat);
    });
    tabsEl.appendChild(btn);
  });

  /* =========================================================
     7. BUILD CHIPS
  ========================================================= */
  function buildChips(cat) {
    chipsEl.innerHTML = "";
    const list = cat === "all" ? KB : KB.filter(k => k.cat === cat);
    list.forEach(item => {
      const chip = document.createElement("button");
      chip.className = "mnf-chip";
      chip.textContent = item.chip;
      chip.addEventListener("click", () => triggerAnswer(item.id));
      chipsEl.appendChild(chip);
    });
  }
  buildChips("all");

  /* =========================================================
     8. WELCOME MESSAGE
  ========================================================= */
  function welcome() {
    appendBot(
      "👋 Welcome!",
      `Hello! I'm <strong>Abdul Manaf Yussif</strong> — your SRC Welfare Officer Aspirant at ATU.<br><br>
      I'm here to answer all your questions about my campaign, welfare agenda, leadership, and how together we can <strong>build a better campus</strong>.<br><br>
      Pick a quick question below or type your own! 😊`
    );
  }
  welcome();

  /* =========================================================
     9. TRIGGER ANSWER FROM CHIP
  ========================================================= */
  function triggerAnswer(id) {
    const item = KB.find(k => k.id === id);
    if (!item) return;
    appendUser(item.chip.replace(/^[^\p{L}]+/u, "").trim());
    showTyping();
    setTimeout(() => {
      removeTyping();
      appendBot(item.tag, item.ans);
      scrollBottom();
    }, 800 + Math.random() * 500);
  }

  /* =========================================================
     10. SEND TYPED MESSAGE
  ========================================================= */
  function sendMsg() {
    const text = textarea.value.trim();
    if (!text) return;
    appendUser(text);
    textarea.value = "";
    textarea.style.height = "auto";

    showTyping();
    setTimeout(() => {
      removeTyping();
      const match = findMatch(text);
      if (match) {
        appendBot(match.tag, match.ans);
      } else {
        appendBot(
          "🤔 Let Me Help!",
          `I didn't catch that exactly, but I'd love to help! Try asking about:<br><br>
          • My <strong>welfare agenda</strong> (mental health, facilities, financial aid)<br>
          • My <strong>leadership experience</strong> and roles<br>
          • <strong>Why you should vote</strong> for me<br>
          • My <strong>campaign vision</strong> and promises<br><br>
          Or tap one of the quick questions below 👇`
        );
      }
      scrollBottom();
    }, 1000 + Math.random() * 600);
  }

  sendBtn.addEventListener("click", sendMsg);
  textarea.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMsg(); }
  });
  textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 96) + "px";
  });

  /* =========================================================
     11. KEYWORD MATCHING
  ========================================================= */
  function findMatch(input) {
    const q = input.toLowerCase();
    let best = null, bestScore = 0;
    KB.forEach(item => {
      item.keys.forEach(kw => {
        if (q.includes(kw) && kw.length > bestScore) {
          bestScore = kw.length;
          best = item;
        }
      });
    });
    return best;
  }

  /* =========================================================
     12. DOM HELPERS
  ========================================================= */
  function getTime() {
    return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }

  function appendUser(text) {
    const row = document.createElement("div");
    row.className = "mnf-msg mnf-user";
    row.innerHTML = `
      <div class="mnf-msg-ava">You</div>
      <div class="mnf-bubble-wrap">
        <div class="mnf-bubble">${escHtml(text)}</div>
        <div class="mnf-time">${getTime()}</div>
      </div>`;
    msgs.appendChild(row);
    scrollBottom();
  }

  function appendBot(tag, html) {
    const row = document.createElement("div");
    row.className = "mnf-msg";
    row.innerHTML = `
      <div class="mnf-msg-ava">
        <img src="images/abdul-manaf-hero.jpg" alt="Manaf"
             onerror="this.style.display='none'; this.parentNode.textContent='👤'">
      </div>
      <div class="mnf-bubble-wrap">
        <div class="mnf-bubble">
          <div class="mnf-tag">${tag}</div>
          ${html}
        </div>
        <div class="mnf-time">${getTime()}</div>
      </div>`;
    msgs.appendChild(row);
  }

  let typingRow = null;
  function showTyping() {
    typingRow = document.createElement("div");
    typingRow.className = "mnf-typing";
    typingRow.id = "mnfTyping";
    typingRow.innerHTML = `
      <div class="mnf-msg-ava">
        <img src="images/abdul-manaf-hero.jpg" alt="Manaf"
             onerror="this.style.display='none'; this.parentNode.textContent='👤'">
      </div>
      <div class="mnf-typing-bubble">
        <div class="mnf-dot"></div>
        <div class="mnf-dot"></div>
        <div class="mnf-dot"></div>
      </div>`;
    msgs.appendChild(typingRow);
    scrollBottom();
  }

  function removeTyping() {
    const el = document.getElementById("mnfTyping");
    if (el) el.remove();
  }

  function scrollBottom() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function escHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /* =========================================================
     13. SHOW BADGE AFTER DELAY
  ========================================================= */
  const badge = document.getElementById("mnfBadge");
  badge.style.opacity = "0";
  setTimeout(() => { badge.style.transition = "opacity 0.4s"; badge.style.opacity = "1"; }, 3000);

})();