/**
 * student.js — Student page: topic selection, quiz, processing, and results.
 */

// ── Entry point ───────────────────────────────────────────────────

function renderStudent(container) {
    const s    = state.student;
    const page = el('div', { class: 'page' });
  
    if      (s.phase === 'topic')      renderTopicSelect(page);
    else if (s.phase === 'quiz')       renderQuiz(page);
    else if (s.phase === 'processing') renderProcessing(page);
    else if (s.phase === 'results')    renderResults(page);
  
    container.appendChild(page);
  }
  
  // ── Topic selection ───────────────────────────────────────────────
  
  function renderTopicSelect(page) {
    const topics = [
      { id: 'mathematics', label: 'Mathematics', icon: '∑' },
      { id: 'science',     label: 'Science',     icon: '⚗' },
      { id: 'language',    label: 'Language',    icon: '✍' },
      { id: 'history',     label: 'History',     icon: '📜' },
      { id: 'computing',   label: 'Computing',   icon: '⬡' },
    ];
    const s = state.student;
  
    if (!s.targetLevel && !s.suggestedLevel && state.auth.gradeConfig) {
      s.suggestedLevel = state.auth.gradeConfig.startLevel;
    }
  
    page.appendChild(el('div', { class: 'sh' },
      el('h1', null, 'EDGE DEVICE'),
      el('p',  null, '// Select a topic to begin your assessment')
    ));
  
    const g2 = el('div', { class: 'g2 mb4' });
  
    // how it works card
    g2.appendChild(el('div', { class: 'card' },
      el('div', { class: 'card-title' }, '◈ HOW THIS WORKS'),
      el('div', { class: 'term mt1' },
        el('div', { style: { color: 'var(--text-dim)' } }, el('span', { style: { color: 'var(--green)' } }, '> '), '1. Take a 5-question assessment'),
        el('div', { style: { color: 'var(--text-dim)' } }, el('span', { style: { color: 'var(--green)' } }, '> '), '2. Score computed locally on YOUR device'),
        el('div', { style: { color: 'var(--text-dim)' } }, el('span', { style: { color: 'var(--green)' } }, '> '), '3. Difficulty bucketed (1-5), not raw'),
        el('div', { style: { color: 'var(--text-dim)' } }, el('span', { style: { color: 'var(--green)' } }, '> '), '4. SHA-256 opaque token generated'),
        el('div', { style: { color: 'var(--text-dim)' } }, el('span', { style: { color: 'var(--green)' } }, '> '), '5. Only ~48 bytes sent to server'),
        el('div', { style: { color: 'var(--green)'    } }, el('span', { style: { color: 'var(--green)' } }, '> '), '✓ Your identity: NEVER transmitted'),
      )
    ));
  
    // topic picker card
    const topicCard = el('div', { class: 'card' });
    topicCard.appendChild(el('div', { class: 'card-title' }, '◈ CHOOSE YOUR TOPIC'));
  
    const tgrid = el('div', { class: 'tgrid' });
    topics.forEach(t => {
      tgrid.appendChild(el('button', {
        class: `tbtn${s.topic === t.id ? ' tsel' : ''}`,
        onClick: () => { s.topic = t.id; render(); }
      },
        el('span', { style: { fontSize: '1.5rem', display: 'block', marginBottom: '.5rem' } }, t.icon),
        t.label
      ));
    });
    topicCard.appendChild(tgrid);
  
    const startBtn = el('button', {
      class: 'btn btn-p w100',
      style: { marginTop: '1rem' }
    }, s.topic ? `▶ BEGIN ${s.topic.toUpperCase()} QUIZ` : 'SELECT A TOPIC');
  
    if (!s.topic) startBtn.disabled = true;
  
    startBtn.addEventListener('click', () => {
      if (!state.student.topic) return;
      Object.assign(s, { phase: 'quiz', startTime: Date.now(), currentQ: 0, answers: {}, revealed: false });
      if (s.elapsedTimer) clearInterval(s.elapsedTimer);
      s.elapsedTimer = setInterval(() => {
        s.elapsed = Math.floor((Date.now() - s.startTime) / 1000);
        updateTimer();
      }, 1000);
      render();
    });
  
    topicCard.appendChild(startBtn);
    g2.appendChild(topicCard);
    page.appendChild(g2);
  }
  
  // ── Quiz ──────────────────────────────────────────────────────────
  
  function updateTimer() {
    const t = document.getElementById('quiz-timer');
    if (t) t.textContent = `⏱ ${state.student.elapsed}s`;
  }
  
  function renderQuiz(page) {
    const s   = state.student;
    const qs  = getFilteredQuestions(s);
    const q   = qs[s.currentQ];
    const answered = s.answers[s.currentQ] !== undefined;
    const keys = ['A', 'B', 'C', 'D'];
  
    page.appendChild(el('div', { class: 'sh' },
      el('div', { class: 'flex sb ac' },
        el('div', null,
          el('h1', null, 'ASSESSMENT'),
          el('p',  null, `// ${s.topic.toUpperCase()} — Question ${s.currentQ + 1} of ${qs.length}`)
        ),
        el('div', { class: 'flex gap1 ac' },
          el('span', { class: 'badge bd', id: 'quiz-timer' }, `⏱ ${s.elapsed}s`),
          el('span', { class: 'badge bg' }, `${Object.keys(s.answers).length}/${qs.length} answered`),
        )
      )
    ));
  
    page.appendChild(el('div', { class: 'pb mb4' },
      el('div', { class: 'pf', style: { width: `${(s.currentQ / qs.length) * 100}%` } })
    ));
  
    // Question card
    const qcard = el('div', { class: 'card mb3' });
    qcard.appendChild(el('div', { class: 'flex sb mb2' },
      el('span', { class: 'badge bd' }, `Q${s.currentQ + 1}`),
      el('span', { class: 'badge bd' }, diffToLevel(mod.difficulty)),
    ));
    qcard.appendChild(el('p', {
      style: { fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.5', color: 'var(--text-bright)' }
    }, q.q));
  
    q.opts.forEach((opt, i) => {
      let cls = 'qopt';
      if (answered) {
        cls += ' qdis';
        if (i === q.c) cls += ' qcor';
        else if (i === s.answers[s.currentQ] && i !== q.c) cls += ' qwrong';
      } else if (s.answers[s.currentQ] === i) {
        cls += ' qsel';
      }
  
      const children = [el('span', { class: 'okey' }, keys[i]), el('span', null, opt)];
      if (answered && i === q.c)
        children.push(el('span', { style: { marginLeft: 'auto', color: 'var(--green)' } }, '✓'));
      if (answered && i === s.answers[s.currentQ] && i !== q.c)
        children.push(el('span', { style: { marginLeft: 'auto', color: 'var(--red)' } }, '✗'));
  
      qcard.appendChild(el('button', {
        class: cls,
        onClick: () => {
          if (s.answers[s.currentQ] !== undefined) return;
          s.answers[s.currentQ] = i;
          s.revealed = true;
          render();
        }
      }, ...children));
    });
  
    page.appendChild(qcard);
  
    if (answered) {
      page.appendChild(el('div', { style: { textAlign: 'right' } },
        el('button', {
          class: 'btn btn-p',
          onClick: () => {
            if (s.currentQ < qs.length - 1) { s.currentQ++; s.revealed = false; render(); }
            else startProcessing();
          }
        }, s.currentQ < qs.length - 1 ? 'NEXT QUESTION →' : 'PROCESS RESULTS →')
      ));
    }
  }
  
  // ── Processing ────────────────────────────────────────────────────
  
  function renderProcessing(page) {
    page.style.display        = 'flex';
    page.style.alignItems     = 'center';
    page.style.justifyContent = 'center';
    page.style.minHeight      = '60vh';
  
    const wrap = el('div', { style: { maxWidth: '500px', width: '100%' } });
    const card = el('div', { class: 'card' });
    card.appendChild(el('div', { class: 'card-title tc' }, '⬡ RUNNING SHA-256 PROTOCOL'));
    card.appendChild(el('div', { class: 'term mt2', id: 'proc-term' }));
    wrap.appendChild(card);
    page.appendChild(wrap);
    setTimeout(() => renderProcStep(), 50);
  }
  
  function renderProcStep() {
    const lines = [
      'Computing raw assessment data...',
      'Mapping accuracy → difficulty bucket (SHA-256)...',
      'Generating cryptographic nonce (Web Crypto API)...',
      'Building SHA-256 3-part hash chain token...',
      'Transmitting 48 bytes to server node...',
      'Server responded with matched modules ✓',
    ];
    const t = document.getElementById('proc-term');
    if (!t) return;
    t.innerHTML = '';
    lines.slice(0, state.student.procStep).forEach((txt, i) => {
      t.appendChild(el('div', {
        class: 'ani',
        style: { color: i === state.student.procStep - 1 ? 'var(--green)' : 'var(--text-dim)' }
      }, '> ' + txt));
    });
  }
  
  async function startProcessing() {
    const s = state.student;
    if (s.elapsedTimer) clearInterval(s.elapsedTimer);
  
    const qs      = getFilteredQuestions(s);
    const correct = Object.entries(s.answers)
      .filter(([qi, ai]) => qs[parseInt(qi)] && qs[parseInt(qi)].c === ai).length;
  
    s.assessment = {
      topic:              s.topic,
      questionsAttempted: qs.length,
      correctAnswers:     correct,
      timeSpentSeconds:   s.elapsed,
    };
  
    // Update stored stats
    if (state.auth.loggedIn) {
      const key      = `edulift_u_${state.auth.username}`;
      const userData = JSON.parse(localStorage.getItem(key) || '{}');
      userData.quizzesTaken   = (userData.quizzesTaken   || 0) + 1;
      userData.totalCorrect   = (userData.totalCorrect   || 0) + correct;
      userData.totalQuestions = (userData.totalQuestions || 0) + qs.length;
      localStorage.setItem(key, JSON.stringify(userData));
      applyProgression(state.auth.username, s.topic, (correct / qs.length) * 100);
    }
  
    s.phase = 'processing';
    s.procStep = 0;
    render();
  
    const steps = [
      () => { s.procStep = 1; renderProcStep(); },
      () => { s.procStep = 2; renderProcStep(); },
      () => { s.procStep = 3; renderProcStep(); },
      async () => {
        s.masked  = PrivacyCrypto.generateMaskedRequest(s.assessment);
        s.savings = PrivacyCrypto.calculateBandwidthSavings(s.masked, TOTAL_KB);
        s.procStep = 4;
        renderProcStep();
  
        let serverResp = null;
        if (API.isOnline()) {
          const res = await API.submitRequest(s.masked);
          if (res.success) {
            serverResp = res.data;
            s.modules  = res.data.modules || [];
          }
        }
        if (!s.modules.length) {
          s.modules = getModulesLocal(s.masked.topicBucket, s.masked.levelBucket);
        }
        s.serverResp = serverResp;
        s.procStep   = 5;
        renderProcStep();
        setTimeout(() => { s.phase = 'results'; render(); }, 400);
      },
    ];
  
    setTimeout(steps[0], 500);
    setTimeout(steps[1], 1200);
    setTimeout(steps[2], 2000);
    setTimeout(steps[3], 2800);
  }
  
  // ── Results ───────────────────────────────────────────────────────
  
  function analysePerformance(s) {
    const qs        = getFilteredQuestions(s);
    const total     = s.assessment.questionsAttempted;
    const correct   = s.assessment.correctAnswers;
    const accuracy  = correct / total;
  
    const correctByDiff = {};
    const wrongByDiff   = {};
    Object.entries(s.answers).forEach(([qi, ai]) => {
      const q = qs[parseInt(qi)];
      if (!q) return;
      if (ai === q.c) correctByDiff[q.d] = (correctByDiff[q.d] || 0) + 1;
      else            wrongByDiff[q.d]   = (wrongByDiff[q.d]   || 0) + 1;
    });
  
    const highestCorrect = Math.max(...Object.keys(correctByDiff).map(Number), 0);
    const lowestWrong    = Math.min(...Object.keys(wrongByDiff).map(Number),   6);
  
    let suggestedLevel, message;
  
    if (accuracy === 1 && s.assessment.timeSpentSeconds < 30) {
      suggestedLevel = Math.min(5, s.masked.levelBucket + 2);
      message = '⚡ Perfect score and fast! You are ready for a much harder challenge.';
    } else if (accuracy === 1) {
      suggestedLevel = Math.min(5, s.masked.levelBucket + 1);
      message = '✓ Perfect score! Try the next difficulty level up.';
    } else if (accuracy >= 0.8) {
      suggestedLevel = Math.min(5, s.masked.levelBucket + 1);
      message = '⬆ Strong performance — here is something slightly harder.';
    } else if (accuracy >= 0.6) {
      suggestedLevel = s.masked.levelBucket;
      message = '→ Good effort — practice more at your current level.';
    } else if (accuracy >= 0.4) {
      suggestedLevel = Math.max(1, s.masked.levelBucket - 1);
      message = '⬇ A few mistakes — try a slightly easier module to solidify your understanding.';
    } else {
      suggestedLevel = Math.max(1, s.masked.levelBucket - 2);
      message = '⬇ Low score — start with an easier module to build your foundation.';
    }
  
    if (highestCorrect >= 4 && lowestWrong <= 2) {
      message += ' (Note: you answered hard questions correctly but missed some easy ones — review the basics.)';
    }
  
    return { suggestedLevel, message, accuracy, highestCorrect, lowestWrong };
  }
  
  function renderResults(page) {
    const s   = state.student;
    const acc = ((s.assessment.correctAnswers / s.assessment.questionsAttempted) * 100).toFixed(0);
  
    page.appendChild(el('div', { class: 'sh' },
      el('div', { class: 'flex sb ac' },
        el('div', null,
          el('h1', null, 'RESULTS'),
          el('p',  null, `// ${s.topic.toUpperCase()} assessment complete — SHA-256 privacy preserved`)
        ),
        el('button', {
          class: 'btn btn-sm',
          onClick: () => {
            Object.assign(s, {
              phase: 'topic', topic: null, currentQ: 0, answers: {}, revealed: false,
              startTime: null, elapsed: 0, assessment: null, masked: null,
              serverResp: null, modules: [], savings: null,
              targetLevel: null, suggestedLevel: null, procStep: 0,
            });
            render();
          }
        }, '↺ RESET')
      )
    ));
  
    // Stats row
    const g3 = el('div', { class: 'g3 mb4' });
    [
      { v: `${s.assessment.correctAnswers}/${s.assessment.questionsAttempted}`, l: 'questions correct' },
      { v: acc + '%', l: 'accuracy (local only)' },
      { v: diffToLevel(s.masked.levelBucket), l: 'difficulty level' },
    ].forEach(stat => {
      g3.appendChild(el('div', { class: 'card sbox' },
        el('div', { class: 'sval' }, stat.v),
        el('div', { class: 'slbl' }, stat.l)
      ));
    });
    page.appendChild(g3);

    if (state.auth.loggedIn) {
      const scorePct    = (s.assessment.correctAnswers / s.assessment.questionsAttempted) * 100;
      const currentLevel = getStudentLevel(state.auth.username, s.topic);
      const prog        = computeProgression(scorePct, currentLevel);
      page.appendChild(renderProgressionBanner({ ...prog, previousLevel: currentLevel }));
    }
  
    const g2    = el('div', { class: 'g2 mb4' });
    const right = el('div', { class: 'flex fc gap2' });
  
    g2.appendChild(renderProtocolVisualizer(s.assessment, s.masked, s.serverResp));
    right.appendChild(renderBandwidthMeter(s.savings));
    right.appendChild(renderMatchedModules(s));
    g2.appendChild(right);
    page.appendChild(g2);
    page.appendChild(renderSha256Card(s.masked, s.serverResp));
  }
  
  function renderMatchedModules(s) {
    const mc   = el('div', { class: 'card' });
    const perf = analysePerformance(s);
  
    mc.appendChild(el('div', { class: 'card-title' }, '📚 MATCHED LEARNING MODULES'));
    mc.appendChild(el('div', {
      style: { fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--green)', marginBottom: '.5rem', lineHeight: '1.6' }
    }, perf.message));
    mc.appendChild(el('div', {
      style: { fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--text-dim)', marginBottom: '.75rem' }
    }, `Accuracy: ${(perf.accuracy * 100).toFixed(0)}% · Level: ${diffToLevel(perf.suggestedLevel)} · Highest correct: ${perf.highestCorrect ? diffToLevel(perf.highestCorrect) : '—'} · Lowest missed: ${perf.lowestWrong === 6 ? '—' : diffToLevel(perf.lowestWrong)}`));
  
    const sortedModules = [...s.modules].sort((a, b) =>
      Math.abs(a.difficulty - perf.suggestedLevel) - Math.abs(b.difficulty - perf.suggestedLevel)
    );
  
    sortedModules.forEach(mod => {
      const btn = el('button', {
        class: 'mcard',
        style: {
          width: '100%', textAlign: 'left', cursor: 'pointer', background: 'transparent',
          color: 'inherit', border: '1px solid var(--border)', borderRadius: '4px',
          padding: '1rem', marginBottom: '.5rem', display: 'block',
        }
      });
  
      btn.appendChild(el('div', { class: 'flex sb ac mb1' },
        el('span', { style: { fontFamily: 'var(--mono)', fontSize: '.8rem', color: 'var(--text-bright)' } }, mod.title),
        el('div', { class: 'flex gap1' },
        el('span', { class: 'badge bd' }, diffToLevel(mod.difficulty)),
          el('span', { class: 'badge bd' }, `${mod.sizeKB}KB`),
          el('span', { class: 'badge bg' }, '▶ START')
        )
      ));
      btn.appendChild(el('p', { style: { fontSize: '.8rem', color: 'var(--text-dim)', margin: '0' } }, mod.description));
  
      btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = 'var(--green)';
        btn.style.boxShadow   = '0 0 12px hsla(150,100%,45%,.2)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = 'var(--border)';
        btn.style.boxShadow   = 'none';
      });
      btn.addEventListener('click', () => {
        if (state.student.elapsedTimer) clearInterval(state.student.elapsedTimer);
        Object.assign(state.student, {
          phase: 'quiz', topic: mod.topic, targetLevel: mod.difficulty,
          suggestedLevel: perf.suggestedLevel,
          currentQ: 0, answers: {}, revealed: false,
          startTime: Date.now(), elapsed: 0,
          assessment: null, masked: null, serverResp: null,
          modules: [], savings: null, procStep: 0,
        });
        state.student.elapsedTimer = setInterval(() => {
          state.student.elapsed = Math.floor((Date.now() - state.student.startTime) / 1000);
          updateTimer();
        }, 1000);
        render();
      });
  
      mc.appendChild(btn);
    });
  
    return mc;
  }
  
  // ── Protocol visualizer ───────────────────────────────────────────
  
  function renderProtocolVisualizer(assessment, masked, serverResp) {
    const steps = [
      {
        icon: '📊', title: 'RAW ASSESSMENT', desc: 'Local computation only', rows: [
          { l: 'Topic',    v: assessment.topic, warn: false },
          { l: 'Score',    v: `${assessment.correctAnswers}/${assessment.questionsAttempted}`, warn: true },
          { l: 'Accuracy', v: `${((assessment.correctAnswers / assessment.questionsAttempted) * 100).toFixed(0)}%`, warn: true },
          { l: 'Time',     v: `${assessment.timeSpentSeconds}s`, warn: true },
        ]
      },
      {
        icon: '🪣', title: 'BUCKET MAPPING', desc: 'Lossy compression of raw data', rows: [
          { l: 'Topic Bucket', v: `${masked.topicBucket} (0-4)`, warn: false },
          { l: 'Level Bucket', v: `${masked.levelBucket} (1-5)`, warn: false },
          { l: 'Precision',    v: 'Raw score discarded',          warn: false },
        ]
      },
      {
        icon: '🔐', title: 'SHA-256 TOKEN', desc: 'hash chain (3 parts)', rows: [
          { l: 'Token',     v: masked.token,                warn: false },
          { l: 'Nonce',     v: masked.nonce,                warn: false },
          { l: 'Payload',   v: `~${masked._byteSize} bytes`, warn: false },
          { l: 'Algorithm', v: masked.algorithm,            warn: false },
        ]
      },
      {
        icon: '🖥️', title: 'SERVER RECEIVES', desc: 'Zero knowledge of student', rows: [
          { l: 'Token',     v: masked.token.substring(0, 12) + '...', warn: false },
          { l: 'Topic',     v: `Bucket #${masked.topicBucket}`,       warn: false },
          { l: 'Level',     v: `Bucket #${masked.levelBucket}`,       warn: false },
          { l: 'Identity',  v: '❌ NOT AVAILABLE', warn: false, unk: true },
          { l: 'Raw score', v: '❌ NOT AVAILABLE', warn: false, unk: true },
        ]
      },
    ];
  
    const card = el('div', { class: 'card' });
    card.appendChild(el('div', { class: 'card-title' }, '⬢ PROTOCOL VISUALIZER'));
    const wrap = el('div', { class: 'flex fc gap1' });
  
    steps.forEach((step, i) => {
      const row = el('div', { class: 'pstep on' });
      row.appendChild(el('div', { class: 'sico' }, step.icon));
  
      const content = el('div', { style: { flex: '1', minWidth: '0' } });
      content.appendChild(el('div', { class: 'flex sb ac mb1' },
        el('span', { style: { fontFamily: 'var(--display)', fontSize: '.7rem', color: 'var(--green)', letterSpacing: '.08em' } }, step.title),
        el('span', { class: 'badge bd' }, step.desc)
      ));
  
      const term = el('div', { class: 'term', style: { padding: '.5rem .8rem' } });
      step.rows.forEach(r => {
        term.appendChild(el('div', { style: { display: 'flex', gap: '.5rem', alignItems: 'center' } },
          el('span', { style: { color: 'var(--text-dim)', minWidth: '90px', fontSize: '.72rem' } }, r.l + ':'),
          el('span', {
            style: {
              color: r.unk ? 'var(--red)' : r.warn ? 'var(--yellow)' : 'var(--green)',
              fontSize: '.72rem', wordBreak: 'break-all', fontFamily: 'var(--mono)'
            }
          }, r.v)
        ));
      });
  
      content.appendChild(term);
      row.appendChild(content);
      wrap.appendChild(row);
      if (i < steps.length - 1)
        wrap.appendChild(el('div', { style: { textAlign: 'center', color: 'var(--green-dim)', fontSize: '1.2rem' } }, '▼'));
    });
  
    card.appendChild(wrap);
    return card;
  }
  
  // ── Bandwidth meter ───────────────────────────────────────────────

function renderBandwidthMeter(savings) {
  // Use server-verified values if available via state.student.serverResp
  const serverBw = state.student.serverResp?.bandwidth;

  const rb  = serverBw?.request_json_bytes  ?? savings.requestBytes;
  const trb = serverBw?.request_total_bytes ?? savings.totalRequestBytes ?? (rb + 180);
  const fb  = serverBw?.full_profile_bytes  ?? savings.fullProfileBytes;
  const pct = serverBw?.savings_percent     ?? savings.savingsPercent;

  const rbDisplay  = serverBw?.request_json_display   ?? savings.requestBytesDisplay;
  const trbDisplay = serverBw?.request_total_display  ?? (trb + ' B');
  const fbDisplay  = serverBw?.full_profile_display   ?? savings.fullProfileDisplay;
  const pctDisplay = (typeof pct === 'number' ? pct.toFixed(1) : pct) + '%';
  const sourceLabel = serverBw ? '(server-verified)' : '(client-measured)';

  const card = el('div', { class: 'card' });
  card.appendChild(el('div', { class: 'card-title' }, '📡 BANDWIDTH METER'));

  // Big savings number
  card.appendChild(el('div', {
    style: { textAlign: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }
  },
    el('div', {
      style: { fontFamily: 'var(--display)', fontSize: '3rem', color: 'var(--green)', textShadow: '0 0 20px var(--green)', lineHeight: '1' }
    }, pctDisplay),
    el('div', {
      style: { fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'var(--text-dim)', marginTop: '.3rem', textTransform: 'uppercase', letterSpacing: '.1em' }
    }, 'bandwidth reduction'),
    el('div', {
      style: { fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'var(--green-dim)', marginTop: '.2rem' }
    }, sourceLabel)
  ));

  // Bars
  const bars = [
    {
      l: 'JSON Payload (this request)',
      v: rbDisplay,
      pct: Math.max(1, Math.round((rb / fb) * 100)),
      col: 'var(--green)'
    },
    {
      l: 'Full HTTP Request (incl. headers)',
      v: trbDisplay,
      pct: Math.max(2, Math.round((trb / fb) * 100)),
      col: 'hsl(150,70%,35%)'
    },
    {
      l: 'Full Student Profile (naive)',
      v: fbDisplay,
      pct: 100,
      col: 'var(--red)'
    },
  ];

  const bwrap = el('div', { class: 'flex fc gap2' });
  bars.forEach(b => {
    bwrap.appendChild(el('div', null,
      el('div', {
        style: { fontFamily: 'var(--mono)', fontSize: '.75rem', color: 'var(--text-dim)', marginBottom: '.3rem', display: 'flex', justifyContent: 'space-between' }
      }, el('span', null, b.l), el('span', { style: { color: b.col } }, b.v)),
      el('div', { class: 'pb' },
        el('div', { class: 'pf', style: { width: b.pct + '%', background: `linear-gradient(90deg,${b.col}88,${b.col})`, boxShadow: `0 0 8px ${b.col}` } })
      )
    ));
  });
  card.appendChild(bwrap);

  // Byte breakdown table
  const breakdown = el('div', {
    style: { marginTop: '1rem', padding: '.75rem', background: 'var(--bg)', borderRadius: '4px', border: '1px solid var(--border)' }
  });
  [
    { l: 'JSON body only',             v: rbDisplay,         col: 'var(--green)' },
    { l: 'Incl. HTTP headers (~180B)', v: trbDisplay,        col: 'hsl(150,70%,35%)' },
    { l: 'Full profile (not sent)',    v: fbDisplay,         col: 'var(--red)' },
    { l: 'Bytes saved',                v: (fb - rb) + ' B', col: 'var(--yellow)' },
  ].forEach(row => {
    breakdown.appendChild(el('div', {
      style: { fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--text-dim)', marginBottom: '.2rem', display: 'flex', justifyContent: 'space-between' }
    },
      el('span', null, row.l),
      el('span', { style: { color: row.col } }, row.v)
    ));
  });

  breakdown.appendChild(el('hr', {
    style: { border: 'none', borderTop: '1px solid var(--border)', margin: '.5rem 0' }
  }));

  ['Student PII: NOT transmitted', 'Raw assessment: NOT transmitted', 'Browsing history: NOT transmitted']
    .forEach(t => breakdown.appendChild(el('div', {
      style: { fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--text-dim)' }
    }, el('span', { style: { color: 'var(--green)' } }, '✓ '), t)));

  card.appendChild(breakdown);
  return card;
}
  
  // ── SHA-256 details ───────────────────────────────────────────────
  
  function renderSha256Card(masked, serverResp) {
    const card = el('div', { class: 'card mb4' });
    card.appendChild(el('div', { class: 'card-title' }, '🔐 SHA-256 CRYPTOGRAPHIC DETAILS'));
  
    const rows = [
      { l: 'Algorithm', v: 'SHA-256 (3-part hash chain)' },
      { l: 'Input',     v: (masked.sha256Parts?.inp  || '...') },
      { l: 'Part 1',    v: 'SHA-256(topic:level:nonce:ts)[0:8] = ' + (masked.sha256Parts?.part1 || '') },
      { l: 'Part 2',    v: 'SHA-256(inp+"salt")[0:8] = '          + (masked.sha256Parts?.part2 || '') },
      { l: 'Part 3',    v: 'SHA-256(nonce+ts)[0:8] = '            + (masked.sha256Parts?.part3 || '') },
      { l: 'Token',     v: masked.token },
      { l: 'Payload SHA-256', v: (masked.payloadHash || '').substring(0, 32) + '...' },
    ];
  
    if (serverResp?.verification) {
      rows.push({ l: 'Server Verified', v: serverResp.verification.valid ? '✓ Token structure valid' : '✗ Invalid' });
      rows.push({ l: 'Verify Algo',     v: serverResp.verification.algorithm });
    }
  
    const term = el('div', { class: 'term' });
    rows.forEach(r => {
      term.appendChild(el('div', { class: 'crypto-row' },
        el('span', { class: 'crypto-label' }, r.l + ':'),
        el('span', { class: 'crypto-value' }, r.v)
      ));
    });
    card.appendChild(term);
    return card;
  }
  
  // ── Utility: filtered question set ───────────────────────────────
  
  function getFilteredQuestions(s) {
    const allQs      = QUESTIONS[s.topic];
    const gradeConfig = getGradeConfig(state.auth.user?.grade || 6);
  
    // Use the student's tracked progression level if logged in
    const progressionLevel = state.auth.loggedIn
      ? getStudentLevel(state.auth.username, s.topic)
      : null;
  
    const targetD = s.targetLevel || progressionLevel || s.suggestedLevel || null;
  
    const filtered = targetD && allQs.filter(q => Math.abs(q.d - targetD) <= 1).length >= 3
      ? allQs.filter(q => Math.abs(q.d - targetD) <= 1)
      : allQs;
  
    return filtered.sort(() => Math.random() - 0.5).slice(0, 5);
  }