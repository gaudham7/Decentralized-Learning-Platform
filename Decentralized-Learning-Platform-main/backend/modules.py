MODULES = [
    {"id":"m01","title":"Counting & Basic Arithmetic","topic":"mathematics","difficulty":1,"sizeKB":12,"description":"Foundation: numbers, addition, subtraction for beginners."},
    {"id":"m02","title":"Fractions & Decimals","topic":"mathematics","difficulty":2,"sizeKB":18,"description":"Understanding parts of a whole, decimal notation."},
    {"id":"m03","title":"Algebra Fundamentals","topic":"mathematics","difficulty":3,"sizeKB":24,"description":"Variables, equations, and solving for unknowns."},
    {"id":"m04","title":"Calculus: Limits & Derivatives","topic":"mathematics","difficulty":4,"sizeKB":32,"description":"Rates of change, differentiation techniques."},
    {"id":"m05","title":"Abstract Algebra & Topology","topic":"mathematics","difficulty":5,"sizeKB":48,"description":"Group theory, rings, fields, and topological spaces."},
    {"id":"s01","title":"Plants & Animals: Life Around Us","topic":"science","difficulty":1,"sizeKB":14,"description":"Introduction to living things and ecosystems."},
    {"id":"s02","title":"Chemistry Basics: Atoms & Molecules","topic":"science","difficulty":2,"sizeKB":20,"description":"Atomic structure, periodic table, basic reactions."},
    {"id":"s03","title":"Newtonian Mechanics","topic":"science","difficulty":3,"sizeKB":28,"description":"Forces, motion, energy, and the laws of physics."},
    {"id":"s04","title":"Quantum Mechanics Introduction","topic":"science","difficulty":4,"sizeKB":36,"description":"Wave-particle duality, uncertainty principle, orbitals."},
    {"id":"s05","title":"Molecular Biology & Genomics","topic":"science","difficulty":5,"sizeKB":50,"description":"DNA replication, gene expression, CRISPR advances."},
    {"id":"l01","title":"Alphabet & Phonics","topic":"language","difficulty":1,"sizeKB":10,"description":"Letters, sounds, and building first words."},
    {"id":"l02","title":"Grammar Essentials","topic":"language","difficulty":2,"sizeKB":16,"description":"Nouns, verbs, adjectives, sentence structure."},
    {"id":"l03","title":"Advanced Composition","topic":"language","difficulty":3,"sizeKB":22,"description":"Essay writing, argumentation, style."},
    {"id":"l04","title":"Linguistics & Phonology","topic":"language","difficulty":4,"sizeKB":30,"description":"Language structure, morphology, semantic theory."},
    {"id":"l05","title":"Semiotics & Critical Theory","topic":"language","difficulty":5,"sizeKB":44,"description":"Signs, symbols, deconstruction, discourse analysis."},
    {"id":"h01","title":"My Community & Local History","topic":"history","difficulty":1,"sizeKB":11,"description":"Families, communities, and local heritage."},
    {"id":"h02","title":"Ancient Civilizations","topic":"history","difficulty":2,"sizeKB":19,"description":"Egypt, Greece, Rome: the birth of civilization."},
    {"id":"h03","title":"World Wars & Modern History","topic":"history","difficulty":3,"sizeKB":26,"description":"WWI, WWII, Cold War, decolonization."},
    {"id":"h04","title":"Historiography & Primary Sources","topic":"history","difficulty":4,"sizeKB":34,"description":"Analysing sources, historical methodology."},
    {"id":"h05","title":"Geopolitics & World Systems Theory","topic":"history","difficulty":5,"sizeKB":46,"description":"Global power structures, Wallerstein, dependency theory."},
    {"id":"c01","title":"What is a Computer?","topic":"computing","difficulty":1,"sizeKB":12,"description":"Hardware, software, basic operations."},
    {"id":"c02","title":"Programming Basics: Python","topic":"computing","difficulty":2,"sizeKB":20,"description":"Variables, loops, functions in Python."},
    {"id":"c03","title":"Data Structures & Algorithms","topic":"computing","difficulty":3,"sizeKB":30,"description":"Arrays, trees, sorting, Big-O notation."},
    {"id":"c04","title":"Operating Systems & Networks","topic":"computing","difficulty":4,"sizeKB":38,"description":"Process management, TCP/IP, distributed systems."},
    {"id":"c05","title":"Cryptography & Zero-Knowledge Proofs","topic":"computing","difficulty":5,"sizeKB":54,"description":"Public-key crypto, ZK-SNARKs, secure protocols."},
]

TOPIC_NAMES = ["mathematics", "science", "language", "history", "computing"]
TOTAL_KB    = sum(m["sizeKB"] for m in MODULES)

def get_modules(topic_bucket: int, level_bucket: int) -> list:
    if 0 <= topic_bucket < len(TOPIC_NAMES):
        topic = TOPIC_NAMES[topic_bucket]
        return [m for m in MODULES if m["topic"] == topic and abs(m["difficulty"] - level_bucket) <= 1]
    return []