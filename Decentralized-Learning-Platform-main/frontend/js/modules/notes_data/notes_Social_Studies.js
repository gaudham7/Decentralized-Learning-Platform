// EduLift notes data — Social Studies
(function() {
  if (!window.NOTES_DATA) window.NOTES_DATA = {};
  window.NOTES_DATA['Social Studies'] = {
    primary: { title: 'Social Studies', sections: [
      { heading: 'Family and Community', content: `A family is a group of people related to each other. Types of families:\n• Nuclear family: parents and children\n• Joint/extended family: grandparents, uncles, aunts, cousins\n\nThe community is the neighbourhood or town we live in. Community helpers include doctors, police officers, teachers, and firefighters. Each person has a role that helps others.` },
      { heading: 'Maps and Directions', content: `A map is a flat drawing of a place from above. Key parts:\n• Title: what the map shows\n• Key/Legend: explains symbols\n• Compass rose: shows North, South, East, West (Never Eat Shredded Wheat)\n• Scale: compares map distance to real distance\n\nContinents: Asia, Africa, North America, South America, Europe, Australia, Antarctica (7 total)\nOceans: Pacific, Atlantic, Indian, Southern, Arctic (5 total)` },
      { heading: 'History Basics', content: `History is the study of the past. We learn about the past through:\n• Primary sources: diaries, photographs, newspapers from the time\n• Secondary sources: books and articles written about the past\n\nTimeline: a line showing events in order from past to present.\nAncient, Medieval, Modern — these are broad time periods used in history.` },
    ], quiz: [
      { q: 'What is an extended family?', opts: ['Only parents and children', 'Grandparents, parents, children, and relatives', 'Friends who live together', 'Only grandparents'], c: 1, exp: 'An extended/joint family includes grandparents, parents, children, and often aunts, uncles, and cousins living together.' },
      { q: 'How many continents are there?', opts: ['5', '6', '7', '8'], c: 2, exp: 'There are 7 continents: Asia, Africa, North America, South America, Europe, Australia (Oceania), and Antarctica.' },
      { q: 'A compass rose on a map shows...', opts: ['The map scale', 'Directions (N, S, E, W)', 'The map legend', 'The title'], c: 1, exp: 'A compass rose shows the cardinal directions: North, South, East, West — helping map readers orient themselves.' },
      { q: 'A diary written during an event is a...', opts: ['Secondary source', 'Primary source', 'Map', 'Timeline'], c: 1, exp: 'Primary sources are original materials from the time period being studied — diaries, letters, photographs, artefacts.' },
      { q: 'Who is a community helper?', opts: ['A mountain', 'A doctor', 'A river', 'A tree'], c: 1, exp: 'Community helpers are people who serve the public: doctors, teachers, police, firefighters, postal workers, etc.' },
    ], extraQuizzes: [[
      { q: 'How many oceans are there?', opts: ['3', '4', '5', '6'], c: 2, exp: 'There are 5 oceans: Pacific (largest), Atlantic, Indian, Southern (Antarctic), and Arctic (smallest).' },
      { q: 'What does a map legend/key tell us?', opts: ['Where north is', 'What map symbols mean', 'The date of the map', 'The map title'], c: 1, exp: 'The legend (key) explains what each symbol, colour, or pattern on the map represents.' },
      { q: 'Which is the largest continent?', opts: ['Africa', 'North America', 'Asia', 'Europe'], c: 2, exp: 'Asia is the largest continent by both area (44 million km²) and population (4.7 billion people).' },
      { q: 'A book written ABOUT the French Revolution is a...', opts: ['Primary source', 'Secondary source', 'Map source', 'Oral source'], c: 1, exp: 'Secondary sources are created after an event, analysing or interpreting primary sources (like a history textbook).' },
      { q: 'Ancient, Medieval, and Modern are...', opts: ['Types of maps', 'Broad historical time periods', 'Types of families', 'Types of communities'], c: 1, exp: 'Historians divide the past into broad periods: Ancient (before ~500 AD), Medieval (500–1500), Modern (1500–present).' },
    ]]}
  };
})();
