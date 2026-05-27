// EduLift notes data — EVS
(function() {
  if (!window.NOTES_DATA) window.NOTES_DATA = {};
  window.NOTES_DATA['EVS'] = {
    primary: { title: 'Environmental Studies', sections: [
      { heading: 'Living and Non-Living Things', content: `Living things:\n• Grow and develop\n• Reproduce\n• Respond to their environment\n• Need food, water, and air\n\nNon-living things do not do these. A stone is non-living; a plant is living.\n\nHabitats: the natural home of an animal or plant. Desert, forest, ocean, and grassland are different habitats.` },
      { heading: 'Our Environment', content: `The environment is everything around us — air, water, land, plants, and animals.\n\nPollution harms the environment:\n• Air pollution: from vehicles and factories\n• Water pollution: from waste and chemicals\n• Land pollution: from plastic and rubbish\n\nWe can help by: reducing waste, recycling, planting trees, saving water and electricity.` },
      { heading: 'Food and Nutrition', content: `We need food for energy and growth. Different foods give us different nutrients:\n• Carbohydrates (rice, bread): give energy\n• Proteins (eggs, pulses): for growth and repair\n• Vitamins & Minerals (fruits, vegetables): for health\n• Fats (oil, butter): energy storage\n• Water: essential for all body functions\n\nFood chains: Grass → Grasshopper → Frog → Snake → Eagle. Energy passes from plants to animals.` },
    ], quiz: [
      { q: 'Which of these is a living thing?', opts: ['Stone', 'Water', 'Plant', 'Chair'], c: 2, exp: 'Plants are living — they grow, reproduce, and respond to the environment. Stones, water, and chairs cannot do these things.' },
      { q: 'What type of pollution is caused by vehicles?', opts: ['Water pollution', 'Land pollution', 'Air pollution', 'Sound pollution'], c: 2, exp: 'Vehicles release exhaust gases (CO₂, CO, NOₓ) which cause air pollution and contribute to smog and climate change.' },
      { q: 'Which nutrient gives us energy quickly?', opts: ['Protein', 'Fat', 'Carbohydrates', 'Vitamins'], c: 2, exp: 'Carbohydrates are the body\'s primary and fastest source of energy. Glucose from carbohydrates fuels cells directly.' },
      { q: 'In the food chain Grass→Grasshopper→Frog, the Grasshopper is a...', opts: ['Producer', 'Primary consumer', 'Secondary consumer', 'Decomposer'], c: 1, exp: 'Grass (producer) → Grasshopper (primary/first consumer, eats plants) → Frog (secondary consumer).' },
      { q: 'What is a habitat?', opts: ['Any type of food', 'The natural home of a living organism', 'A type of weather', 'A non-living thing'], c: 1, exp: 'A habitat is the natural environment where an organism lives, providing food, shelter, water, and space.' },
    ], extraQuizzes: [[
      { q: 'Which helps reduce pollution?', opts: ['Using more plastic', 'Burning rubbish', 'Planting trees', 'Using more vehicles'], c: 2, exp: 'Trees absorb CO₂ and release O₂, reducing air pollution. Planting trees (reforestation) is one of the best environmental actions.' },
      { q: 'Proteins are important for...', opts: ['Giving quick energy', 'Growth and repair', 'Keeping warm', 'Providing fibre'], c: 1, exp: 'Proteins are the body\'s building blocks — essential for growth, repair, and making enzymes, hormones, and antibodies.' },
      { q: 'Which is NOT a way to save water?', opts: ['Fix leaking taps', 'Take shorter showers', 'Leave taps running', 'Collect rainwater'], c: 2, exp: 'Leaving taps running wastes water. All other options conserve water.' },
      { q: 'What do producers (plants) use to make food?', opts: ['Eating animals', 'Sunlight, water, and CO₂', 'Decomposing matter', 'Soil only'], c: 1, exp: 'Plants are producers — they make their own food through photosynthesis using sunlight, water, and carbon dioxide.' },
      { q: 'Non-living things do NOT...', opts: ['Take up space', 'Reproduce', 'Have weight', 'Exist in nature'], c: 1, exp: 'Only living things reproduce (make more of themselves). Non-living things take up space and have weight but cannot reproduce.' },
    ]]}
  };
})();
