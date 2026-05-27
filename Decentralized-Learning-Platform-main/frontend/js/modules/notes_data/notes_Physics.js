// EduLift notes data — Physics
(function() {
  if (!window.NOTES_DATA) window.NOTES_DATA = {};
  window.NOTES_DATA['Physics'] = {
    secondary: {
      title: 'Secondary Physics',
      sections: [
        { heading: 'Forces & Motion', content: `Newton's Laws of Motion:\n1. An object stays at rest or in uniform motion unless acted upon by a force (Inertia).\n2. Force = Mass × Acceleration (F = ma)\n3. Every action has an equal and opposite reaction.\n\nSpeed = Distance / Time\nVelocity includes direction (vector). Acceleration = change in velocity / time.` },
        { heading: 'Energy', content: `Energy cannot be created or destroyed — it transforms (Law of Conservation of Energy).\n\nKinetic Energy (KE) = ½mv² — energy of motion\nPotential Energy (PE) = mgh — stored energy (height × gravity × mass)\nWork done = Force × Distance (Joules)\n\nPower = Energy / Time (Watts)` },
        { heading: 'Electricity', content: `Current (I): flow of charge — measured in Amperes (A)\nVoltage (V): potential difference — measured in Volts (V)\nResistance (R): opposition to current — measured in Ohms (Ω)\n\nOhm's Law: V = IR\nSeries circuits: same current throughout; total resistance = R₁ + R₂ + ...\nParallel circuits: same voltage throughout; 1/R_total = 1/R₁ + 1/R₂ + ...` },
        { heading: 'Waves', content: `Waves transfer energy without transferring matter.\n\nWave speed = frequency × wavelength (v = fλ)\nTransverse waves: particles vibrate perpendicular to wave direction (light, water)\nLongitudinal waves: particles vibrate parallel to wave direction (sound)\n\nReflection: angle of incidence = angle of reflection\nRefraction: bending of waves as they change speed (e.g. light entering glass)` },
      ],
      quiz: [
        { q: 'A 5 kg object accelerates at 3 m/s². What is the force?', opts: ['8 N', '2 N', '15 N', '1.67 N'], c: 2, exp: 'F = ma = 5 kg × 3 m/s² = 15 N. Newton\'s Second Law directly applied.' },
        { q: 'What is the kinetic energy of a 2 kg object moving at 4 m/s?', opts: ['8 J', '16 J', '32 J', '4 J'], c: 1, exp: 'KE = ½mv² = ½ × 2 × 4² = ½ × 2 × 16 = 16 J.' },
        { q: 'If V = 12 V and R = 4 Ω, what is the current?', opts: ['3 A', '48 A', '8 A', '0.33 A'], c: 0, exp: 'From Ohm\'s Law: I = V/R = 12/4 = 3 A.' },
        { q: 'Wave speed is 340 m/s and frequency is 170 Hz. Wavelength = ?', opts: ['0.5 m', '2 m', '510 m', '1 m'], c: 1, exp: 'λ = v/f = 340/170 = 2 m.' },
        { q: 'Which is a vector quantity?', opts: ['Mass', 'Temperature', 'Velocity', 'Speed'], c: 2, exp: 'Velocity is a vector — it has both magnitude AND direction. Speed only has magnitude.' },
      ],
      extraQuizzes: [[
        { q: 'What is the unit of power?', opts: ['Joule', 'Newton', 'Watt', 'Volt'], c: 2, exp: 'Power = Energy/Time, measured in Watts (W). 1 W = 1 J/s.' },
        { q: 'A car decelerates from 20 m/s to 0 in 5 s. Acceleration = ?', opts: ['4 m/s²', '−4 m/s²', '100 m/s²', '0.25 m/s²'], c: 1, exp: 'a = Δv/t = (0 − 20)/5 = −4 m/s². Negative because it\'s deceleration.' },
        { q: 'In a parallel circuit, what stays the same across components?', opts: ['Current', 'Resistance', 'Voltage', 'Power'], c: 2, exp: 'In a parallel circuit, all branches share the same voltage across them.' },
        { q: 'What type of wave is sound?', opts: ['Transverse', 'Longitudinal', 'Electromagnetic', 'Surface'], c: 1, exp: 'Sound is a longitudinal wave — particles vibrate parallel (back and forth) to the direction of wave travel.' },
        { q: 'Potential energy of a 3 kg object at 10 m height (g=10 m/s²)?', opts: ['30 J', '300 J', '150 J', '13 J'], c: 1, exp: 'PE = mgh = 3 × 10 × 10 = 300 J.' },
      ]]
    },
    higher_secondary: {
      title: 'Higher Secondary Physics',
      sections: [
        { heading: 'Laws of Thermodynamics', content: `Zeroth Law: If A is in equilibrium with B, and B with C, then A is in equilibrium with C.\n\nFirst Law: Energy is conserved. ΔU = Q − W (change in internal energy = heat added − work done by system).\n\nSecond Law: Entropy of an isolated system never decreases. Heat flows naturally from hot to cold.\n\nThird Law: Absolute zero (0 K) cannot be reached in a finite number of steps.` },
        { heading: 'Electromagnetic Induction', content: `Faraday's Law: EMF induced = −dΦ/dt (rate of change of magnetic flux).\n\nLenz's Law: Induced current opposes the change causing it.\n\nA transformer changes voltage: Vp/Vs = Np/Ns\nStep-up: more secondary turns → higher voltage\nStep-down: fewer secondary turns → lower voltage\n\nAC generators work by rotating a coil in a magnetic field.` },
        { heading: 'Quantum Physics', content: `Planck's quantum hypothesis: Energy is quantised. E = hf (h = Planck's constant = 6.63 × 10⁻³⁴ J·s)\n\nPhotoelectric effect (Einstein): Light consists of photons. A photon must have minimum frequency to eject an electron.\n\nde Broglie wavelength: λ = h/mv (particles have wave properties)\n\nHeisenberg Uncertainty: Δx·Δp ≥ ℏ/2 — you cannot know both position and momentum precisely.` },
        { heading: 'Nuclear Physics', content: `Atomic number Z = number of protons\nMass number A = protons + neutrons\n\nTypes of decay:\n• Alpha (α): emits ⁴₂He — low penetration\n• Beta (β): emits electron — medium penetration\n• Gamma (γ): high energy photons — high penetration\n\nHalf-life: Time for half the radioactive atoms to decay.\nMass-energy equivalence: E = mc²` },
      ],
      quiz: [
        { q: 'First Law of Thermodynamics is based on...', opts: ['Newton\'s laws', 'Conservation of energy', 'Conservation of momentum', 'Entropy'], c: 1, exp: 'The First Law states ΔU = Q − W, which is a statement of energy conservation applied to thermal systems.' },
        { q: 'EMF is induced when magnetic flux...', opts: ['Is constant', 'Changes with time', 'Is maximum', 'Is zero'], c: 1, exp: 'Faraday\'s Law: EMF = −dΦ/dt. EMF is induced only when flux is changing.' },
        { q: 'Energy of a photon with frequency 5×10¹⁴ Hz (h=6.6×10⁻³⁴ J·s)?', opts: ['3.3×10⁻¹⁹ J', '6.6×10⁻¹⁴ J', '5×10⁻¹⁴ J', '1.3×10⁻¹⁸ J'], c: 0, exp: 'E = hf = 6.6×10⁻³⁴ × 5×10¹⁴ = 33×10⁻²⁰ = 3.3×10⁻¹⁹ J.' },
        { q: 'Which radiation has the highest penetrating power?', opts: ['Alpha', 'Beta', 'Gamma', 'Neutron'], c: 2, exp: 'Gamma rays are high-energy photons with no charge, giving them the highest penetrating ability.' },
        { q: 'de Broglie wavelength is inversely proportional to...', opts: ['Mass only', 'Velocity only', 'Momentum', 'Energy'], c: 2, exp: 'λ = h/mv = h/p where p is momentum. So λ ∝ 1/p (inversely proportional to momentum).' },
      ],
      extraQuizzes: [[
        { q: 'What does the Second Law of Thermodynamics state?', opts: ['Energy is conserved', 'Entropy never decreases in isolated systems', 'Temperature equalises', 'Work equals heat'], c: 1, exp: 'The Second Law states entropy of an isolated system always increases or stays constant — never decreases.' },
        { q: 'A transformer has 100 primary turns and 500 secondary turns. If Vp = 20V, Vs = ?', opts: ['4 V', '100 V', '500 V', '2500 V'], c: 1, exp: 'Vs/Vp = Ns/Np → Vs = 20 × (500/100) = 20 × 5 = 100 V. Step-up transformer.' },
        { q: 'The photoelectric effect proved that light is...', opts: ['A wave only', 'Quantised into photons', 'Thermal energy', 'A magnetic wave'], c: 1, exp: 'Einstein explained the photoelectric effect by proposing light comes in discrete quanta (photons) with E = hf.' },
        { q: 'What is emitted during alpha decay?', opts: ['An electron', 'A helium nucleus', 'A photon', 'A neutron'], c: 1, exp: 'Alpha decay emits an alpha particle, which is a helium-4 nucleus (2 protons + 2 neutrons).' },
        { q: 'E = mc² relates mass to...', opts: ['Momentum', 'Velocity', 'Energy', 'Force'], c: 2, exp: 'Einstein\'s mass-energy equivalence: E = mc². A small mass converts to enormous energy (c = 3×10⁸ m/s).' },
      ]]
    }
  };
})();
