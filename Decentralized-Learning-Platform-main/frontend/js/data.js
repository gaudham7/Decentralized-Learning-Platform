/**
 * data.js — Static module catalog & question bank
 * (Mirrors the server catalog; client caches this to avoid full downloads)
 */

const MODULES = [
    {id:'m01',title:'Counting & Basic Arithmetic',topic:'mathematics',difficulty:1,sizeKB:12,description:'Foundation: numbers, addition, subtraction for beginners.'},
    {id:'m02',title:'Fractions & Decimals',topic:'mathematics',difficulty:2,sizeKB:18,description:'Understanding parts of a whole, decimal notation.'},
    {id:'m03',title:'Algebra Fundamentals',topic:'mathematics',difficulty:3,sizeKB:24,description:'Variables, equations, and solving for unknowns.'},
    {id:'m04',title:'Calculus: Limits & Derivatives',topic:'mathematics',difficulty:4,sizeKB:32,description:'Rates of change, differentiation techniques.'},
    {id:'m05',title:'Abstract Algebra & Topology',topic:'mathematics',difficulty:5,sizeKB:48,description:'Group theory, rings, fields, and topological spaces.'},
    {id:'s01',title:'Plants & Animals: Life Around Us',topic:'science',difficulty:1,sizeKB:14,description:'Introduction to living things and ecosystems.'},
    {id:'s02',title:'Chemistry Basics: Atoms & Molecules',topic:'science',difficulty:2,sizeKB:20,description:'Atomic structure, periodic table, basic reactions.'},
    {id:'s03',title:'Newtonian Mechanics',topic:'science',difficulty:3,sizeKB:28,description:'Forces, motion, energy, and the laws of physics.'},
    {id:'s04',title:'Quantum Mechanics Introduction',topic:'science',difficulty:4,sizeKB:36,description:'Wave-particle duality, uncertainty principle, orbitals.'},
    {id:'s05',title:'Molecular Biology & Genomics',topic:'science',difficulty:5,sizeKB:50,description:'DNA replication, gene expression, CRISPR advances.'},
    {id:'l01',title:'Alphabet & Phonics',topic:'language',difficulty:1,sizeKB:10,description:'Letters, sounds, and building first words.'},
    {id:'l02',title:'Grammar Essentials',topic:'language',difficulty:2,sizeKB:16,description:'Nouns, verbs, adjectives, sentence structure.'},
    {id:'l03',title:'Advanced Composition',topic:'language',difficulty:3,sizeKB:22,description:'Essay writing, argumentation, style.'},
    {id:'l04',title:'Linguistics & Phonology',topic:'language',difficulty:4,sizeKB:30,description:'Language structure, morphology, semantic theory.'},
    {id:'l05',title:'Semiotics & Critical Theory',topic:'language',difficulty:5,sizeKB:44,description:'Signs, symbols, deconstruction, discourse analysis.'},
    {id:'h01',title:'My Community & Local History',topic:'history',difficulty:1,sizeKB:11,description:'Families, communities, and local heritage.'},
    {id:'h02',title:'Ancient Civilizations',topic:'history',difficulty:2,sizeKB:19,description:'Egypt, Greece, Rome: the birth of civilization.'},
    {id:'h03',title:'World Wars & Modern History',topic:'history',difficulty:3,sizeKB:26,description:'WWI, WWII, Cold War, decolonization.'},
    {id:'h04',title:'Historiography & Primary Sources',topic:'history',difficulty:4,sizeKB:34,description:'Analysing sources, historical methodology.'},
    {id:'h05',title:'Geopolitics & World Systems Theory',topic:'history',difficulty:5,sizeKB:46,description:'Global power structures, Wallerstein, dependency theory.'},
    {id:'c01',title:'What is a Computer?',topic:'computing',difficulty:1,sizeKB:12,description:'Hardware, software, basic operations.'},
    {id:'c02',title:'Programming Basics: Python',topic:'computing',difficulty:2,sizeKB:20,description:'Variables, loops, functions in Python.'},
    {id:'c03',title:'Data Structures & Algorithms',topic:'computing',difficulty:3,sizeKB:30,description:'Arrays, trees, sorting, Big-O notation.'},
    {id:'c04',title:'Operating Systems & Networks',topic:'computing',difficulty:4,sizeKB:38,description:'Process management, TCP/IP, distributed systems.'},
    {id:'c05',title:'Cryptography & Zero-Knowledge Proofs',topic:'computing',difficulty:5,sizeKB:54,description:'Public-key crypto, ZK-SNARKs, secure protocols.'},
  ];
  
  const TOTAL_KB = MODULES.reduce((s, m) => s + m.sizeKB, 0);
  
  const TOPIC_NAMES  = ['mathematics','science','language','history','computing'];
  const TOPIC_LABELS = ['Mathematics','Science','Language','History','Computing'];
  const TOPIC_ICONS  = ['∑','⚗','✍','📜','⬡'];
  
  function getModulesLocal(tb, lb) {
    const topic = TOPIC_NAMES[tb];
    if (!topic) return [];
    let results = MODULES.filter(m => m.topic === topic && Math.abs(m.difficulty - lb) <= 1);
    // sort by difficulty — easier first if low score, harder first if high score
    if (lb <= 2) results.sort((a, b) => a.difficulty - b.difficulty);
    else if (lb >= 4) results.sort((a, b) => b.difficulty - a.difficulty);
    return results;
  }
  
  const QUESTIONS = {
    mathematics: [
      // d:1 - Very Easy
      {q:'How many sides does a hexagon have?',opts:['5','7','6','8'],c:2,d:1},
      {q:'What is 12 × 12?',opts:['124','144','132','148'],c:1,d:1},
      {q:'What is half of 64?',opts:['28','36','32','30'],c:2,d:1},
      {q:'What is 15% of 100?',opts:['10','20','15','25'],c:2,d:1},
      {q:'What comes next: 2, 4, 8, 16, __?',opts:['24','32','28','20'],c:1,d:1},
      {q:'What is the perimeter of a square with side 5cm?',opts:['10cm','25cm','20cm','15cm'],c:2,d:1},
      // d:2 - Easy
      {q:'What is the value of π to two decimal places?',opts:['3.14','3.41','2.71','1.41'],c:0,d:2},
      {q:'What is the square root of 144?',opts:['11','14','12','13'],c:2,d:2},
      {q:'Simplify the fraction 18/24',opts:['3/4','2/3','4/5','5/6'],c:0,d:2},
      {q:'What is 2³?',opts:['6','9','8','12'],c:2,d:2},
      {q:'What is the area of a rectangle 6cm × 4cm?',opts:['20cm²','28cm²','24cm²','18cm²'],c:2,d:2},
      {q:'What is 0.75 as a fraction?',opts:['3/5','2/3','3/4','4/5'],c:2,d:2},
      // d:3 - Medium
      {q:'Solve for x: 2x + 6 = 18',opts:['x = 4','x = 6','x = 12','x = 3'],c:1,d:3},
      {q:'What is the value of 5! (5 factorial)?',opts:['25','60','120','100'],c:2,d:3},
      {q:'If f(x) = 3x² + 2x, what is f(2)?',opts:['14','16','18','20'],c:1,d:3},
      {q:'What is the sum of interior angles of a pentagon?',opts:['360°','540°','450°','720°'],c:1,d:3},
      {q:'Solve: 3x - 7 = 2x + 5',opts:['x = 10','x = 14','x = 12','x = 8'],c:2,d:3},
      {q:'What is the slope of the line y = 3x + 7?',opts:['7','3','1/3','−3'],c:1,d:3},
      // d:4 - Hard
      {q:'What is the derivative of f(x) = x³?',opts:['3x','3x²','x²','2x³'],c:1,d:4},
      {q:'What is the result of log₂(64)?',opts:['4','5','6','8'],c:2,d:4},
      {q:'Integrate f(x) = 2x with respect to x',opts:['2','x²+ C','2x² + C','x + C'],c:1,d:4},
      {q:'What is the determinant of matrix [[2,3],[1,4]]?',opts:['5','8','11','6'],c:0,d:4},
      {q:'Solve: x² - 5x + 6 = 0',opts:['x=2,x=3','x=1,x=6','x=−2,x=−3','x=2,x=−3'],c:0,d:4},
      {q:'What is the limit of (sin x)/x as x → 0?',opts:['0','∞','undefined','1'],c:3,d:4},
      // d:5 - Very Hard
      {q:'What does the Fundamental Theorem of Calculus state?',opts:['Differentiation and integration are inverse operations','Every polynomial has a root','A continuous function is differentiable','Integration only works on closed intervals'],c:0,d:5},
      {q:'In abstract algebra, a group requires which properties?',opts:['Closure, associativity, identity, inverse','Closure, commutativity, identity, inverse','Closure, associativity, commutativity, inverse','Closure, identity, distributivity, inverse'],c:0,d:5},
      {q:'What is the Euler characteristic of a sphere?',opts:['0','1','2','−1'],c:2,d:5},
      {q:'Which of these is a non-Euclidean geometry?',opts:['Cartesian geometry','Hyperbolic geometry','Coordinate geometry','Fractal geometry'],c:1,d:5},
      {q:'What does Gödel\'s incompleteness theorem state?',opts:['All mathematical systems are complete','Some truths cannot be proven within their own system','Every theorem has a proof','Mathematics is inconsistent'],c:1,d:5},
    ],

    science: [
      // d:1 - Very Easy
      {q:'At what °C does water boil at sea level?',opts:['90°C','95°C','100°C','105°C'],c:2,d:1},
      {q:'What planet is closest to the Sun?',opts:['Venus','Earth','Mars','Mercury'],c:3,d:1},
      {q:'How many legs does a spider have?',opts:['6','8','10','12'],c:1,d:1},
      {q:'What gas do plants absorb from the air?',opts:['Oxygen','Nitrogen','Carbon Dioxide','Hydrogen'],c:2,d:1},
      {q:'What is the centre of an atom called?',opts:['Electron','Neutron','Nucleus','Proton'],c:2,d:1},
      {q:'Which planet is known as the Red Planet?',opts:['Jupiter','Saturn','Venus','Mars'],c:3,d:1},
      // d:2 - Easy
      {q:'What is the chemical symbol for Gold?',opts:['Go','Gd','Au','Ag'],c:2,d:2},
      {q:'Which force keeps planets in orbit around the Sun?',opts:['Electromagnetism','Gravity','Nuclear force','Tension'],c:1,d:2},
      {q:'What is the powerhouse of the cell?',opts:['Nucleus','Ribosome','Mitochondria','Golgi apparatus'],c:2,d:2},
      {q:'What is the chemical formula for water?',opts:['HO','H²O','H₂O','HO₂'],c:2,d:2},
      {q:'What type of rock is formed from cooled lava?',opts:['Sedimentary','Metamorphic','Igneous','Limestone'],c:2,d:2},
      {q:'What is the speed of light in a vacuum?',opts:['300,000 km/s','150,000 km/s','450,000 km/s','200,000 km/s'],c:0,d:2},
      // d:3 - Medium
      {q:'What is Newton\'s Second Law of Motion?',opts:['Every action has an equal reaction','An object in motion stays in motion','Force equals mass times acceleration','Energy cannot be created or destroyed'],c:2,d:3},
      {q:'What is the atomic number of Carbon?',opts:['6','8','12','14'],c:0,d:3},
      {q:'What process do plants use to make food?',opts:['Respiration','Transpiration','Photosynthesis','Osmosis'],c:2,d:3},
      {q:'What type of bond involves sharing electrons?',opts:['Ionic bond','Covalent bond','Metallic bond','Hydrogen bond'],c:1,d:3},
      {q:'What is the unit of electric resistance?',opts:['Ampere','Volt','Watt','Ohm'],c:3,d:3},
      {q:'What is the half-life of a radioactive substance?',opts:['Time for all atoms to decay','Time for half the atoms to decay','Time for one atom to decay','Time to become stable'],c:1,d:3},
      // d:4 - Hard
      {q:'What does the Heisenberg Uncertainty Principle state?',opts:['Energy is quantised','You cannot know both position and momentum precisely','Light behaves as both wave and particle','Electrons orbit in fixed shells'],c:1,d:4},
      {q:'What is the Pauli Exclusion Principle?',opts:['No two electrons can occupy the same quantum state','Electrons repel each other','Protons and neutrons are identical','Atoms are mostly empty space'],c:0,d:4},
      {q:'What type of radiation has the highest penetrating power?',opts:['Alpha','Beta','Gamma','X-ray'],c:2,d:4},
      {q:'What is the process by which heavy nuclei split?',opts:['Fusion','Fission','Decay','Ionisation'],c:1,d:4},
      {q:'In thermodynamics, what does entropy measure?',opts:['Heat energy','Work done','Disorder in a system','Temperature change'],c:2,d:4},
      {q:'What is the Doppler effect?',opts:['Light bending around objects','Change in wave frequency due to relative motion','Interference of two waves','Diffraction of sound'],c:1,d:4},
      // d:5 - Very Hard
      {q:"Schrödinger's cat illustrates what concept?",opts:['Entanglement','Quantum superposition','Wave function collapse','Uncertainty principle'],c:1,d:5},
      {q:'What does CRISPR-Cas9 do?',opts:['Copies DNA','Edits specific DNA sequences','Destroys bacteria','Produces proteins'],c:1,d:5},
      {q:'What is the Standard Model in physics?',opts:['A model of the solar system','A theory of fundamental particles and forces','A climate prediction model','A model of atomic structure'],c:1,d:5},
      {q:'What is dark matter?',opts:['Black holes','Matter that absorbs all light','Undetected mass that affects gravity','Antimatter'],c:2,d:5},
      {q:'What is the EPR paradox related to?',opts:['Radioactive decay','Quantum entanglement and locality','The uncertainty principle','Wave-particle duality'],c:1,d:5},
    ],

    language: [
      // d:1 - Very Easy
      {q:'How many letters are in the English alphabet?',opts:['24','25','26','27'],c:2,d:1},
      {q:'What is a noun?',opts:['An action word','A describing word','A person, place, or thing','A connecting word'],c:2,d:1},
      {q:'Which of these is a vowel?',opts:['b','c','e','f'],c:2,d:1},
      {q:'What punctuation ends a question?',opts:['.','!','?',','],c:2,d:1},
      {q:'What is the plural of "child"?',opts:['childs','childes','children','childrens'],c:2,d:1},
      {q:'Which word is a verb: "The dog runs fast"?',opts:['dog','fast','the','runs'],c:3,d:1},
      // d:2 - Easy
      {q:'Identify the subject in: "The quick brown fox jumps."',opts:['quick','fox','jumps','brown'],c:1,d:2},
      {q:'What is an adjective?',opts:['A word that describes a noun','An action word','A connecting word','A naming word'],c:0,d:2},
      {q:'What does a conjunction do?',opts:['Describes a noun','Names a person','Joins words or clauses','Shows an action'],c:2,d:2},
      {q:'Which sentence is in passive voice?',opts:['She ate the cake','The cake was eaten by her','She is eating cake','She will eat cake'],c:1,d:2},
      {q:'What is an antonym of "brave"?',opts:['Bold','Fearless','Cowardly','Strong'],c:2,d:2},
      {q:'Which is a compound sentence?',opts:['She ran.','She ran and he walked.','Running fast.','Although she ran.'],c:1,d:2},
      // d:3 - Medium
      {q:'Which is an example of a metaphor?',opts:['She ran as fast as a cheetah','The world is a stage','The wind whispered softly','He was very tired'],c:1,d:3},
      {q:'Which verb tense: "She had been running for an hour."',opts:['Simple past','Past perfect','Past perfect continuous','Present perfect'],c:2,d:3},
      {q:'What is an oxymoron?',opts:['A word that sounds like what it means','A contradictory phrase','A word with two meanings','An exaggerated statement'],c:1,d:3},
      {q:'What is the difference between "affect" and "effect"?',opts:['They mean the same thing','Affect is usually a verb, effect is usually a noun','Effect is usually a verb, affect is usually a noun','Both are only nouns'],c:1,d:3},
      {q:'What is a subordinate clause?',opts:['A clause that can stand alone','A clause that depends on a main clause','A clause with no verb','A clause with two subjects'],c:1,d:3},
      {q:'What literary device is used in: "The stars danced in the sky"?',opts:['Simile','Alliteration','Personification','Hyperbole'],c:2,d:3},
      // d:4 - Hard
      {q:'What is a "morpheme"?',opts:['A type of sentence','The smallest unit of meaning in language','A figure of speech','A punctuation mark'],c:1,d:4},
      {q:'What is the term for a word that sounds like another but has different meaning?',opts:['Synonym','Homophone','Antonym','Morpheme'],c:1,d:4},
      {q:'What is "polysemy"?',opts:['Multiple words with the same meaning','One word having multiple meanings','Words that sound alike','Words borrowed from other languages'],c:1,d:4},
      {q:'What does "syntax" refer to in linguistics?',opts:['The meaning of words','The sound system of a language','The rules for arranging words into sentences','The study of word origins'],c:2,d:4},
      {q:'What is the subjunctive mood used for?',opts:['Stating facts','Expressing hypothetical or wished-for situations','Asking questions','Giving commands'],c:1,d:4},
      {q:'What is "code-switching"?',opts:['Translating between languages','Alternating between languages in conversation','Learning a new language','Using formal language'],c:1,d:4},
      // d:5 - Very Hard
      {q:'What is the Sapir-Whorf hypothesis?',opts:['Grammar is universal across languages','Language shapes the way we think and perceive reality','Children learn language through imitation only','All languages share the same phonemes'],c:1,d:5},
      {q:'What is a "phoneme"?',opts:['A unit of meaning','The smallest unit of sound that distinguishes meaning','A grammatical rule','A type of syllable'],c:1,d:5},
      {q:'What is "pragmatics" in linguistics?',opts:['The study of word sounds','The study of sentence structure','The study of language use in context','The study of word origins'],c:2,d:5},
      {q:'What does "deconstructionism" in literary theory argue?',opts:['Texts have single fixed meanings','Authors always intend clear meanings','Texts contain contradictions that undermine fixed meaning','Literature reflects social reality directly'],c:2,d:5},
      {q:'What is "free indirect discourse"?',opts:['Direct speech without quotation marks','A narrative technique blending character thought with narration','A type of poem','First-person narration only'],c:1,d:5},
    ],

    history: [
      // d:1 - Very Easy
      {q:'Which civilization built the pyramids at Giza?',opts:['Roman','Greek','Egyptian','Mesopotamian'],c:2,d:1},
      {q:'Who was the first President of the United States?',opts:['Abraham Lincoln','Thomas Jefferson','George Washington','John Adams'],c:2,d:1},
      {q:'What year did the First World War begin?',opts:['1912','1914','1916','1918'],c:1,d:1},
      {q:'Which country did Christopher Columbus sail for?',opts:['Portugal','England','France','Spain'],c:3,d:1},
      {q:'What was the name of the ship that sank in 1912?',opts:['Lusitania','Britannic','Titanic','Olympic'],c:2,d:1},
      {q:'Who invented the telephone?',opts:['Thomas Edison','Alexander Graham Bell','Nikola Tesla','Guglielmo Marconi'],c:1,d:1},
      // d:2 - Easy
      {q:'In what year did World War II end?',opts:['1943','1944','1945','1946'],c:2,d:2},
      {q:'The "Cold War" was primarily between which two superpowers?',opts:['USA and China','USA and USSR','UK and USSR','USA and Germany'],c:1,d:2},
      {q:'Which empire was ruled by Julius Caesar?',opts:['Greek Empire','Ottoman Empire','Roman Empire','Persian Empire'],c:2,d:2},
      {q:'What was the Berlin Wall?',opts:['A trade barrier','A wall dividing East and West Berlin','A Roman fortification','A medieval castle wall'],c:1,d:2},
      {q:'In which country did the French Revolution take place?',opts:['England','Germany','Italy','France'],c:3,d:2},
      {q:'Who was Nelson Mandela?',opts:['A South African president who fought apartheid','A civil rights leader in the USA','A Kenyan independence fighter','A Nigerian president'],c:0,d:2},
      // d:3 - Medium
      {q:'What was the Magna Carta (1215)?',opts:['A battle declaration','A charter limiting royal power in England','A trade agreement','A religious decree'],c:1,d:3},
      {q:'What caused the fall of the Western Roman Empire?',opts:['Only internal corruption','Only barbarian invasions','A combination of military, economic, and political factors','A single decisive battle'],c:2,d:3},
      {q:'What was the significance of the Battle of Hastings (1066)?',opts:['End of the Roman occupation','Norman conquest of England','Start of the Crusades','Viking invasion of England'],c:1,d:3},
      {q:'What was the main cause of World War I?',opts:['The assassination of Archduke Franz Ferdinand plus existing tensions','Only economic rivalry','Only colonial disputes','A planned German invasion'],c:0,d:3},
      {q:'What was the Renaissance?',opts:['A religious war','A cultural and intellectual revival in Europe','A period of political revolution','An economic depression'],c:1,d:3},
      {q:'What was the significance of the Silk Road?',opts:['A military route','A trade and cultural exchange network between East and West','A religious pilgrimage route','A route used only for silk trade'],c:1,d:3},
      // d:4 - Hard
      {q:'What was the primary ideology behind the French Revolution?',opts:['Monarchism','Nationalism only','Liberty, equality, and fraternity based on Enlightenment ideas','Religious reform'],c:2,d:4},
      {q:'What was the Bretton Woods system?',opts:['A military alliance','A post-WWII international monetary system pegged to gold','A trade agreement between European nations','A colonial administrative system'],c:1,d:4},
      {q:'What is the significance of the Treaty of Westphalia (1648)?',opts:['Ended the Napoleonic Wars','Established the concept of state sovereignty in international relations','Created the League of Nations','Ended the Crusades'],c:1,d:4},
      {q:'What was the Meiji Restoration in Japan?',opts:['A religious revival','A period of rapid modernisation and westernisation','A military coup','A return to feudal rule'],c:1,d:4},
      {q:'What was the primary cause of the partition of India in 1947?',opts:['Economic differences only','British divide-and-rule policies combined with Hindu-Muslim tensions','A UN decision','Military conflict between India and Pakistan'],c:1,d:4},
      {q:'What was the significance of the Congress of Vienna (1815)?',opts:['It ended WWI','It redrew the map of Europe after Napoleon and established a balance of power','It created the UN','It established democracy across Europe'],c:1,d:4},
      // d:5 - Very Hard
      {q:"Wallerstein's World-Systems Theory divides nations into:",opts:['Developed and developing','Core, Semi-periphery, and Periphery','First, Second, and Third World','Industrial and agricultural'],c:1,d:5},
      {q:'What is the main argument of Edward Said\'s "Orientalism"?',opts:['The East is culturally superior','Western scholarship constructed a distorted and dominating image of the East','Eastern and Western cultures are equal','Colonialism had no cultural impact'],c:1,d:5},
      {q:'What does historiography study?',opts:['Ancient history only','The methods and development of historical writing itself','Only primary sources','The history of wars'],c:1,d:5},
      {q:'What was the significance of the Bandung Conference (1955)?',opts:['It created NATO','It was the first major gathering of Afro-Asian nations asserting independence from Cold War blocs','It ended the Korean War','It established the Non-Aligned Movement\'s military wing'],c:1,d:5},
      {q:'What is the "Great Man Theory" of history and its main criticism?',opts:['History is shaped by geography; criticism is it ignores people','History is driven by great individuals; criticism is it ignores social and structural forces','History repeats itself; criticism is it is deterministic','History is economic; criticism is it ignores culture'],c:1,d:5},
    ],

    computing: [
      // d:1 - Very Easy
      {q:'What does CPU stand for?',opts:['Central Processing Unit','Central Program Utility','Computer Processing Unit','Core Processing Unit'],c:0,d:1},
      {q:'What does RAM stand for?',opts:['Read Access Memory','Random Access Memory','Rapid Application Memory','Read Application Mode'],c:1,d:1},
      {q:'What is a browser?',opts:['A type of operating system','Software used to access the internet','A programming language','A type of hardware'],c:1,d:1},
      {q:'What does "Wi-Fi" allow you to do?',opts:['Connect to the internet wirelessly','Store files','Print documents','Run programs faster'],c:0,d:1},
      {q:'What is a file extension?',opts:['The size of a file','Letters after the filename indicating file type','The location of a file','The date a file was created'],c:1,d:1},
      {q:'What does the "C" in CSS stand for?',opts:['Computer','Cascading','Creative','Central'],c:1,d:1},
      // d:2 - Easy
      {q:'What does "DNS" stand for?',opts:['Data Network System','Domain Name System','Dynamic Naming Service','Digital Node Server'],c:1,d:2},
      {q:'Which data structure uses LIFO (Last In First Out)?',opts:['Queue','Stack','Tree','Graph'],c:1,d:2},
      {q:'What is an IP address?',opts:['A type of software','A unique numerical label identifying a device on a network','A programming language','A hardware component'],c:1,d:2},
      {q:'What does HTML stand for?',opts:['Hyperlink Text Markup Language','HyperText Markup Language','High Transfer Markup Language','HyperText Management Language'],c:1,d:2},
      {q:'What is the purpose of a loop in programming?',opts:['To stop a program','To repeat a block of code','To define a variable','To import a library'],c:1,d:2},
      {q:'What does "open source" mean?',opts:['Software that is free to use only','Software whose source code is publicly available','Software made by volunteers only','Software with no bugs'],c:1,d:2},
      // d:3 - Medium
      {q:'What is the time complexity of binary search?',opts:['O(n)','O(n²)','O(log n)','O(n log n)'],c:2,d:3},
      {q:'What is a recursive function?',opts:['A function that runs once','A function that calls itself','A function with no return value','A function that loops forever'],c:1,d:3},
      {q:'What is the difference between a stack and a queue?',opts:['No difference','Stack is LIFO, queue is FIFO','Stack is FIFO, queue is LIFO','Both are FIFO'],c:1,d:3},
      {q:'What does SQL stand for?',opts:['Structured Query Language','Simple Query Logic','Standard Question Language','System Query Layer'],c:0,d:3},
      {q:'What is the purpose of version control like Git?',opts:['Speed up code execution','Track changes and manage code collaboration','Compile code faster','Deploy applications'],c:1,d:3},
      {q:'What is a hash function used for?',opts:['Encrypting files permanently','Mapping data to fixed-size values for fast lookup or integrity checks','Sorting arrays','Compressing files'],c:1,d:3},
      // d:4 - Hard
      {q:'What is the time complexity of quicksort in the average case?',opts:['O(n)','O(n log n)','O(n²)','O(log n)'],c:1,d:4},
      {q:'What is a deadlock in operating systems?',opts:['A slow process','A situation where two or more processes wait for each other indefinitely','A memory overflow','A CPU overload'],c:1,d:4},
      {q:'What is the difference between TCP and UDP?',opts:['TCP is faster, UDP is reliable','TCP is reliable and connection-oriented, UDP is faster but unreliable','They are the same','UDP is connection-oriented, TCP is not'],c:1,d:4},
      {q:'What is dynamic programming?',opts:['Programming in real time','An optimisation technique that solves problems by breaking them into overlapping subproblems','A type of object-oriented programming','Programming with dynamic typing'],c:1,d:4},
      {q:'What is a race condition?',opts:['When two programs compete in speed','When program behaviour depends on unpredictable timing of concurrent operations','When a loop runs too fast','When memory runs out'],c:1,d:4},
      {q:'What does the CAP theorem state?',opts:['A distributed system can guarantee all three: consistency, availability, partition tolerance','A distributed system can guarantee at most two of: consistency, availability, partition tolerance','All databases must be consistent','Network partitions never happen in practice'],c:1,d:4},
      // d:5 - Very Hard
      {q:'In a Zero-Knowledge Proof, the prover demonstrates:',opts:['Knowledge of a secret without revealing it','Their identity to the verifier','Contents of an encrypted message','The hash of a password'],c:0,d:5},
      {q:'What is the halting problem?',opts:['A problem about sorting algorithms','The undecidable problem of determining if a program will halt or run forever','A networking problem','A memory management problem'],c:1,d:5},
      {q:'What is the P vs NP problem?',opts:['Whether fast processors can solve all problems','Whether problems verifiable in polynomial time can also be solved in polynomial time','A comparison of programming languages','A database optimisation problem'],c:1,d:5},
      {q:'What is a Merkle tree used for in distributed systems?',opts:['Sorting large datasets','Efficient and secure verification of data integrity in distributed systems','Compressing files','Load balancing'],c:1,d:5},
      {q:'What is Byzantine fault tolerance?',opts:['Tolerance for slow network connections','The ability of a system to continue operating correctly even if some nodes act maliciously or arbitrarily','Tolerance for hardware failures only','A type of encryption'],c:1,d:5},
    ],
  };

  const GRADE_CONFIG = {
    1:  { label: 'Grade 1',  minLevel: 1, maxLevel: 1, startLevel: 1 },
    2:  { label: 'Grade 2',  minLevel: 1, maxLevel: 1, startLevel: 1 },
    3:  { label: 'Grade 3',  minLevel: 1, maxLevel: 2, startLevel: 1 },
    4:  { label: 'Grade 4',  minLevel: 1, maxLevel: 2, startLevel: 1 },
    5:  { label: 'Grade 5',  minLevel: 1, maxLevel: 2, startLevel: 2 },
    6:  { label: 'Grade 6',  minLevel: 2, maxLevel: 3, startLevel: 2 },
    7:  { label: 'Grade 7',  minLevel: 2, maxLevel: 3, startLevel: 2 },
    8:  { label: 'Grade 8',  minLevel: 2, maxLevel: 4, startLevel: 3 },
    9:  { label: 'Grade 9',  minLevel: 3, maxLevel: 4, startLevel: 3 },
    10: { label: 'Grade 10', minLevel: 3, maxLevel: 5, startLevel: 3 },
    11: { label: 'Grade 11', minLevel: 4, maxLevel: 5, startLevel: 4 },
    12: { label: 'Grade 12', minLevel: 4, maxLevel: 5, startLevel: 4 },
  };
  
  function getGradeConfig(grade) {
    return GRADE_CONFIG[grade] || GRADE_CONFIG[6];
  }

  function getQuestionsForStudent(topic, studentLevel, gradeConfig, count = 5) {
    const pool = QUESTIONS[topic];
    if (!pool) return [];
  
    // Map student level (1-3) to difficulty range (1-5)
    const diffMap = {
      1: [1, 2],       // Beginner    → easy questions
      2: [2, 3, 4],    // Intermediate → medium questions  
      3: [3, 4, 5],    // Advanced    → hard questions
    };
  
    // Also respect the grade's min/max level boundaries
    const allowedDiffs = diffMap[studentLevel] || diffMap[1];
    const gradeDiffs   = allowedDiffs.filter(d =>
      d >= gradeConfig.minLevel && d <= gradeConfig.maxLevel + 2
    );
  
    const filtered = pool.filter(q => gradeDiffs.includes(q.d));
  
    // Shuffle and return `count` questions
    return filtered
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }