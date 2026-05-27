// EduLift notes data — Geography
(function() {
  if (!window.NOTES_DATA) window.NOTES_DATA = {};
  window.NOTES_DATA['Geography'] = {
    secondary: { title: 'Secondary Geography', sections: [
      { heading: 'Plate Tectonics', content: `Earth's crust is divided into tectonic plates that move on the mantle.\n\nPlate boundaries:\n• Convergent: plates collide → mountains, volcanoes, earthquakes (e.g. Himalayas)\n• Divergent: plates pull apart → new crust, mid-ocean ridges (e.g. Mid-Atlantic Ridge)\n• Transform: plates slide past → earthquakes (e.g. San Andreas Fault)\n\nVolcanoes form at convergent and divergent boundaries and hotspots.` },
      { heading: 'Weather & Climate', content: `Weather: short-term atmospheric conditions (day to day)\nClimate: long-term average weather patterns (30+ years)\n\nClimate zones: tropical, subtropical, temperate, polar\n\nGreenhouse effect: CO₂, methane, and water vapour trap heat → global warming\nConsequences: rising sea levels, extreme weather, loss of biodiversity, glacier retreat` },
      { heading: 'Human Geography', content: `Population: how people are distributed across Earth. Population density = people per km²\n\nUrbanisation: movement of people from rural to urban areas. Over 50% of humans now live in cities.\n\nGlobalisation: increasing interconnection of economies, cultures, and populations. Benefits: trade, technology. Challenges: inequality, cultural homogenisation.\n\nDevelopment indicators: GDP per capita, HDI, literacy rate, infant mortality.` },
    ], quiz: [
      { q: 'Where do plates collide, forming mountains?', opts: ['Transform boundary', 'Divergent boundary', 'Convergent boundary', 'Hotspot'], c: 2, exp: 'Convergent boundaries are where tectonic plates collide. Continental-continental collision creates mountains (e.g. Himalayas = India + Eurasia).' },
      { q: 'Climate is defined as...', opts: ['Day-to-day weather', 'Long-term average weather over 30+ years', 'Rainfall per year', 'Temperature only'], c: 1, exp: 'Climate is the average pattern of weather over a long period (typically 30 years) for a specific region.' },
      { q: 'The greenhouse effect refers to...', opts: ['Plants growing in greenhouses', 'Gases trapping heat in the atmosphere', 'Ozone depletion', 'Ocean warming only'], c: 1, exp: 'Greenhouse gases (CO₂, CH₄, H₂O) absorb and re-emit infrared radiation, trapping heat in Earth\'s atmosphere.' },
      { q: 'Urbanisation means...', opts: ['Moving from city to countryside', 'Moving from countryside to cities', 'Building in rural areas', 'Decreasing city size'], c: 1, exp: 'Urbanisation is the process by which increasing proportions of a population live in urban (city) areas.' },
      { q: 'HDI measures...', opts: ['Only income', 'Only health', 'Income, education, and life expectancy combined', 'Population density'], c: 2, exp: 'HDI (Human Development Index) combines three dimensions: life expectancy (health), education, and GNI per capita (standard of living).' },
    ], extraQuizzes: [[
      { q: 'The Mid-Atlantic Ridge is a...', opts: ['Convergent boundary', 'Divergent boundary', 'Transform boundary', 'Hotspot'], c: 1, exp: 'The Mid-Atlantic Ridge is where the North/South American plates diverge from the Eurasian/African plates, creating new seafloor.' },
      { q: 'Which gas is the main driver of the enhanced greenhouse effect?', opts: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], c: 2, exp: 'CO₂ from burning fossil fuels is the primary driver of enhanced greenhouse effect and contemporary climate change.' },
      { q: 'San Andreas Fault is a...', opts: ['Convergent boundary', 'Divergent boundary', 'Transform boundary', 'Subduction zone'], c: 2, exp: 'The San Andreas Fault in California is a transform (conservative) boundary where the Pacific and North American plates slide horizontally past each other.' },
      { q: 'Population density equals...', opts: ['Total population', 'Population ÷ Area (km²)', 'Area ÷ Population', 'Birth rate − Death rate'], c: 1, exp: 'Population density = number of people per unit area. Formula: Population ÷ Area (in km²).' },
      { q: 'Which is NOT a consequence of global warming?', opts: ['Rising sea levels', 'More extreme weather', 'Glacier growth', 'Loss of biodiversity'], c: 2, exp: 'Glaciers are RETREATING (shrinking) due to global warming, not growing. All other options are consequences of climate change.' },
    ]]}
  };
})();
