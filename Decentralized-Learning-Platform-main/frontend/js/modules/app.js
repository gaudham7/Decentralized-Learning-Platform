/**
 * app.js — Application entry point
 */

// ── Language system ───────────────────────────────────────────────

const TRANSLATIONS = {
  en: {
    home:         '~/Home',
    subjects:     '~/Subjects',
    notes:        '~/Notes',
    login:        '~/Login',
    nodesOffline: 'ALL NODES OFFLINE',
    nodesOnline:  (n) => n > 1 ? `${n} NODES ONLINE` : `NODE ONLINE`,
    notFound:     'ROUTE NOT FOUND',
    returnHome:   '← return home',
    // Auth pages
    loginTitle:       'LOGIN',
    registerTitle:    'REGISTER',
    profileTitle:     'PROFILE',
    subjectsTitle:    'SUBJECTS',
    notesTitle:       'NOTES',
    // Notes UI
    startQuiz:        '▶ START QUIZ',
    backToNotes:      '📖 BACK TO NOTES',
    processResults:   'PROCESS RESULTS →',
    nextQuestion:     'NEXT →',
    retryQuiz:        '↺ NEW RANDOM QUIZ',
    simplify:         '⚡ SIMPLIFY',
    simplified:       '⚡ SIMPLIFIED',
    comingSoon:       'Notes Coming Soon',
    comingSoonSub:    (s) => `Notes for ${s} at your grade level are being prepared.`,
    loading:          '⟳ Loading notes...',
    testKnowledge:    (s) => `TEST YOUR KNOWLEDGE — ${s}`,
    questionsInfo:    (n) => `5 random questions from a pool of ${n}. Different every time!`,
    results:          'RESULTS',
    round:            (r) => `Round ${r}`,
    correct:          '✓ CORRECT',
    wrong:            '✗ WRONG',
    explanation:      '💡 EXPLANATION',
    why:              '💡 WHY:',
    whatNext:         '⚡ WHAT NEXT?',
    processing:       '⬡ RUNNING SHA-256 PROTOCOL',
    quiz:             'QUIZ',
    backToNotesBtn:   '← BACK TO NOTES',
    chapterProgress:  '📘 CHAPTER PROGRESS',
    thisQuiz:         '📊 THIS QUIZ — QUESTION BY QUESTION',
    scoreTrend:       (s) => `📈 ${s} — SCORE TREND`,
    subjectAvg:       '📉 SUBJECT-WISE AVERAGE SCORES',
    answerReview:     '📋 ANSWER REVIEW & EXPLANATIONS',
    avgScore:         (s) => `avg score — ${s}`,
    roundsCompleted:  'rounds completed',
    bestScore:        'best score this subject',
    allRoundsDone:    '🏁 All rounds done!',
    newRandomQuiz:    '↺ NEW RANDOM QUIZ',
    grade:            (g) => `Grade ${g}`,
  },
  hi: {
    home:         '~/होम',
    subjects:     '~/विषय',
    notes:        '~/नोट्स',
    login:        '~/लॉगिन',
    nodesOffline: 'सभी नोड ऑफलाइन',
    nodesOnline:  (n) => n > 1 ? `${n} नोड ऑनलाइन` : `नोड ऑनलाइन`,
    notFound:     'पेज नहीं मिला',
    returnHome:   '← होम पर वापस जाएं',
    // Auth pages
    loginTitle:       'लॉगिन',
    registerTitle:    'रजिस्टर',
    profileTitle:     'प्रोफ़ाइल',
    subjectsTitle:    'विषय चुनें',
    notesTitle:       'नोट्स',
    // Notes UI
    startQuiz:        '▶ क्विज़ शुरू करें',
    backToNotes:      '📖 नोट्स पर वापस',
    processResults:   'परिणाम देखें →',
    nextQuestion:     'अगला →',
    retryQuiz:        '↺ नई क्विज़',
    simplify:         '⚡ सरल करें',
    simplified:       '⚡ सरल',
    comingSoon:       'नोट्स जल्द आएंगे',
    comingSoonSub:    (s) => `${s} के नोट्स तैयार किए जा रहे हैं।`,
    loading:          '⟳ नोट्स लोड हो रहे हैं...',
    testKnowledge:    (s) => `ज्ञान परखें — ${s}`,
    questionsInfo:    (n) => `${n} में से 5 यादृच्छिक प्रश्न। हर बार अलग!`,
    results:          'परिणाम',
    round:            (r) => `राउंड ${r}`,
    correct:          '✓ सही',
    wrong:            '✗ गलत',
    explanation:      '💡 स्पष्टीकरण',
    why:              '💡 क्यों:',
    whatNext:         '⚡ आगे क्या?',
    processing:       '⬡ SHA-256 प्रोटोकॉल चल रहा है',
    quiz:             'क्विज़',
    backToNotesBtn:   '← नोट्स पर वापस',
    chapterProgress:  '📘 अध्याय प्रगति',
    thisQuiz:         '📊 इस क्विज़ में — प्रश्नवार',
    scoreTrend:       (s) => `📈 ${s} — स्कोर ट्रेंड`,
    subjectAvg:       '📉 विषयवार औसत स्कोर',
    answerReview:     '📋 उत्तर समीक्षा और स्पष्टीकरण',
    avgScore:         (s) => `औसत स्कोर — ${s}`,
    roundsCompleted:  'राउंड पूरे',
    bestScore:        'सर्वश्रेष्ठ स्कोर',
    allRoundsDone:    '🏁 सभी राउंड पूरे!',
    newRandomQuiz:    '↺ नई यादृच्छिक क्विज़',
    grade:            (g) => `कक्षा ${g}`,
  }
};

// Get current language (default English)
function getLang() {
  return localStorage.getItem('edulift_lang') || 'en';
}

// Set language
function setLang(lang) {
  localStorage.setItem('edulift_lang', lang);
}

// Translate a key — t('startQuiz') or t('nodesOnline', 3)
function t(key, ...args) {
  const lang = getLang();
  const val  = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['en'][key];
  if (typeof val === 'function') return val(...args);
  return val ?? key;
}

// ── Node polling ──────────────────────────────────────────────────

API.setStatusCallback((online, info) => {
  state.nodeOnline = online;
  state.nodeInfo   = info;

  const dot = document.querySelector('.node-dot');
  const lbl = document.querySelector('.node-label');
  if (dot) dot.className = 'node-dot' + (online ? ' online' : '');
  if (lbl) {
    const count = info?.online_count || 0;
    lbl.textContent = count > 0
      ? t('nodesOnline', count)
      : t('nodesOffline');
  }
});

function startNodePolling() {
  API.ping();
  setInterval(() => API.ping(), 10000);
}

// ── Nav ───────────────────────────────────────────────────────────
function renderNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = '';

  const logo = el('span', { class: 'logo', onClick: () => navigate('home') },
    'EDU', el('span', null, 'LIFT'), ' ');

  const onlineNodes = API.getOnlineNodes();
  const nodeDot = el('div', { class: 'node-status' },
    el('div', { class: `node-dot${state.nodeOnline ? ' online' : ''}` }),
    el('span', {
      class: 'node-label',
      style: { fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--text-dim)' }
    },
      onlineNodes.length > 0
        ? t('nodesOnline', onlineNodes.length)
        : t('nodesOffline')
    )
  );

  const links = [
    { route: 'home',   label: t('home') },
  ];

  if (state.auth.loggedIn) {
    links.push({ route: 'subjects', label: t('subjects') });
    if (state.auth.subjects && state.auth.subjects.length > 0) {
      links.push({ route: 'notes', label: t('notes') });
    }
    links.push({ route: 'profile', label: `👤 ${(state.auth.username || '').toUpperCase()}` });
  } else {
    links.push({ route: 'login', label: t('login') });
  }

  const ul = el('ul', null,
    ...links.map(l =>
      el('li', null,
        el('button', {
          class: `nav-link${state.route === l.route ? ' active' : ''}`,
          onClick: () => navigate(l.route)
        }, l.label)
      )
    )
  );

  // ── Language dropdown ─────────────────────────────────────────
  const currentLang = getLang();
  const langDropdown = el('div', {
    style: {
      position: 'relative',
      display: 'inline-block',
      marginLeft: '1rem',
    }
  });

  const langBtn = el('button', {
    class: 'btn btn-sm',
    style: {
      fontFamily: 'var(--mono)',
      fontSize: '.72rem',
      padding: '.3rem .8rem',
      border: '1px solid var(--border)',
      background: 'transparent',
      color: 'var(--green)',
      cursor: 'pointer',
      letterSpacing: '.05em',
    }
  }, currentLang === 'hi' ? '🌐 हिंदी' : '🌐 EN');

  const langMenu = el('div', {
    style: {
      display: 'none',
      position: 'absolute',
      right: '0',
      top: '110%',
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      minWidth: '120px',
      zIndex: '100',
      overflow: 'hidden',
    }
  });

  const langOptions = [
    { code: 'en', label: '🌐 English' },
    { code: 'hi', label: '🌐 हिंदी' },
  ];

  langOptions.forEach(opt => {
    const item = el('button', {
      style: {
        display: 'block',
        width: '100%',
        padding: '.6rem 1rem',
        background: opt.code === currentLang ? 'hsla(150,100%,45%,.1)' : 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        color: opt.code === currentLang ? 'var(--green)' : 'var(--text)',
        fontFamily: 'var(--mono)',
        fontSize: '.78rem',
        cursor: 'pointer',
        textAlign: 'left',
        letterSpacing: '.03em',
      }
    }, opt.label);

    item.addEventListener('click', () => {
      setLang(opt.code);
      langMenu.style.display = 'none';
      render(); // re-render entire app with new language
    });

    item.addEventListener('mouseenter', () => {
      if (opt.code !== currentLang) item.style.background = 'hsla(150,100%,45%,.05)';
    });
    item.addEventListener('mouseleave', () => {
      if (opt.code !== currentLang) item.style.background = 'transparent';
    });

    langMenu.appendChild(item);
  });

  // Toggle dropdown open/close
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langMenu.style.display === 'block';
    langMenu.style.display = isOpen ? 'none' : 'block';
  });

  // Close when clicking anywhere else
  document.addEventListener('click', () => {
    langMenu.style.display = 'none';
  }, { once: true });

  langDropdown.appendChild(langBtn);
  langDropdown.appendChild(langMenu);

  nav.appendChild(logo);
  nav.appendChild(nodeDot);
  nav.appendChild(ul);
  nav.appendChild(langDropdown);
}

// ── Main render ───────────────────────────────────────────────────
function render() {
  if (termInterval && state.route !== 'home') {
    clearInterval(termInterval);
    termInterval = null;
  }
  if (logPollTimer) {
    clearInterval(logPollTimer);
    logPollTimer = null;
  }

  renderNav();

  const container = document.getElementById('page');
  container.innerHTML   = '';
  container.style.cssText = '';

  switch (state.route) {
    case 'home':     renderLanding(container);  break;
    case 'login':    renderLogin(container);    break;
    case 'register': renderRegister(container); break;
    case 'profile':  renderProfile(container);  break;
    case 'subjects':
      if (!state.auth.loggedIn) { navigate('login'); return; }
      renderSubjectSelect(container);
      break;
    case 'notes':
      if (!state.auth.loggedIn) { navigate('login'); return; }
      if (!state.auth.subjects || state.auth.subjects.length === 0) { navigate('subjects'); return; }
      renderNotes(container);
      break;
    default:
      container.innerHTML = `
        <div class="page tc" style="padding-top:5rem">
          <div style="font-family:var(--display);font-size:6rem;color:var(--green);opacity:.3;line-height:1">404</div>
          <h2 style="color:var(--text-dim);font-family:var(--mono);margin-bottom:1rem">${t('notFound')}</h2>
          <button class="btn" onclick="navigate('home')">${t('returnHome')}</button>
        </div>`;
  }
}

// ── Boot ──────────────────────────────────────────────────────────
loadAuthState();
startNodePolling();
render();