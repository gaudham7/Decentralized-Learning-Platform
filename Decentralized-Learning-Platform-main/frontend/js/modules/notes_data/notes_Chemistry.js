// EduLift notes data — Chemistry
(function() {
  if (!window.NOTES_DATA) window.NOTES_DATA = {};
  window.NOTES_DATA['Chemistry'] = {
    secondary: {
      title: 'Secondary Chemistry',
      sections: [
        { heading: 'Atomic Structure', content: `An atom consists of:\n• Nucleus: protons (+) and neutrons (neutral)\n• Electrons (−) in shells/orbitals around the nucleus\n\nAtomic number = number of protons (defines the element)\nMass number = protons + neutrons\nIsotopes: same protons, different neutrons\n\nElectron shells: 2, 8, 8, 18... (max electrons per shell)` },
        { heading: 'Chemical Bonding', content: `Ionic bonding: Transfer of electrons between metals and non-metals. Forms ions (Na⁺Cl⁻). High melting points, conduct electricity when dissolved.\n\nCovalent bonding: Sharing of electrons between non-metals. Can be single (H−H), double (O=O), or triple (N≡N) bonds.\n\nMetallic bonding: Sea of delocalised electrons around positive ions — explains conductivity and malleability.` },
        { heading: 'Acids, Bases & Salts', content: `Acids: pH < 7, release H⁺ ions (HCl, H₂SO₄, HNO₃)\nBases: pH > 7, release OH⁻ ions\nNeutral: pH = 7 (pure water)\n\nNeutralisation: Acid + Base → Salt + Water\nExample: HCl + NaOH → NaCl + H₂O\n\nIndicators: Litmus turns red in acid, blue in alkali. Universal indicator shows pH.` },
        { heading: 'Chemical Reactions', content: `Types of reactions:\n• Synthesis: A + B → AB\n• Decomposition: AB → A + B\n• Displacement: A + BC → AC + B (more reactive displaces less reactive)\n• Redox: simultaneous oxidation and reduction\n\nBalancing equations: atoms must be conserved. Count each element on both sides.\nExample: H₂ + O₂ → H₂O becomes 2H₂ + O₂ → 2H₂O` },
      ],
      quiz: [
        { q: 'How many protons does Carbon (atomic number 6) have?', opts: ['3', '6', '12', '8'], c: 1, exp: 'The atomic number IS the number of protons. Carbon\'s atomic number is 6, so it has 6 protons.' },
        { q: 'What type of bond involves electron transfer?', opts: ['Covalent', 'Metallic', 'Ionic', 'Hydrogen'], c: 2, exp: 'Ionic bonds form when electrons are transferred from a metal to a non-metal, creating ions.' },
        { q: 'What is the pH of a neutral solution?', opts: ['0', '7', '14', '5'], c: 1, exp: 'Pure water and neutral solutions have pH = 7. Below 7 is acidic, above 7 is alkaline.' },
        { q: 'Balance: H₂ + O₂ → H₂O. Correct balanced form?', opts: ['H₂ + O₂ → H₂O', '2H₂ + O₂ → 2H₂O', 'H₂ + 2O₂ → H₂O', '2H + O → H₂O'], c: 1, exp: '2H₂ + O₂ → 2H₂O: Left: 4H, 2O. Right: 4H, 2O. Balanced!' },
        { q: 'HCl + NaOH → ? + H₂O', opts: ['NaCl', 'NaH', 'HO', 'ClOH'], c: 0, exp: 'Neutralisation: Acid (HCl) + Base (NaOH) → Salt (NaCl) + Water (H₂O). The salt is sodium chloride.' },
      ],
      extraQuizzes: [[
        { q: 'What are isotopes?', opts: ['Same protons, different electrons', 'Same protons, different neutrons', 'Different elements', 'Same mass, different charge'], c: 1, exp: 'Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons.' },
        { q: 'O₂ uses which type of bond?', opts: ['Ionic', 'Metallic', 'Covalent double bond', 'Covalent triple bond'], c: 2, exp: 'O₂ is two oxygen atoms sharing 4 electrons (2 pairs) — a covalent double bond (O=O).' },
        { q: 'Acid added to a base will...', opts: ['Always explode', 'Neutralise to form salt + water', 'Form only water', 'Form only a gas'], c: 1, exp: 'Neutralisation: acid + base → salt + water. This is a standard neutralisation reaction.' },
        { q: 'Iron + Copper Sulfate → Iron Sulfate + Copper. This is...', opts: ['Synthesis', 'Decomposition', 'Displacement', 'Combustion'], c: 2, exp: 'Iron displaces copper from copper sulfate because iron is more reactive than copper. This is a displacement reaction.' },
        { q: 'Max electrons in the second electron shell?', opts: ['2', '4', '8', '18'], c: 2, exp: 'The formula is 2n² for shell n. Second shell: 2×2² = 8 electrons maximum.' },
      ]]
    },
    higher_secondary: {
      title: 'Higher Secondary Chemistry',
      sections: [
        { heading: 'Chemical Equilibrium', content: `A reversible reaction reaches equilibrium when forward and reverse rates are equal.\n\nLe Chatelier's Principle: If a system at equilibrium is disturbed, it shifts to counteract the change.\n\nEquilibrium constant Kc = [products] / [reactants] at equilibrium\n\nHaber Process: N₂ + 3H₂ ⇌ 2NH₃ (ΔH = −92 kJ/mol)\nHigh pressure and moderate temperature (450°C) with iron catalyst optimise yield.` },
        { heading: 'Electrochemistry', content: `Oxidation: loss of electrons (OIL — Oxidation Is Loss)\nReduction: gain of electrons (RIG — Reduction Is Gain)\n\nElectrochemical cells convert chemical energy to electrical energy.\nStandard electrode potential E° — more positive = more readily reduced.\n\nElectrolysis: uses electricity to drive non-spontaneous reactions. Used in electroplating, extracting aluminium.` },
        { heading: 'Organic Chemistry', content: `Carbon forms the backbone of organic molecules due to its 4 bonds and ability to chain.\n\nHomologous series: alkanes (CₙH₂ₙ₊₂), alkenes (CₙH₂ₙ), alcohols (−OH), carboxylic acids (−COOH)\n\nIsomerism: same molecular formula, different structure (structural) or spatial arrangement (stereoisomerism).\n\nReaction types: substitution (alkanes), addition (alkenes), polymerisation, condensation.` },
        { heading: 'Chemical Kinetics', content: `Reaction rate: how fast reactants become products.\n\nFactors affecting rate: concentration, temperature, surface area, catalyst, pressure (gases).\n\nRate law: rate = k[A]ⁿ[B]ⁿ where k is rate constant and n is reaction order.\n\nActivation energy (Eₐ): minimum energy needed for reaction. Catalysts lower Eₐ.\n\nArrhenius equation: k = Ae^(−Eₐ/RT)` },
      ],
      quiz: [
        { q: 'Le Chatelier\'s principle states that a system at equilibrium...', opts: ['Always shifts right when disturbed', 'Shifts to counteract the disturbance', 'Reaches equilibrium instantly', 'Cannot be disturbed'], c: 1, exp: 'Le Chatelier\'s Principle: when a system at equilibrium is disturbed (by concentration, temp, or pressure change), it shifts to minimize that disturbance.' },
        { q: 'OIL RIG stands for...', opts: ['Oxidation Is Gain, Reduction Is Loss', 'Oxidation Is Loss, Reduction Is Gain', 'Oxidation Increases Less', 'Only In Laboratory'], c: 1, exp: 'OIL = Oxidation Is Loss (of electrons); RIG = Reduction Is Gain (of electrons). A key mnemonic for redox.' },
        { q: 'General formula for alkenes?', opts: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙHₙ'], c: 1, exp: 'Alkenes have at least one C=C double bond. General formula: CₙH₂ₙ. E.g. ethene C₂H₄.' },
        { q: 'A catalyst increases reaction rate by...', opts: ['Increasing temperature', 'Providing more reactants', 'Lowering activation energy', 'Increasing pressure'], c: 2, exp: 'A catalyst provides an alternative reaction pathway with lower activation energy, increasing the rate without being consumed.' },
        { q: 'In the Haber process, iron is used as a...', opts: ['Reactant', 'Product', 'Catalyst', 'Solvent'], c: 2, exp: 'Iron is the catalyst in the Haber process (N₂ + 3H₂ → 2NH₃). It speeds up the reaction without being consumed.' },
      ],
      extraQuizzes: [[
        { q: 'Kc > 1 means the equilibrium favours...', opts: ['Reactants', 'Products', 'Neither', 'Cannot determine'], c: 1, exp: 'Kc = [products]/[reactants]. Kc > 1 means more products than reactants at equilibrium — equilibrium lies to the right.' },
        { q: 'Electrolysis uses which type of energy to drive reactions?', opts: ['Heat', 'Light', 'Electrical', 'Sound'], c: 2, exp: 'Electrolysis uses electrical energy to drive non-spontaneous (thermodynamically unfavourable) chemical reactions.' },
        { q: 'Which functional group do alcohols contain?', opts: ['−COOH', '−CHO', '−OH', '−NH₂'], c: 2, exp: 'Alcohols contain the hydroxyl functional group −OH. E.g. ethanol C₂H₅OH.' },
        { q: 'Rate = k[A]²[B]. If [A] doubles, rate changes by factor...', opts: ['2', '4', '8', '1'], c: 1, exp: 'The rate is second order in A. Doubling [A] multiplies rate by 2² = 4.' },
        { q: 'Alkanes undergo which type of reactions?', opts: ['Addition', 'Substitution', 'Elimination', 'Polymerisation'], c: 1, exp: 'Alkanes are saturated (no double bonds) and undergo free radical substitution reactions (e.g. halogenation).' },
      ]]
    }
  };
})();
