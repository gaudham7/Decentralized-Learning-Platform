/**
 * auth.js — Authentication helpers and page renderers
 */

// ── AUTH STATE HELPERS ────────────────────────────────────────────

function loadAuthState() {
  try {
    const stored = localStorage.getItem('edulift_user');
    if (stored) {
      const user = JSON.parse(stored);
      state.auth.loggedIn    = true;
      state.auth.username    = user.username;
      state.auth.grade       = user.grade;
      state.auth.gradeConfig = getGradeConfig(user.grade);
      state.auth.subjects    = user.subjects || [];

      // Restore active notes subject if valid
      if (state.auth.subjects.length && !state.notes.activeSubject) {
        state.notes.activeSubject = state.auth.subjects[0];
      }
    }
  } catch(e) {}
}

function saveAuthState(username, grade, subjects) {
  state.auth.loggedIn    = true;
  state.auth.username    = username;
  state.auth.grade       = grade;
  state.auth.gradeConfig = getGradeConfig(grade);
  state.auth.subjects    = subjects || [];
  if (state.auth.subjects.length && !state.notes.activeSubject) {
    state.notes.activeSubject = state.auth.subjects[0];
  }
}

function logout() {
  localStorage.removeItem('edulift_user');
  state.auth = { loggedIn: false, username: null, grade: null, gradeConfig: null, subjects: [] };
  state.notes = { activeSubject: null, quizPhase: null, quizAnswers: {}, quizRevealed: false, currentQ: 0, quizRound: 1 };
  state.route = 'home';
  render();
}

// ── SUBJECT SELECTION PAGE ────────────────────────────────────────

function renderSubjectSelect(container) {
  const page = el('div', { class: 'page' });
  const grade = state.auth.grade;
  const levelKey = getSchoolLevel(grade);
  const levelInfo = SCHOOL_LEVELS[levelKey];
  const allSubjects = levelInfo.subjects;

  // Load saved subjects
  let chosen = [...(state.auth.subjects || [])];

  page.appendChild(el('div', { class: 'sh' },
    el('h1', null, 'CHOOSE YOUR SUBJECTS'),
    el('p', null, `// ${levelInfo.label} — Grade ${grade} · Select subjects to study and get notes`)
  ));

  const card = el('div', { class: 'card mb4' });
  card.appendChild(el('div', { class: 'card-title' }, `◈ ${levelInfo.label.toUpperCase()} SUBJECTS`));
  card.appendChild(el('div', {
    style: { fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--text-dim)', marginBottom: '1.5rem' }
  }, 'Select the subjects you are studying this year. You can update these anytime from your profile.'));

  const subjectIcons = {
    'Maths': '∑', 'English': '✍', 'EVS': '🌿', 'Social Studies': '🗺',
    'Physics': '⚡', 'Chemistry': '⚗', 'Biology': '🧬', 'History': '📜',
    'Geography': '🌍', 'Computer Science': '⬡', 'Economics': '📊',
  };

  const grid = el('div', { class: 'tgrid' });
  allSubjects.forEach(subj => {
    const isChosen = chosen.includes(subj);
    const btn = el('button', {
      class: `tbtn${isChosen ? ' tsel' : ''}`,
    },
      el('span', { style: { fontSize: '1.5rem', display: 'block', marginBottom: '.5rem' } }, subjectIcons[subj] || '📖'),
      subj
    );
    btn.addEventListener('click', () => {
      if (chosen.includes(subj)) {
        chosen = chosen.filter(s => s !== subj);
        btn.classList.remove('tsel');
      } else {
        chosen.push(subj);
        btn.classList.add('tsel');
      }
      saveBtn.disabled = chosen.length === 0;
    });
    grid.appendChild(btn);
  });
  card.appendChild(grid);

  const saveBtn = el('button', {
    class: 'btn btn-p w100',
    style: { marginTop: '1.5rem' },
  }, '▶ SAVE SUBJECTS & GO TO NOTES');
  saveBtn.disabled = chosen.length === 0;

  saveBtn.addEventListener('click', () => {
    // persist
    const stored = JSON.parse(localStorage.getItem(`edulift_u_${state.auth.username}`) || '{}');
    stored.subjects = chosen;
    localStorage.setItem(`edulift_u_${state.auth.username}`, JSON.stringify(stored));

    const userMeta = JSON.parse(localStorage.getItem('edulift_user') || '{}');
    userMeta.subjects = chosen;
    localStorage.setItem('edulift_user', JSON.stringify(userMeta));

    state.auth.subjects = chosen;
    state.notes.activeSubject = chosen[0];
    state.notes.quizPhase = null;
    navigate('notes');
  });

  card.appendChild(saveBtn);
  page.appendChild(card);
  container.appendChild(page);
}

// ── LOGIN PAGE ────────────────────────────────────────────────────

function renderLogin(container) {
  const wrap = el('div', { class: 'auth-wrap' });
  const card = el('div', { class: 'auth-card' });

  card.appendChild(el('div', { class: 'auth-title' }, 'WELCOME BACK'));
  card.appendChild(el('div', { class: 'auth-sub' }, '// login to continue your learning journey'));

  const errBox = el('div', { class: 'auth-error', id: 'login-err' }, '');
  card.appendChild(errBox);

  const uField = el('div', { class: 'auth-field' });
  uField.appendChild(el('label', { class: 'auth-label' }, 'Username'));
  uField.appendChild(el('input', { class: 'auth-input', type: 'text', placeholder: 'enter your username', id: 'login-user' }));
  card.appendChild(uField);

  const pField = el('div', { class: 'auth-field' });
  pField.appendChild(el('label', { class: 'auth-label' }, 'Password'));
  pField.appendChild(el('input', { class: 'auth-input', type: 'password', placeholder: 'enter your password', id: 'login-pass' }));
  card.appendChild(pField);

  const loginBtn = el('button', { class: 'btn btn-p w100', style: { marginTop: '.5rem' } }, '▶ LOGIN');

  loginBtn.addEventListener('click', async () => {
    if (loginBtn.disabled) return;
    loginBtn.disabled = true;
    loginBtn.textContent = '... LOGGING IN';

    const username = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value;
    const errEl    = document.getElementById('login-err');
    errEl.textContent = '';
    errEl.classList.remove('show');

    if (!username || !password) {
      errEl.textContent = 'Please enter username and password';
      errEl.classList.add('show');
      loginBtn.disabled = false; loginBtn.textContent = '▶ LOGIN'; return;
    }

    const stored = localStorage.getItem(`edulift_u_${username}`);
    if (!stored) {
      errEl.textContent = 'Username not found. Please register first.';
      errEl.classList.add('show');
      loginBtn.disabled = false; loginBtn.textContent = '▶ LOGIN'; return;
    }

    let userData;
    try { userData = JSON.parse(stored); }
    catch(e) {
      errEl.textContent = 'Stored account data is corrupted. Please re-register.';
      errEl.classList.add('show');
      loginBtn.disabled = false; loginBtn.textContent = '▶ LOGIN'; return;
    }

    let passHash;
    try { passHash = await PrivacyCrypto.hashPassword(password); }
    catch(e) {
      errEl.textContent = 'Hashing error — please try again.';
      errEl.classList.add('show');
      loginBtn.disabled = false; loginBtn.textContent = '▶ LOGIN'; return;
    }

    if (passHash !== userData.passwordHash) {
      errEl.textContent = 'Incorrect password.';
      errEl.classList.add('show');
      loginBtn.disabled = false; loginBtn.textContent = '▶ LOGIN'; return;
    }

    const subjects = userData.subjects || [];
    localStorage.setItem('edulift_user', JSON.stringify({ username, grade: userData.grade, subjects }));
    saveAuthState(username, userData.grade, subjects);
    navigate('home');
  });

  card.appendChild(loginBtn);
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter') loginBtn.click(); });

  card.appendChild(el('div', { class: 'auth-switch' },
    'New here? ', el('span', { onClick: () => navigate('register') }, 'Create an account')
  ));

  wrap.appendChild(card);
  container.appendChild(wrap);
}

// ── REGISTER PAGE ─────────────────────────────────────────────────

function renderRegister(container) {
  const wrap = el('div', { class: 'auth-wrap' });
  const card = el('div', { class: 'auth-card' });

  card.appendChild(el('div', { class: 'auth-title' }, 'CREATE ACCOUNT'));
  card.appendChild(el('div', { class: 'auth-sub' }, '// your data never leaves this device'));

  const errBox = el('div', { class: 'auth-error', id: 'reg-err' }, '');
  card.appendChild(errBox);

  const uField = el('div', { class: 'auth-field' });
  uField.appendChild(el('label', { class: 'auth-label' }, 'Username'));
  uField.appendChild(el('input', { class: 'auth-input', type: 'text', placeholder: 'choose a username', id: 'reg-user' }));
  card.appendChild(uField);

  const pField = el('div', { class: 'auth-field' });
  pField.appendChild(el('label', { class: 'auth-label' }, 'Password'));
  pField.appendChild(el('input', { class: 'auth-input', type: 'password', placeholder: 'choose a password', id: 'reg-pass' }));
  card.appendChild(pField);

  const gField = el('div', { class: 'auth-field' });
  gField.appendChild(el('label', { class: 'auth-label' }, 'Your Grade'));
  const gGrid = el('div', { class: 'grade-grid', id: 'grade-grid' });
  let selectedGrade = null;

  for (let g = 1; g <= 12; g++) {
    const btn = el('button', { class: 'grade-btn' }, String(g));
    btn.dataset.grade = g;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('gsel'));
      btn.classList.add('gsel');
      selectedGrade = g;
    });
    gGrid.appendChild(btn);
  }
  gField.appendChild(gGrid);
  card.appendChild(gField);

  const regBtn = el('button', { class: 'btn btn-p w100', style: { marginTop: '.5rem' } }, '▶ CREATE ACCOUNT');

  regBtn.addEventListener('click', async () => {
    if (regBtn.disabled) return;
    regBtn.disabled = true;
    regBtn.textContent = '... CREATING';

    const username = document.getElementById('reg-user').value.trim();
    const password = document.getElementById('reg-pass').value;
    const errEl    = document.getElementById('reg-err');
    errEl.textContent = '';
    errEl.classList.remove('show');

    const fail = (msg) => {
      errEl.textContent = msg;
      errEl.classList.add('show');
      regBtn.disabled = false;
      regBtn.textContent = '▶ CREATE ACCOUNT';
    };

    if (!username || !password) return fail('Please fill in all fields');
    if (!selectedGrade)         return fail('Please select your grade');
    if (username.length < 3)    return fail('Username must be at least 3 characters');
    if (password.length < 6)    return fail('Password must be at least 6 characters');
    if (localStorage.getItem(`edulift_u_${username}`)) return fail('Username already taken. Choose another.');

    let passHash;
    try { passHash = await PrivacyCrypto.hashPassword(password); }
    catch(e) { return fail('Hashing error — please try again.'); }

    const grade = parseInt(selectedGrade);
    const userData = {
      username, passwordHash: passHash, grade, subjects: [],
      createdAt: Date.now(), quizzesTaken: 0, totalCorrect: 0, totalQuestions: 0,
    };

    localStorage.setItem(`edulift_u_${username}`, JSON.stringify(userData));
    localStorage.setItem('edulift_user', JSON.stringify({ username, grade, subjects: [] }));
    saveAuthState(username, grade, []);
    navigate('subjects'); // go straight to subject selection after register
  });

  card.appendChild(regBtn);
  card.appendChild(el('div', { class: 'auth-switch' },
    'Already have an account? ', el('span', { onClick: () => navigate('login') }, 'Login')
  ));

  wrap.appendChild(card);
  container.appendChild(wrap);
}

// ── PROFILE PAGE ──────────────────────────────────────────────────

function renderProfile(container) {
  const page   = el('div', { class: 'page' });
  const auth   = state.auth;
  const stored = JSON.parse(localStorage.getItem(`edulift_u_${auth.username}`) || '{}');

  const header = el('div', { class: 'profile-header' });
  header.appendChild(el('div', { class: 'profile-avatar' }, '👤'));
  const info = el('div', null);
  info.appendChild(el('div', { class: 'profile-name' }, auth.username.toUpperCase()));
  const levelKey = getSchoolLevel(auth.grade);
  info.appendChild(el('div', { class: 'profile-grade' },
    `${GRADE_CONFIG[auth.grade]?.label || 'Grade ' + auth.grade} · ${SCHOOL_LEVELS[levelKey]?.label} · D${GRADE_CONFIG[auth.grade]?.minLevel}–D${GRADE_CONFIG[auth.grade]?.maxLevel}`
  ));
  header.appendChild(info);
  page.appendChild(header);

  // Stats
  const stats    = el('div', { class: 'profile-stats mb4' });
  const quizzes  = stored.quizzesTaken   || 0;
  const correct  = stored.totalCorrect   || 0;
  const total    = stored.totalQuestions || 0;
  const accuracy = total > 0 ? ((correct / total) * 100).toFixed(0) + '%' : '—';
  const topLevel = state.auth.subjects?.length
  ? Math.max(...state.auth.subjects.map(s => {
      return getStudentLevel(state.auth.username, s);
    }))
  : 1;
  [
    { v: String(quizzes),  l: 'Quizzes Taken' },
    { v: accuracy,          l: 'Overall Accuracy' },
    { v: LEVELS[topLevel]?.label || 'Beginner', l: 'Current Level' },
  ].forEach(s => {
    stats.appendChild(el('div', { class: 'pstat' },
      el('div', { class: 'pstat-val' }, s.v),
      el('div', { class: 'pstat-lbl' }, s.l)
    ));
  });
  page.appendChild(stats);

  // Current subjects
  const subjCard = el('div', { class: 'card mb4' });
  subjCard.appendChild(el('div', { class: 'card-title' }, '◈ MY SUBJECTS'));
  if (auth.subjects && auth.subjects.length > 0) {
    const tags = el('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '1rem' } });
    auth.subjects.forEach(s => tags.appendChild(el('span', { class: 'badge bg' }, s)));
    subjCard.appendChild(tags);
  } else {
    subjCard.appendChild(el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--text-dim)', marginBottom: '1rem' } }, 'No subjects selected yet.'));
  }
  subjCard.appendChild(el('button', {
    class: 'btn btn-sm',
    onClick: () => navigate('subjects')
  }, '⚙ CHANGE SUBJECTS'));
  page.appendChild(subjCard);

  // Grade change
  const gc = el('div', { class: 'card mb4' });
  gc.appendChild(el('div', { class: 'card-title' }, '◈ CHANGE YOUR GRADE'));
  gc.appendChild(el('div', { style: { fontFamily: 'var(--mono)', fontSize: '.75rem', color: 'var(--text-dim)', marginBottom: '1rem' } },
    'Changing grade will update your difficulty range and available subjects.'));
  const gGrid = el('div', { class: 'grade-grid' });
  for (let g = 1; g <= 12; g++) {
    const btn = el('button', { class: 'grade-btn' + (g === auth.grade ? ' gsel' : '') }, String(g));
    btn.addEventListener('click', () => {
      document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('gsel'));
      btn.classList.add('gsel');
      const userData = JSON.parse(localStorage.getItem(`edulift_u_${auth.username}`) || '{}');
      userData.grade = g;
      userData.subjects = []; // reset subjects when grade changes
      localStorage.setItem(`edulift_u_${auth.username}`, JSON.stringify(userData));
      const meta = JSON.parse(localStorage.getItem('edulift_user') || '{}');
      meta.grade = g; meta.subjects = [];
      localStorage.setItem('edulift_user', JSON.stringify(meta));
      saveAuthState(auth.username, g, []);
      navigate('subjects');
    });
    gGrid.appendChild(btn);
  }
  gc.appendChild(gGrid);
  page.appendChild(gc);

  const logoutBtn = el('button', { class: 'btn br w100', style: { marginTop: '1rem' } }, '⏻ LOGOUT');
  logoutBtn.addEventListener('click', logout);
  page.appendChild(logoutBtn);

  container.appendChild(page);
}