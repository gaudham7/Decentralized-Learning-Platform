// EduLift notes data — History
(function() {
  if (!window.NOTES_DATA) window.NOTES_DATA = {};
  window.NOTES_DATA['History'] = {
    secondary: { title: 'Secondary History', sections: [
      { heading: 'Ancient Civilisations', content: `Ancient Egypt: built along the River Nile. Pharaohs ruled; pyramids built as royal tombs. Hieroglyphics used for writing. Mummification preserved the dead.\n\nAncient Greece: birthplace of democracy, philosophy, Olympics. City-states (Athens, Sparta). Philosophers: Socrates, Plato, Aristotle.\n\nRoman Empire: spread across Europe, North Africa, Middle East. Roman law, roads, aqueducts, Latin language influenced modern civilisation. Fall in 476 AD.` },
      { heading: 'Medieval Period', content: `Feudal system: King → Nobles → Knights → Peasants/Serfs.\nThe Church was very powerful — the Pope held authority over kings.\n\nMagna Carta (1215): limited the power of King John in England — first step toward constitutional government.\n\nThe Crusades (1096–1291): series of religious wars to control the Holy Land.\n\nBlack Death (1347): bubonic plague killed 30–50% of Europe's population — transformed society.` },
      { heading: 'Age of Exploration & Modern World', content: `Age of Exploration (1400s–1600s): Europeans mapped the globe. Columbus (1492), Vasco da Gama, Magellan.\n\nThe Renaissance: cultural revival of art, science, and learning in Europe (14th–17th century).\n\nWorld War I (1914–1918): triggered by assassination of Archduke Franz Ferdinand. Alliance systems, trench warfare, 20 million dead.\n\nWorld War II (1939–1945): Hitler's Nazi Germany, Holocaust, atomic bombs on Japan. 70 million dead. Led to the United Nations and Cold War.` },
    ], quiz: [
      { q: 'Who built the pyramids at Giza?', opts: ['Romans', 'Greeks', 'Egyptians', 'Mesopotamians'], c: 2, exp: 'The ancient Egyptians built the pyramids as royal tombs for their pharaohs. The Great Pyramid of Giza was built for Pharaoh Khufu.' },
      { q: 'The Magna Carta was signed in...', opts: ['1066', '1215', '1492', '1776'], c: 1, exp: 'King John signed the Magna Carta in 1215 at Runnymede, limiting royal power and establishing rule of law.' },
      { q: 'What started World War I?', opts: ['Invasion of Poland', 'Assassination of Archduke Franz Ferdinand', 'The Russian Revolution', 'The Wall Street Crash'], c: 1, exp: 'The immediate trigger was the assassination of Austro-Hungarian Archduke Franz Ferdinand in Sarajevo in June 1914, sparking alliance system activation.' },
      { q: 'The Black Death was caused by...', opts: ['Influenza', 'Cholera', 'Bubonic plague', 'Smallpox'], c: 2, exp: 'The Black Death was caused by Yersinia pestis bacteria, spread by fleas on rats. It killed 30–50% of Europe\'s population in the 14th century.' },
      { q: 'Which philosopher taught in Athens?', opts: ['Caesar', 'Plato', 'Charlemagne', 'Napoleon'], c: 1, exp: 'Plato was an ancient Greek philosopher who studied under Socrates and taught in Athens, founding the Academy.' },
    ], extraQuizzes: [[
      { q: 'What is the feudal system?', opts: ['A banking system', 'A political hierarchy: King→Nobles→Knights→Peasants', 'A trading network', 'A religious system'], c: 1, exp: 'The feudal system was a medieval social hierarchy where land was exchanged for military service and loyalty.' },
      { q: 'The Renaissance began in which country?', opts: ['France', 'England', 'Germany', 'Italy'], c: 3, exp: 'The Renaissance began in Italy (Florence, Venice, Rome) in the 14th century, spreading cultural and intellectual revival across Europe.' },
      { q: 'Who sailed to America in 1492?', opts: ['Vasco da Gama', 'Magellan', 'Christopher Columbus', 'John Cabot'], c: 2, exp: 'Christopher Columbus, sailing for Spain, reached the Caribbean islands in 1492, beginning sustained European contact with the Americas.' },
      { q: 'The United Nations was founded after...', opts: ['World War I', 'World War II', 'The Cold War', 'The French Revolution'], c: 1, exp: 'The UN was established in 1945 after WWII to prevent future conflicts, promote peace, and facilitate international cooperation.' },
      { q: 'Trench warfare was a feature of...', opts: ['World War II', 'The Crusades', 'World War I', 'The Napoleonic Wars'], c: 2, exp: 'WWI (1914–18) on the Western Front was characterised by trench warfare — a static, bloody stalemate between opposing sides.' },
    ]]}
  };
})();
