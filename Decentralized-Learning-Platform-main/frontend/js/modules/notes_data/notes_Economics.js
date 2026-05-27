// EduLift notes data — Economics
(function() {
  if (!window.NOTES_DATA) window.NOTES_DATA = {};
  window.NOTES_DATA['Economics'] = {
    higher_secondary: { title: 'Higher Secondary Economics', sections: [
      { heading: 'Microeconomics', content: `Demand: consumers buy more at lower prices (law of demand). Demand curve slopes downward.\nSupply: producers supply more at higher prices (law of supply). Supply curve slopes upward.\nEquilibrium: where demand = supply — price and quantity settled by market.\n\nElasticity: how responsive quantity is to price change.\nPED = % change in quantity demanded / % change in price\n|PED| > 1 = elastic (luxury goods), |PED| < 1 = inelastic (necessities)\n\nMarket structures: perfect competition, monopoly, oligopoly, monopolistic competition.` },
      { heading: 'Macroeconomics', content: `GDP (Gross Domestic Product): total monetary value of goods and services in a country in a year.\nGDP growth → economic growth.\n\nInflation: sustained rise in price level. Measured by CPI.\nCauses: demand-pull (too much money chasing goods), cost-push (rising production costs).\n\nUnemployment types: frictional, structural, cyclical, seasonal.\nPhillips Curve: inverse relationship between inflation and unemployment (short run).\n\nFiscal policy: government spending and taxation\nMonetary policy: central bank controls money supply and interest rates` },
      { heading: 'International Trade & Development', content: `Comparative advantage: a country should specialise in goods it produces at lower opportunity cost.\nFree trade increases efficiency but may harm some industries.\n\nBalance of Payments: records all transactions between a country and the world.\nCurrent account: trade in goods and services, income, transfers.\nCapital account: investment flows.\n\nDevelopment: measured by HDI, GDP per capita, Gini coefficient (inequality).\nDependency theory: developing nations remain poor due to exploitation by developed nations.` },
      { heading: 'Market Failure & Government Intervention', content: `Market failure: when free market fails to allocate resources efficiently.\n\nTypes:\n• Externalities: costs/benefits to third parties (negative: pollution; positive: education)\n• Public goods: non-excludable, non-rival (e.g. street lights)\n• Information asymmetry: one party has more info (e.g. used car market)\n• Monopoly power: restricts output, raises prices\n\nGovernment responses: taxation (Pigouvian tax), subsidies, regulation, price controls.` },
    ], quiz: [
      { q: 'The law of demand states that...', opts: ['Higher price → more demand', 'Lower price → more demand', 'Price and demand are unrelated', 'Demand is always constant'], c: 1, exp: 'The law of demand: ceteris paribus (all else equal), as price rises, quantity demanded falls. An inverse relationship.' },
      { q: 'GDP measures...', opts: ['Population size', 'Total monetary value of goods and services produced in a country in a year', 'Government spending only', 'National debt'], c: 1, exp: 'GDP (Gross Domestic Product) is the total monetary value of all final goods and services produced within a country in a year.' },
      { q: 'Comparative advantage means a country should...', opts: ['Produce everything itself', 'Specialise in goods with lowest opportunity cost', 'Import all goods', 'Tax all imports'], c: 1, exp: 'Comparative advantage: a country should specialise in goods where its opportunity cost is lowest relative to other countries, then trade.' },
      { q: 'A negative externality is...', opts: ['A benefit to third parties', 'A cost imposed on third parties', 'Government revenue', 'Private profit'], c: 1, exp: 'Negative externalities are costs imposed on third parties not involved in the transaction (e.g. pollution from a factory affecting nearby residents).' },
      { q: 'PED = −2 means demand is...', opts: ['Inelastic', 'Elastic', 'Unit elastic', 'Perfectly inelastic'], c: 1, exp: '|PED| = 2 > 1, so demand is elastic. A 1% price increase causes a 2% fall in quantity demanded. Consumers are price-sensitive.' },
    ], extraQuizzes: [[
      { q: 'When supply and demand are equal, the market is at...', opts: ['Maximum profit', 'Equilibrium', 'Surplus', 'Shortage'], c: 1, exp: 'Equilibrium is the price and quantity at which supply equals demand — the market clears with no surplus or shortage.' },
      { q: 'Cost-push inflation is caused by...', opts: ['Excess consumer spending', 'Rising production costs', 'Tax cuts', 'High interest rates'], c: 1, exp: 'Cost-push inflation occurs when rising production costs (wages, raw materials, energy) push up prices from the supply side.' },
      { q: 'A public good is...', opts: ['Any government good', 'Non-excludable and non-rival', 'Very expensive', 'Only for public sector'], c: 1, exp: 'Public goods are non-excludable (cannot prevent people from using) and non-rival (one person\'s use doesn\'t reduce availability to others). E.g. national defence, street lights.' },
      { q: 'Fiscal policy is controlled by...', opts: ['The central bank', 'The government (spending and taxation)', 'International trade organisations', 'Private corporations'], c: 1, exp: 'Fiscal policy involves government decisions on spending and taxation to influence economic activity (expansionary or contractionary).' },
      { q: 'The Gini coefficient measures...', opts: ['GDP growth rate', 'Inflation rate', 'Income inequality', 'Unemployment rate'], c: 2, exp: 'The Gini coefficient measures income inequality. 0 = perfect equality (everyone has same income); 1 = perfect inequality (one person has all income).' },
    ]]}
  },
};

// ── Subject → topic bucket mapping ───────────────────────────────
// Must align with TOPIC_NAMES in data.js:
// ['mathematics','science','language','history','computing']
//       0            1         2          3          4;
})();
