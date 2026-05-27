/**
 * state.js — Global application state and router
 */

// ── Subject catalog per school level ─────────────────────────────
const SCHOOL_LEVELS = {
  primary: {
    label: 'Primary',
    grades: [1, 2, 3, 4, 5],
    subjects: ['Maths', 'English', 'EVS', 'Social Studies'],
  },
  secondary: {
    label: 'Secondary',
    grades: [6, 7, 8, 9, 10],
    subjects: ['Maths', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English'],
  },
  higher_secondary: {
    label: 'Higher Secondary',
    grades: [11, 12],
    subjects: ['Physics', 'Chemistry', 'Maths', 'Biology', 'Computer Science', 'Economics', 'English'],
  },
};

function diffToLevel(d) {
  if (d <= 2) return 'L1 — Beginner';
  if (d <= 3) return 'L2 — Intermediate';
  return 'L3 — Advanced';
}

function getSchoolLevel(grade) {
  if (grade >= 1  && grade <= 5)  return 'primary';
  if (grade >= 6  && grade <= 10) return 'secondary';
  if (grade >= 11 && grade <= 12) return 'higher_secondary';
  return 'secondary';
}

function getSubjectsForGrade(grade) {
  return SCHOOL_LEVELS[getSchoolLevel(grade)]?.subjects || [];
}

// ── Global app state ──────────────────────────────────────────────
const state = {
  route: 'home',
  auth: {
    loggedIn:      false,
    username:      null,
    grade:         null,
    gradeConfig:   null,
    subjects:      [],   // chosen subjects
  },
  nodeInfo:   null,
  nodeOnline: false,
  serverLog:  [],
  notes: {
    activeSubject:    null,  // currently viewed subject tab
    quizPhase:        null,  // null | 'quiz' | 'processing' | 'results'
    quizAnswers:      {},
    quizRevealed:     false,
    currentQ:         0,
    quizRound:        1,
    protocol:         null,  // { assessment, masked, savings, serverResp, modules }
  },

  student: {
    phase:         'topic',
    topic:         null,
    targetLevel:   null,
    suggestedLevel:null,
    currentQ:      0,
    answers:       {},
    revealed:      false,
    startTime:     null,
    elapsed:       0,
    assessment:    null,
    masked:        null,
    serverResp:    null,
    modules:       [],
    savings:       null,
    procStep:      0,
    elapsedTimer:  null,
  },
};

let termInterval = null;
let termTick     = 0;
let logPollTimer  = null;

// ── DOM helper ────────────────────────────────────────────────────
function el(tag, attrs, ...children) {
  const e = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class')                                      e.className = v;
      else if (k.startsWith('on') && typeof v === 'function') e[k.toLowerCase()] = v;
      else if (k === 'style' && typeof v === 'object')        Object.assign(e.style, v);
      else e.setAttribute(k, v);
    }
  }
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return e;
}

// ── Router ────────────────────────────────────────────────────────
const VALID_ROUTES = ['home', 'login', 'register', 'profile', 'notes', 'subjects'];

function navigate(route) {
  state.route = route;
  history.pushState({}, '', '#/' + (route === 'home' ? '' : route));
  render();
}

window.addEventListener('popstate', () => {
  const h = location.hash.replace('#/', '');
  state.route = VALID_ROUTES.includes(h) ? h : 'home';
  render();
});

(function () {
  const h = location.hash.replace('#/', '');
  state.route = VALID_ROUTES.includes(h) ? h : 'home';
})();