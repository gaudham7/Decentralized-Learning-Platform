/**
 * levels.js — Student level tracking and progression engine
 *
 * Each subject has an independent level per student.
 * Levels: 1 = Foundational, 2 = Developing, 3 = Proficient
 *
 * Unlock rules:
 *   Score >= 80% → advance to next level (if not already max)
 *   Score >= 40% → stay at current level
 *   Score <  40% → drop to previous level (if not already min)
 */

const LEVELS = {
    1: { label: 'Beginner',     color: 'var(--yellow)',        icon: '🌱', desc: 'Core concepts and basics' },
    2: { label: 'Intermediate', color: 'hsl(200,100%,55%)',    icon: '📈', desc: 'Building understanding' },
    3: { label: 'Advanced',     color: 'var(--green)',         icon: '🏆', desc: 'Advanced mastery' },
  };
  
  const LEVEL_MIN = 1;
  const LEVEL_MAX = 3;
  const ADVANCE_THRESHOLD = 60;  // % score needed to advance
  const DROP_THRESHOLD    = 30;  // % score below which student drops down
  
  // ── Storage helpers ───────────────────────────────────────────────
  
  function getLevelKey(username, subject) {
    return `edulift_level_${username}_${subject.replace(/\s+/g, '_')}`;
  }
  
  function getStudentLevel(username, subject) {
    const stored = parseInt(localStorage.getItem(getLevelKey(username, subject)));
    return (stored >= LEVEL_MIN && stored <= LEVEL_MAX) ? stored : LEVEL_MIN;
  }
  
  function setStudentLevel(username, subject, level) {
    const clamped = Math.max(LEVEL_MIN, Math.min(LEVEL_MAX, level));
    localStorage.setItem(getLevelKey(username, subject), String(clamped));
    return clamped;
  }
  
  // ── Progression logic ─────────────────────────────────────────────
  
  /**
   * Given a score percent and current level, compute the new level.
   * Returns { newLevel, changed, direction: 'up'|'down'|'same' }
   */
  function computeProgression(scorePct, currentLevel) {
    let newLevel  = currentLevel;
    let direction = 'same';
  
    if (scorePct >= ADVANCE_THRESHOLD && currentLevel < LEVEL_MAX) {
      newLevel  = currentLevel + 1;
      direction = 'up';
    } else if (scorePct < DROP_THRESHOLD && currentLevel > LEVEL_MIN) {
      newLevel  = currentLevel - 1;
      direction = 'down';
    }
  
    return {
      newLevel,
      changed:   newLevel !== currentLevel,
      direction,
      scorePct,
      threshold: direction === 'up' ? ADVANCE_THRESHOLD : DROP_THRESHOLD,
    };
  }
  
  /**
   * Apply progression for a student after a quiz.
   * Saves new level to localStorage and returns progression result.
   */
  function applyProgression(username, subject, scorePct) {
    const current    = getStudentLevel(username, subject);
    const progression = computeProgression(scorePct, current);
    const saved      = setStudentLevel(username, subject, progression.newLevel);
    return { ...progression, previousLevel: current, newLevel: saved };
  }
  
  // ── Weak topic detection ──────────────────────────────────────────
  
  /**
   * Analyse quiz answers to find which topics/sections the student struggled with.
   * questions: array of { q, opts, c, level, topic } (topic is optional tag)
   * answers:   object { 0: answerIdx, 1: answerIdx, ... }
   * Returns array of { level, correct, total, pct, weak } sorted by pct asc
   */
  function analyseWeakAreas(questions, answers) {
    const byLevel = {};
  
    questions.forEach((q, i) => {
      const lvl     = q.level || 1;
      const correct = answers[i] === q.c;
      if (!byLevel[lvl]) byLevel[lvl] = { level: lvl, correct: 0, total: 0 };
      byLevel[lvl].total++;
      if (correct) byLevel[lvl].correct++;
    });
  
    return Object.values(byLevel).map(b => ({
      ...b,
      pct:  b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0,
      weak: b.total > 0 && (b.correct / b.total) < 0.5,
    })).sort((a, b) => a.pct - b.pct);
  }
  
  // ── Level badge renderer ──────────────────────────────────────────
  
  function renderLevelBadge(level) {
    const info = LEVELS[level] || LEVELS[1];
    return el('span', {
      class: 'badge',
      style: {
        color:           info.color,
        background:      `hsla(${levelHue(level)},80%,45%,.1)`,
        border:          `1px solid ${info.color}`,
        fontFamily:      'var(--mono)',
        fontSize:        '.72rem',
        padding:         '.2rem .6rem',
        borderRadius:    '3px',
        letterSpacing:   '.05em',
      }
    }, `${info.icon} L${level} — ${info.label}`);
  }
  
  function levelHue(level) {
    return level === 1 ? 50 : level === 2 ? 200 : 150;
  }
  
  // ── Progression banner renderer ───────────────────────────────────
  
  function renderProgressionBanner(progression) {
    const { direction, previousLevel, newLevel, scorePct } = progression;
    const prev = LEVELS[previousLevel];
    const next = LEVELS[newLevel];
  
    let bg, border, icon, message;
  
    if (direction === 'up') {
      bg      = 'hsla(150,100%,45%,.08)';
      border  = 'var(--green)';
      icon    = '🎉';
      message = `Level up! You've advanced from ${prev.label} to ${next.label}.`;
    } else if (direction === 'down') {
      bg      = 'hsla(50,100%,55%,.08)';
      border  = 'var(--yellow)';
      icon    = '📖';
      message = `Let's review. You've moved back to ${next.label} to strengthen your foundation.`;
    } else {
      bg      = 'hsla(150,100%,45%,.04)';
      border  = 'var(--border)';
      icon    = '→';
      message = scorePct >= ADVANCE_THRESHOLD
        ? `Great score! You're already at max level.`
        : `Keep practising at ${prev.label} level. Score ${ADVANCE_THRESHOLD}%+ to advance to ${LEVELS[Math.min(LEVEL_MAX, previousLevel + 1)].label}.`;
    }
  
    return el('div', {
      style: {
        background:   bg,
        border:       `1px solid ${border}`,
        borderRadius: '6px',
        padding:      '1rem 1.5rem',
        marginBottom: '1.5rem',
        display:      'flex',
        gap:          '1rem',
        alignItems:   'center',
      }
    },
      el('div', { style: { fontSize: '2rem', flexShrink: '0' } }, icon),
      el('div', null,
        el('div', {
          style: { fontFamily: 'var(--mono)', fontSize: '.78rem', color: 'var(--text-bright)', marginBottom: '.3rem' }
        }, message),
        el('div', { style: { display: 'flex', gap: '.5rem', alignItems: 'center' } },
          renderLevelBadge(previousLevel),
          direction !== 'same' ? el('span', { style: { color: 'var(--text-dim)', fontSize: '.8rem' } }, direction === 'up' ? '→' : '→') : null,
          direction !== 'same' ? renderLevelBadge(newLevel) : null,
        )
      )
    );
  }
  
  // ── Weak topic notes renderer ─────────────────────────────────────
  
  /**
   * Render a "study these topics" card based on weak areas.
   * notesData: the subject's notes data object with sections tagged by level
   * weakAreas: from analyseWeakAreas()
   * currentLevel: student's current level
   */
  function renderWeakTopicNotes(notesData, weakAreas, currentLevel) {
    const weakLevels = weakAreas.filter(a => a.weak).map(a => a.level);
    if (!weakLevels.length || !notesData?.sections) return null;
  
    // Find sections matching weak levels
    const weakSections = notesData.sections.filter(s =>
      weakLevels.includes(s.level || 1)
    );
    if (!weakSections.length) return null;
  
    const card = el('div', { class: 'card mb4', style: { border: '1px solid var(--yellow)' } });
    card.appendChild(el('div', {
      style: {
        fontFamily: 'var(--mono)', fontSize: '.85rem',
        color: 'var(--yellow)', marginBottom: '1rem',
        letterSpacing: '.08em', textTransform: 'uppercase'
      }
    }, '📖 REVIEW THESE SECTIONS — YOU STRUGGLED HERE'));
  
    weakSections.forEach(section => {
      const sCard = el('div', {
        style: {
          background: 'hsla(50,100%,55%,.04)',
          border: '1px solid hsla(50,100%,55%,.2)',
          borderRadius: '4px',
          padding: '1rem',
          marginBottom: '.75rem',
        }
      });
  
      sCard.appendChild(el('div', {
        style: { fontFamily: 'var(--display)', fontSize: '.8rem', color: 'var(--yellow)', marginBottom: '.5rem' }
      }, '◈ ' + section.heading));
  
      sCard.appendChild(el('div', {
        style: { fontFamily: 'var(--body)', fontSize: '.9rem', color: 'var(--text)', lineHeight: '1.8', whiteSpace: 'pre-line' }
      }, section.simplified || section.content));
  
      card.appendChild(sCard);
    });
  
    return card;
  }