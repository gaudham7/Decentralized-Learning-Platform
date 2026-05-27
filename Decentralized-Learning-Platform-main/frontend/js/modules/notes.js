/**
 * notes.js — Notes tab system with lazy-loaded subject data,
 *             randomized quiz (5 from pool of 20), simplify toggle,
 *             SHA-256 protocol, charts, and results.
 *             All UI strings use t() for Hindi/English switching.
 */

// ── Subject → topic bucket mapping ───────────────────────────────
const SUBJECT_TOPIC_BUCKET = {
  'Maths':            0,
  'Physics':          1,
  'Chemistry':        1,
  'Biology':          1,
  'English':          2,
  'EVS':              1,
  'Social Studies':   3,
  'History':          3,
  'Geography':        3,
  'Computer Science': 4,
  'Economics':        3,
};

const SUBJECT_FILE_MAP = {
  'Maths':            'notes_Maths',
  'Physics':          'notes_Physics',
  'Chemistry':        'notes_Chemistry',
  'Biology':          'notes_Biology',
  'English':          'notes_English',
  'EVS':              'notes_EVS',
  'Social Studies':   'notes_Social_Studies',
  'History':          'notes_History',
  'Geography':        'notes_Geography',
  'Computer Science': 'notes_Computer_Science',
  'Economics':        'notes_Economics',
};

function toLevelKey(schoolLevel) {
  if (schoolLevel === 'higher_secondary') return 'higherSecondary';
  return schoolLevel;
}

const _notesCache = {};

async function loadSubjectData(subject) {
  if (_notesCache[subject]) return _notesCache[subject];
  const fileName = SUBJECT_FILE_MAP[subject];
  if (!fileName) return null;
  try {
    await new Promise((resolve, reject) => {
      if (document.querySelector(`script[data-subject="${subject}"]`)) { resolve(); return; }
      const script = document.createElement('script');
      script.src = `js/modules/notes_data/${fileName}.js`;
      script.dataset.subject = subject;
      script.onload  = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    const varName = 'NOTES_' + fileName.replace('notes_', '');
    const data = window[varName];
    if (data) { _notesCache[subject] = data; return data; }
    return null;
  } catch (e) {
    console.warn(`Failed to load notes for ${subject}:`, e);
    return null;
  }
}

async function getNotesData(subject) {
  const grade    = state.auth.grade;
  const levelKey = toLevelKey(getSchoolLevel(grade));
  const data     = await loadSubjectData(subject);
  if (!data) return null;
  return data[levelKey] || null;
}

function getRandomizedQuiz(questionPool, count = 5) {
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  return selected.map(q => {
    const correctText  = q.options[q.answer];
    const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
    return { q: q.q, opts: shuffledOpts, c: shuffledOpts.indexOf(correctText), exp: q.explanation };
  });
}

async function runNotesProtocol(correct, total, subject) {
  const ns          = state.notes;
  const accuracy    = correct / total;
  const topicBucket = SUBJECT_TOPIC_BUCKET[subject] ?? 0;
  const gradeConf   = getGradeConfig(state.auth.grade);
  const baseLevel   = gradeConf.startLevel;

  let levelBucket;
  if      (accuracy === 1)   levelBucket = Math.min(5, baseLevel + 1);
  else if (accuracy >= 0.8)  levelBucket = baseLevel;
  else if (accuracy >= 0.6)  levelBucket = baseLevel;
  else if (accuracy >= 0.4)  levelBucket = Math.max(1, baseLevel - 1);
  else                       levelBucket = Math.max(1, baseLevel - 2);

  const assessment = { topic: TOPIC_NAMES[topicBucket], questionsAttempted: total, correctAnswers: correct, timeSpentSeconds: 0 };
  const masked     = PrivacyCrypto.generateMaskedRequest(assessment);
  const savings    = PrivacyCrypto.calculateBandwidthSavings(masked, TOTAL_KB);

  let modules = [];
  if (API.isOnline()) {
    const res = await API.submitRequest(masked);
    if (res.success) modules = res.data.modules || [];
  }
  if (!modules.length) modules = getModulesLocal(masked.topicBucket, masked.levelBucket);

  ns.protocol  = { assessment, masked, savings, modules };
  if (state.auth.loggedIn) {
    applyProgression(state.auth.username, ns.activeSubject, (correct / total) * 100);
  }
  ns.quizPhase = 'results';
  render();
}

// ── Main Notes Renderer ───────────────────────────────────────────
function renderNotes(container) {
  const page     = el('div', { class: 'page' });
  const subjects = state.auth.subjects;
  const ns       = state.notes;

  if (!subjects.includes(ns.activeSubject)) {
    ns.activeSubject      = subjects[0];
    ns.quizPhase          = null;
    ns.quizAnswers        = {};
    ns.currentQ           = 0;
    ns.quizRound          = 1;
    ns.activeQuiz         = null;
    ns.simplifiedSections = {};
  }

  page.appendChild(el('div', { class: 'sh' },
    el('h1', null, t('notesTitle')),
    el('p',  null, `// ${SCHOOL_LEVELS[getSchoolLevel(state.auth.grade)]?.label} — ${t('grade', state.auth.grade)}`)
  ));

  const tabBar = el('div', {
    style: { display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }
  });
  subjects.forEach(subj => {
    const isActive = subj === ns.activeSubject;
    const tabBtn   = el('button', { class: `btn${isActive ? ' btn-p' : ''}`, style: { fontSize: '.78rem', padding: '.4rem 1rem' } }, subj);
    tabBtn.addEventListener('click', () => {
      if (subj !== ns.activeSubject) {
        ns.activeSubject = subj; ns.quizPhase = null; ns.quizAnswers = {};
        ns.currentQ = 0; ns.quizRound = 1; ns.activeQuiz = null; ns.simplifiedSections = {};
        render();
      }
    });
    tabBar.appendChild(tabBtn);
  });
  page.appendChild(tabBar);

  const loadingDiv = el('div', { class: 'card tc' },
    el('div', { style: { fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontSize: '.9rem' } }, t('loading'))
  );
  page.appendChild(loadingDiv);
  container.appendChild(page);

  getNotesData(ns.activeSubject).then(notesData => {
    page.removeChild(loadingDiv);
    if (!notesData) {
      page.appendChild(el('div', { class: 'card tc' },
        el('div', { style: { fontSize: '2rem', marginBottom: '1rem' } }, '📚'),
        el('div', { class: 'card-title tc' }, t('comingSoon')),
        el('div', { style: { fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontSize: '.85rem' } }, t('comingSoonSub', ns.activeSubject))
      ));
      return;
    }
    if      (!ns.quizPhase)                renderNotesContent(page, notesData);
    else if (ns.quizPhase === 'quiz')       renderNotesQuiz(page, notesData);
    else if (ns.quizPhase === 'processing') renderNotesProcessing(page);
    else if (ns.quizPhase === 'results')    renderNotesResults(page, notesData);
  });
}

// ── Notes Content ─────────────────────────────────────────────────
function renderNotesContent(page, notesData) {
  const ns = state.notes;
  if (!ns.simplifiedSections) ns.simplifiedSections = {};

  page.appendChild(el('div', { class: 'card mb4' },
    el('div', { class: 'card-title' }, `📖 ${notesData.title || ns.activeSubject}`)
  ));

  notesData.sections.forEach((section, idx) => {
    const isSimplified = !!ns.simplifiedSections[idx];
    const card         = el('div', { class: 'card mb3' });

    const headerRow = el('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' } });
    headerRow.appendChild(el('div', {
      style: { fontFamily: 'var(--display)', fontSize: '.9rem', color: 'var(--green)', letterSpacing: '.05em', textTransform: 'uppercase' }
    }, '◈ ' + section.heading));

    if (section.simplified) {
      const toggleBtn = el('button', {
        class: 'btn btn-sm',
        style: { fontSize: '.68rem', padding: '.25rem .7rem', background: isSimplified ? 'hsla(150,100%,45%,.15)' : 'transparent', borderColor: isSimplified ? 'var(--green)' : 'var(--border)', color: isSimplified ? 'var(--green)' : 'var(--text-dim)' }
      }, isSimplified ? t('simplified') : t('simplify'));
      toggleBtn.addEventListener('click', () => { ns.simplifiedSections[idx] = !ns.simplifiedSections[idx]; render(); });
      headerRow.appendChild(toggleBtn);
    }
    card.appendChild(headerRow);

    card.appendChild(el('div', {
      style: { fontFamily: isSimplified ? 'var(--mono)' : 'var(--body)', fontSize: isSimplified ? '.85rem' : '.95rem', color: 'var(--text)', lineHeight: isSimplified ? '2' : '1.8', whiteSpace: 'pre-line', background: isSimplified ? 'hsla(150,100%,45%,.03)' : 'transparent', borderRadius: '4px', padding: isSimplified ? '.75rem' : '0' }
    }, isSimplified && section.simplified ? section.simplified : section.content));

    page.appendChild(card);
  });

  const poolSize = notesData.questionPool?.length || 0;
  const ctaCard  = el('div', { class: 'card mb4', style: { textAlign: 'center', padding: '2rem' } });
  ctaCard.appendChild(el('div', { style: { fontSize: '2rem', marginBottom: '.75rem' } }, '🧠'));
  ctaCard.appendChild(el('div', { class: 'card-title', style: { justifyContent: 'center', display: 'flex', marginBottom: '.75rem' } }, t('testKnowledge', ns.activeSubject.toUpperCase())));
  ctaCard.appendChild(el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--text-dim)', marginBottom: '1.5rem' } }, t('questionsInfo', poolSize)));

  const quizBtn = el('button', { class: 'btn btn-p', style: { fontSize: '1rem', padding: '.8rem 2rem' } }, t('startQuiz'));
  quizBtn.addEventListener('click', () => {
    ns.activeQuiz  = notesData.questionPool?.length ? getRandomizedQuiz(notesData.questionPool, 5) : (notesData.quiz || []);
    ns.quizPhase   = 'quiz';
    ns.quizAnswers = {};
    ns.currentQ    = 0;
    ns.quizRound   = (ns.quizRound || 0) + 1;
    render();
  });
  ctaCard.appendChild(quizBtn);
  page.appendChild(ctaCard);
}

// ── Notes Quiz ────────────────────────────────────────────────────
function renderNotesQuiz(page, notesData) {
  const ns       = state.notes;
  const qs       = ns.activeQuiz || [];
  if (!qs.length) { page.appendChild(el('div', { class: 'card tc' }, 'No questions available.')); return; }

  const q        = qs[ns.currentQ];
  const answered = ns.quizAnswers[ns.currentQ] !== undefined;
  const keys     = ['A', 'B', 'C', 'D'];

  page.appendChild(el('div', { class: 'sh' },
    el('div', { class: 'flex sb ac' },
      el('div', null,
        el('h1', null, t('quiz')),
        el('p',  null, `// ${ns.activeSubject} — Q${ns.currentQ + 1} of ${qs.length}`)
      ),
      el('button', { class: 'btn btn-sm', onClick: () => { ns.quizPhase = null; ns.quizAnswers = {}; ns.currentQ = 0; render(); } }, t('backToNotesBtn'))
    )
  ));

  page.appendChild(el('div', { class: 'pb mb4' },
    el('div', { class: 'pf', style: { width: `${(ns.currentQ / qs.length) * 100}%` } })
  ));

  const qcard = el('div', { class: 'card mb3' });
  qcard.appendChild(el('div', { class: 'flex sb mb2' },
    el('span', { class: 'badge bd' }, `Q${ns.currentQ + 1}/${qs.length}`),
  ));
  qcard.appendChild(el('p', { style: { fontSize: '1.05rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--text-bright)' } }, q.q));

  q.opts.forEach((opt, i) => {
    let cls = 'qopt';
    if (answered) {
      cls += ' qdis';
      if (i === q.c) cls += ' qcor';
      else if (i === ns.quizAnswers[ns.currentQ]) cls += ' qwrong';
    }
    const children = [el('span', { class: 'okey' }, keys[i]), el('span', null, opt)];
    if (answered && i === q.c) children.push(el('span', { style: { marginLeft: 'auto', color: 'var(--green)' } }, '✓'));
    if (answered && i === ns.quizAnswers[ns.currentQ] && i !== q.c) children.push(el('span', { style: { marginLeft: 'auto', color: 'var(--red)' } }, '✗'));
    const optBtn = el('button', { class: cls }, ...children);
    optBtn.addEventListener('click', () => { if (ns.quizAnswers[ns.currentQ] !== undefined) return; ns.quizAnswers[ns.currentQ] = i; render(); });
    qcard.appendChild(optBtn);
  });

  if (answered && q.exp) {
    qcard.appendChild(el('div', {
      class: 'ani',
      style: { background: 'hsla(150,100%,45%,.06)', border: '1px solid var(--border-bright)', borderRadius: '4px', padding: '1rem', marginTop: '1rem', fontFamily: 'var(--body)', fontSize: '.9rem', color: 'var(--text)', lineHeight: '1.7' }
    },
      el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--green)', marginBottom: '.5rem' } }, t('explanation')),
      el('div', null, q.exp)
    ));
  }
  page.appendChild(qcard);

  if (answered) {
    page.appendChild(el('div', { style: { textAlign: 'right' } },
      el('button', {
        class: 'btn btn-p',
        onClick: () => {
          if (ns.currentQ < qs.length - 1) { ns.currentQ++; render(); }
          else {
            const correct = Object.entries(ns.quizAnswers).filter(([qi, ai]) => qs[parseInt(qi)]?.c === ai).length;
            if (state.auth.loggedIn) {
              const key = `edulift_u_${state.auth.username}`;
              const ud  = JSON.parse(localStorage.getItem(key) || '{}');
              ud.quizzesTaken   = (ud.quizzesTaken   || 0) + 1;
              ud.totalCorrect   = (ud.totalCorrect   || 0) + correct;
              ud.totalQuestions = (ud.totalQuestions || 0) + qs.length;
              localStorage.setItem(key, JSON.stringify(ud));
            }
            ns.quizPhase = 'processing';
            render();
            setTimeout(() => runNotesProtocol(correct, qs.length, ns.activeSubject), 80);
          }
        }
      }, ns.currentQ < qs.length - 1 ? t('nextQuestion') : t('processResults'))
    ));
  }
}

// ── Processing Screen ─────────────────────────────────────────────
function renderNotesProcessing(page) {
  page.style.display = 'flex'; page.style.alignItems = 'center'; page.style.justifyContent = 'center'; page.style.minHeight = '60vh';
  const wrap = el('div', { style: { maxWidth: '500px', width: '100%' } });
  const card = el('div', { class: 'card' });
  card.appendChild(el('div', { class: 'card-title tc' }, t('processing')));
  card.appendChild(el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: '1rem' } }, `// Processing ${state.notes.activeSubject} quiz results`));

  const term  = el('div', { class: 'term mt2' });
  const lines = [
    'Computing quiz score locally on device...',
    'Mapping accuracy → difficulty bucket...',
    'Generating cryptographic nonce (Web Crypto)...',
    'Building SHA-256 3-part hash chain token...',
    'Transmitting ~48 bytes to server node...',
    'Receiving matched learning modules ✓',
  ];
  let step = 0;
  const tick = () => {
    if (step >= lines.length) return;
    term.appendChild(el('div', { class: 'ani', style: { color: step === lines.length - 1 ? 'var(--green)' : 'var(--text-dim)', marginBottom: '.2rem' } }, '> ' + lines[step]));
    step++; if (step < lines.length) setTimeout(tick, 500);
  };
  setTimeout(tick, 100);
  card.appendChild(term); wrap.appendChild(card); page.appendChild(wrap);
}

// ── Quiz history helpers ──────────────────────────────────────────
function saveQuizResult(subject, acc, round) {
  if (!state.auth.loggedIn) return;
  const key     = `edulift_quiz_${state.auth.username}`;
  const history = JSON.parse(localStorage.getItem(key) || '[]');
  history.push({ subject, acc, round, ts: Date.now() });
  if (history.length > 200) history.splice(0, history.length - 200);
  localStorage.setItem(key, JSON.stringify(history));
}

function loadQuizHistory() {
  if (!state.auth.loggedIn) return [];
  return JSON.parse(localStorage.getItem(`edulift_quiz_${state.auth.username}`) || '[]');
}

// ── SVG helpers ───────────────────────────────────────────────────
function svgEl(tag, attrs) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

function renderPerformanceChart(qs, answers) {
  const W = 500, H = 160, pad = { l: 40, r: 16, t: 16, b: 32 };
  const chartW = W - pad.l - pad.r, chartH = H - pad.t - pad.b;
  const n = qs.length, bw = Math.floor(chartW / n) - 6;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, style: 'width:100%;height:auto;display:block' });
  [0, 50, 100].forEach(pct => {
    const y = pad.t + chartH - (pct / 100) * chartH;
    svg.appendChild(svgEl('line', { x1: pad.l, x2: W - pad.r, y1: y, y2: y, stroke: 'hsl(220,15%,18%)', 'stroke-width': '1' }));
    const lbl = svgEl('text', { x: pad.l - 6, y: y + 4, fill: 'hsl(150,10%,50%)', 'font-size': '10', 'text-anchor': 'end', 'font-family': 'monospace' });
    lbl.textContent = pct + '%'; svg.appendChild(lbl);
  });
  qs.forEach((q, i) => {
    const correct = answers[i] === q.c;
    const x = pad.l + i * (chartW / n) + (chartW / n - bw) / 2;
    const barH = correct ? chartH : Math.round(chartH * 0.15);
    const y = pad.t + chartH - barH;
    const col = correct ? 'hsl(150,100%,45%)' : 'hsl(0,90%,55%)';
    svg.appendChild(svgEl('rect', { x, y, width: bw, height: barH, fill: col, opacity: '0.85', rx: '3' }));
    svg.appendChild(svgEl('rect', { x, y, width: bw, height: barH, fill: 'none', stroke: col, 'stroke-width': '1', opacity: '0.4', rx: '3' }));
    const lbl = svgEl('text', { x: x + bw / 2, y: H - pad.b + 14, fill: 'hsl(150,10%,50%)', 'font-size': '10', 'text-anchor': 'middle', 'font-family': 'monospace' });
    lbl.textContent = 'Q' + (i + 1); svg.appendChild(lbl);
    const icon = svgEl('text', { x: x + bw / 2, y: y - 5, fill: col, 'font-size': '11', 'text-anchor': 'middle' });
    icon.textContent = correct ? '✓' : '✗'; svg.appendChild(icon);
  });
  return svg;
}

function renderTrendChart(history, subject) {
  const sh = history.filter(h => h.subject === subject).slice(-10);
  if (sh.length < 2) return null;
  const W = 500, H = 140, pad = { l: 40, r: 16, t: 16, b: 28 };
  const chartW = W - pad.l - pad.r, chartH = H - pad.t - pad.b, n = sh.length;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, style: 'width:100%;height:auto;display:block' });
  [0, 50, 100].forEach(pct => {
    const y = pad.t + chartH - (pct / 100) * chartH;
    svg.appendChild(svgEl('line', { x1: pad.l, x2: W - pad.r, y1: y, y2: y, stroke: 'hsl(220,15%,18%)', 'stroke-width': '1' }));
    const lbl = svgEl('text', { x: pad.l - 6, y: y + 4, fill: 'hsl(150,10%,50%)', 'font-size': '10', 'text-anchor': 'end', 'font-family': 'monospace' });
    lbl.textContent = pct + '%'; svg.appendChild(lbl);
  });
  const pts = sh.map((h, i) => ({ x: pad.l + (i / (n - 1)) * chartW, y: pad.t + chartH - (h.acc / 100) * chartH, acc: h.acc }));
  svg.appendChild(svgEl('polygon', { points: `${pts[0].x},${pad.t + chartH} ` + pts.map(p => `${p.x},${p.y}`).join(' ') + ` ${pts[pts.length-1].x},${pad.t + chartH}`, fill: 'hsla(150,100%,45%,.08)' }));
  svg.appendChild(svgEl('path', { d: pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' '), fill: 'none', stroke: 'hsl(150,100%,45%)', 'stroke-width': '2', 'stroke-linejoin': 'round' }));
  pts.forEach(p => {
    svg.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: '4', fill: 'hsl(150,100%,45%)', stroke: 'hsl(220,15%,6%)', 'stroke-width': '2' }));
    const lbl = svgEl('text', { x: p.x, y: p.y - 8, fill: 'hsl(150,80%,70%)', 'font-size': '9', 'text-anchor': 'middle', 'font-family': 'monospace' });
    lbl.textContent = p.acc + '%'; svg.appendChild(lbl);
  });
  return svg;
}

function renderSubjectTrendChart(history, subjects) {
  if (!history.length) return null;
  const W = 500, H = 160, pad = { l: 40, r: 16, t: 16, b: 48 };
  const chartW = W - pad.l - pad.r, chartH = H - pad.t - pad.b;
  const avgs = subjects.map(s => {
    const entries = history.filter(h => h.subject === s);
    if (!entries.length) return null;
    return { subject: s, avg: Math.round(entries.reduce((sum, h) => sum + h.acc, 0) / entries.length), count: entries.length };
  }).filter(Boolean);
  if (!avgs.length) return null;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, style: 'width:100%;height:auto;display:block' });
  const bw  = Math.min(48, Math.floor(chartW / avgs.length) - 10);
  [0, 50, 100].forEach(pct => {
    const y = pad.t + chartH - (pct / 100) * chartH;
    svg.appendChild(svgEl('line', { x1: pad.l, x2: W - pad.r, y1: y, y2: y, stroke: 'hsl(220,15%,18%)', 'stroke-width': '1' }));
    const lbl = svgEl('text', { x: pad.l - 6, y: y + 4, fill: 'hsl(150,10%,50%)', 'font-size': '10', 'text-anchor': 'end', 'font-family': 'monospace' });
    lbl.textContent = pct + '%'; svg.appendChild(lbl);
  });
  avgs.forEach((s, i) => {
    const x = pad.l + (i + 0.5) * (chartW / avgs.length) - bw / 2;
    const barH = Math.max(4, Math.round((s.avg / 100) * chartH));
    const y = pad.t + chartH - barH;
    const col = s.avg >= 80 ? 'hsl(150,100%,45%)' : s.avg >= 60 ? 'hsl(50,100%,55%)' : 'hsl(0,90%,55%)';
    svg.appendChild(svgEl('rect', { x, y, width: bw, height: barH, fill: col, opacity: '0.8', rx: '3' }));
    svg.appendChild(svgEl('rect', { x, y, width: bw, height: barH, fill: 'none', stroke: col, 'stroke-width': '1', opacity: '0.4', rx: '3' }));
    const valLbl = svgEl('text', { x: x + bw / 2, y: y - 5, fill: col, 'font-size': '10', 'text-anchor': 'middle', 'font-family': 'monospace' });
    valLbl.textContent = s.avg + '%'; svg.appendChild(valLbl);
    const g = svgEl('g', { transform: `translate(${x + bw / 2},${pad.t + chartH + 8})` });
    const subLbl = svgEl('text', { transform: 'rotate(-35)', fill: 'hsl(150,10%,60%)', 'font-size': '9', 'text-anchor': 'end', 'font-family': 'monospace' });
    subLbl.textContent = s.subject.length > 10 ? s.subject.slice(0, 9) + '…' : s.subject;
    g.appendChild(subLbl); svg.appendChild(g);
    const cntLbl = svgEl('text', { x: x + bw / 2, y: pad.t + chartH - 2, fill: 'hsl(220,15%,40%)', 'font-size': '9', 'text-anchor': 'middle', 'font-family': 'monospace' });
    cntLbl.textContent = `×${s.count}`; svg.appendChild(cntLbl);
  });
  return svg;
}

// ── Results ───────────────────────────────────────────────────────
function renderNotesResults(page, notesData) {
  const ns      = state.notes;
  const qs      = ns.activeQuiz || [];
  const correct = Object.entries(ns.quizAnswers).filter(([qi, ai]) => qs[parseInt(qi)]?.c === ai).length;
  const total   = qs.length;
  const acc     = Math.round((correct / total) * 100);

  const perf = acc === 100 ? { label: 'PERFECT!',     col: 'var(--green)',  emoji: '🏆' }
    : acc >= 80             ? { label: 'EXCELLENT',    col: 'var(--green)',  emoji: '⭐' }
    : acc >= 60             ? { label: 'GOOD',         col: 'var(--yellow)', emoji: '👍' }
    : acc >= 40             ? { label: 'NEEDS WORK',   col: 'var(--yellow)', emoji: '📖' }
    :                         { label: 'REVIEW NOTES', col: 'var(--red)',    emoji: '💪' };

  saveQuizResult(ns.activeSubject, acc, ns.quizRound);

  if (state.auth.loggedIn) {
    const key = `edulift_u_${state.auth.username}`;
    const ud  = JSON.parse(localStorage.getItem(key) || '{}');
    ud.quizzesTaken = (ud.quizzesTaken || 0) + 1;
    ud.totalCorrect = (ud.totalCorrect || 0) + correct;
    ud.totalQuestions = (ud.totalQuestions || 0) + total;
    if (!ud.subjectProgress) ud.subjectProgress = {};
    if (!ud.subjectProgress[ns.activeSubject]) ud.subjectProgress[ns.activeSubject] = { rounds: 0, bestScore: 0 };
    const sp = ud.subjectProgress[ns.activeSubject];
    sp.rounds = Math.max(sp.rounds, ns.quizRound);
    sp.bestScore = Math.max(sp.bestScore || 0, acc);
    localStorage.setItem(key, JSON.stringify(ud));
  }

  const history        = loadQuizHistory();
  const ud             = JSON.parse(localStorage.getItem(`edulift_u_${state.auth.username}`) || '{}');
  const sp             = ud.subjectProgress?.[ns.activeSubject] || { rounds: 1, bestScore: acc };
  const subjectHistory = history.filter(h => h.subject === ns.activeSubject);
  const avgScore       = subjectHistory.length ? Math.round(subjectHistory.reduce((s, h) => s + h.acc, 0) / subjectHistory.length) : acc;

  // Header
  page.appendChild(el('div', { class: 'sh' },
    el('div', { class: 'flex sb ac' },
      el('div', null,
        el('h1', null, t('results')),
        el('p',  null, `// ${ns.activeSubject} — ${t('round', ns.quizRound)}`)
      ),
      el('button', { class: 'btn btn-sm', onClick: () => { ns.quizPhase = null; ns.quizAnswers = {}; ns.currentQ = 0; ns.protocol = null; render(); } }, t('backToNotes'))
    )
  ));

  // Banner
  const banner = el('div', { class: 'card mb4', style: { textAlign: 'center', padding: '2rem' } });
  banner.appendChild(el('div', { style: { fontSize: '3rem', marginBottom: '.5rem' } }, perf.emoji));
  banner.appendChild(el('div', { style: { fontFamily: 'var(--display)', fontSize: '3.5rem', color: perf.col, lineHeight: '1' } }, acc + '%'));
  banner.appendChild(el('div', { style: { fontFamily: 'var(--display)', fontSize: '1rem', color: perf.col, marginTop: '.5rem', letterSpacing: '.15em' } }, perf.label));
  banner.appendChild(el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--text-dim)', marginTop: '.75rem' } }, `${correct} / ${total}`));
  page.appendChild(banner);

  // Stats
  const g3 = el('div', { class: 'g3 mb4' });
  [
    { v: avgScore + '%',              l: t('avgScore', ns.activeSubject), col: avgScore >= 60 ? 'var(--green)' : 'var(--yellow)' },
    { v: ns.quizRound + '',           l: t('roundsCompleted'),            col: 'var(--green)' },
    { v: (sp.bestScore || acc) + '%', l: t('bestScore'),                  col: 'var(--green)' },
  ].forEach(s => {
    g3.appendChild(el('div', { class: 'card sbox' },
      el('div', { class: 'sval', style: { color: s.col } }, s.v),
      el('div', { class: 'slbl' }, s.l)
    ));
  });
  page.appendChild(g3);

  // Chapter progress
  const progressCard = el('div', { class: 'card mb4' });
  progressCard.appendChild(el('div', { class: 'card-title' }, t('chapterProgress')));
  const secList = el('div', { style: { marginBottom: '1.25rem' } });
  (notesData.sections || []).forEach(s => {
    secList.appendChild(el('div', { style: { display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.5rem 0', borderBottom: '1px solid var(--border)' } },
      el('div', { style: { width: '20px', height: '20px', borderRadius: '50%', background: 'hsla(150,100%,45%,.15)', border: '1px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', color: 'var(--green)', flexShrink: '0' } }, '✓'),
      el('span', { style: { fontFamily: 'var(--body)', fontSize: '.9rem', color: 'var(--text)' } }, s.heading)
    ));
  });
  progressCard.appendChild(secList);
  page.appendChild(progressCard);

  // Charts

  const trendChart = renderTrendChart(history, ns.activeSubject);
  if (trendChart) {
    const trendCard = el('div', { class: 'card mb4' });
    trendCard.appendChild(el('div', { class: 'card-title' }, t('scoreTrend', ns.activeSubject.toUpperCase())));
    trendCard.appendChild(trendChart);
    page.appendChild(trendCard);
  }

  const subjectChart = renderSubjectTrendChart(history, state.auth.subjects || []);
  if (subjectChart) {
    const subjCard = el('div', { class: 'card mb4' });
    subjCard.appendChild(el('div', { class: 'card-title' }, t('subjectAvg')));
    subjCard.appendChild(subjectChart);
    page.appendChild(subjCard);
  }

  // Answer review
  const reviewCard = el('div', { class: 'card mb4' });
  reviewCard.appendChild(el('div', { class: 'card-title' }, t('answerReview')));
  qs.forEach((q, i) => {
    const userAns   = ns.quizAnswers[i];
    const isCorrect = userAns === q.c;
    const keys      = ['A', 'B', 'C', 'D'];
    const qDiv = el('div', { style: { padding: '1rem', marginBottom: '1rem', border: `1px solid ${isCorrect ? 'var(--border)' : 'hsla(0,90%,55%,.3)'}`, borderRadius: '4px', background: isCorrect ? 'transparent' : 'hsla(0,90%,55%,.04)' } });
    qDiv.appendChild(el('div', { class: 'flex sb ac mb1' },
      el('span', { style: { fontFamily: 'var(--mono)', fontSize: '.75rem', color: 'var(--text-dim)' } }, `Q${i + 1}`),
      el('span', { class: isCorrect ? 'badge bg' : 'badge br' }, isCorrect ? t('correct') : t('wrong'))
    ));
    qDiv.appendChild(el('div', { style: { fontWeight: '600', marginBottom: '.75rem', color: 'var(--text-bright)', lineHeight: '1.5' } }, q.q));
    if (!isCorrect && userAns !== undefined)
      qDiv.appendChild(el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--red)', marginBottom: '.3rem' } }, `${keys[userAns]} — ${q.opts[userAns]}`));
    qDiv.appendChild(el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--green)', marginBottom: '.75rem' } }, `✓ ${keys[q.c]} — ${q.opts[q.c]}`));
    if (q.exp) {
      qDiv.appendChild(el('div', { style: { background: 'hsla(150,100%,45%,.06)', borderRadius: '4px', padding: '.75rem', fontFamily: 'var(--body)', fontSize: '.85rem', color: 'var(--text)', lineHeight: '1.7' } },
        el('span', { style: { fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--green)', display: 'block', marginBottom: '.3rem' } }, t('why')),
        el('span', null, q.exp)
      ));
    }
    reviewCard.appendChild(qDiv);
  });
  page.appendChild(reviewCard);

  // Actions
  const actionsCard = el('div', { class: 'card' });
  actionsCard.appendChild(el('div', { class: 'card-title', style: { justifyContent: 'center', display: 'flex', marginBottom: '1.5rem' } }, t('whatNext')));
  const btnRow = el('div', { style: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' } });

  btnRow.appendChild(el('button', {
    class: 'btn btn-p',
    onClick: () => {
      getNotesData(ns.activeSubject).then(d => {
        if (d?.questionPool?.length) ns.activeQuiz = getRandomizedQuiz(d.questionPool, 5);
        ns.quizPhase = 'quiz'; ns.quizAnswers = {}; ns.currentQ = 0; ns.quizRound++; ns.protocol = null;
        render();
      });
    }
  }, t('TAKE ANOTHER TEST')));

  btnRow.appendChild(el('button', {
    class: 'btn',
    onClick: () => { ns.quizPhase = null; ns.quizAnswers = {}; ns.currentQ = 0; ns.quizRound = 0; ns.protocol = null; render(); }
  }, t('backToNotes')));

  actionsCard.appendChild(btnRow);
  page.appendChild(actionsCard);
}