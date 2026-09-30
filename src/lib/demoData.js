// Demo page copy + simulated data. Owner: Lead (Claude).
// Wording comes from CONTENT.md "DEMO PAGE". Everything here is SIMULATED:
// Niek, every competitor and every .example website are fictional, and no AI model is ever called.
// Real model names are used for illustration only; every answer is labeled as simulated.

export const demoCopy = {
  badge: 'Simulated',
  disclaimer: 'Niek is a fictional brand created for this demo. AI answers are simulated.',
  title: 'See a Nexo audit in action',
  intro: 'Follow a simulated audit for Niek, a fictional running brand, from first question to verified fix.',
  back: 'Back',
  steps: [
    { key: 'start', label: 'Start', title: 'Tell us about the brand', next: 'Next: Competitors' },
    { key: 'competitors', label: 'Competitors', title: 'Who do you compete with?', next: 'Next: Build test data' },
    { key: 'testdata', label: 'Test data', title: 'Build test data', next: 'Next: Run AI check' },
    { key: 'dashboard', label: 'Dashboard', title: 'AI visibility dashboard', next: 'Next: Analyze answers' },
    { key: 'analyze', label: 'Analyze', title: 'What AI got wrong', next: 'Next: Find the cause' },
    { key: 'investigate', label: 'Investigate', title: 'Why it happened', next: 'Next: See the fix' },
    { key: 'optimize', label: 'Optimize', title: 'Recommended fix', next: 'Next: Re-test' },
    { key: 'retest', label: 'Re-test', title: 'After the fix', next: 'Start over' },
  ],
};

// ---- Step 1: Start (form) ----
export const formDefaults = {
  company: 'Niek',
  website: 'https://niek.example',
  location: 'Portland, OR',
  industry: 'Running shoes & apparel',
};

export const industries = [
  'Running shoes & apparel',
  'Consumer electronics',
  'Retail & e-commerce',
  'Food & beverage',
  'Home & garden',
  'Health & beauty',
  'Local services',
  'Other',
];

export const formCopy = {
  labels: {
    company: 'Company name',
    website: 'Website',
    location: 'Location',
    industry: 'Industry',
    file: 'Product data (CSV)',
  },
  sampleFile: { name: 'niek-products.csv', url: '/demo/niek-products.csv' },
  fileHelper: 'Your file stays in your browser. Nothing is uploaded.',
  replaceFile: 'Replace file',
  useSample: 'Use sample file',
  downloadSample: 'Download the sample CSV',
};

// ---- Step 2: Competitors ----
export const competitorsCopy = {
  text: "We'll check how often AI recommends these brands instead of you. Remove or add competitors.",
  nameLabel: 'Competitor name',
  websiteLabel: 'Website',
  optional: 'optional',
  add: 'Add',
  remove: 'Remove',
  suggestionsLabel: 'Suggestions',
  rules: 'At least 1, up to 8 competitors.',
  min: 1,
  max: 8,
};

// product/price/blurb are simulated. mentions[i] = recommended by model i (in the models list order) before the fix.
export const knownCompetitors = [
  { name: 'Altus Running', website: 'altus.example', product: 'Altus Ridge WP', price: 145, blurb: 'fully waterproof with a grippy trail outsole', mentions: [true, true, true, true, false] },
  { name: 'Kova Athletics', website: 'kova.example', product: 'Kova Drift Waterproof', price: 98, blurb: 'a budget waterproof pick for daily runs', mentions: [true, false, true, false, true] },
  { name: 'Ridgeline Gear', website: 'ridgeline.example', product: 'Ridgeline Torrent', price: 140, blurb: 'waterproof and built for rough, wet trails', mentions: [false, true, true, true, true] },
  { name: 'Summit Stride', website: 'summitstride.example', product: 'Summit Stride Rainpeak', price: 130, blurb: 'a waterproof hiking-running hybrid', mentions: [false, true, false, true, false] },
  { name: 'Cadence Co.', website: 'cadence.example', product: 'Cadence Storm Runner', price: 120, blurb: 'a waterproof road shoe for rainy commutes', mentions: [true, false, false, false, true] },
  { name: 'Northpace', website: 'northpace.example', product: 'Northpace Sleet Trail', price: 149, blurb: 'waterproof and insulated for cold, wet runs', mentions: [false, false, true, true, false] },
  { name: 'Tempo Trail', website: 'tempotrail.example', product: 'Tempo Trail Splash Racer', price: 125, blurb: 'a light, water-resistant racing option', mentions: [false, true, false, false, true] },
  { name: 'Brisk Athletic', website: 'brisk.example', product: 'Brisk All-Weather Run', price: 85, blurb: 'an affordable all-weather everyday runner', mentions: [true, false, true, false, false] },
];
export const defaultCompetitorNames = ['Altus Running', 'Kova Athletics', 'Ridgeline Gear'];

// A competitor typed in by the viewer gets simulated details too.
export function makeCompetitor(name, website, index) {
  const known = knownCompetitors.find((c) => c.name.toLowerCase() === name.trim().toLowerCase());
  if (known) return { ...known, website: website || known.website };
  const patterns = [
    [true, true, false, true, false],
    [false, true, true, false, true],
    [true, false, true, true, false],
  ];
  return {
    name: name.trim(),
    website: website.trim(),
    product: `${name.trim()} Waterproof Runner`,
    price: 129,
    blurb: 'a waterproof running shoe',
    mentions: patterns[index % patterns.length],
  };
}

// ---- Step 3: Test data (synthetic prompts + model choice) ----
// Real product names, shown for illustration only. No model is called; every answer is simulated.
export const models = [
  { id: 'chatgpt', name: 'ChatGPT', maker: 'OpenAI' },
  { id: 'gemini', name: 'Gemini', maker: 'Google' },
  { id: 'claude', name: 'Claude', maker: 'Anthropic' },
  { id: 'perplexity', name: 'Perplexity', maker: 'Perplexity AI' },
  { id: 'copilot', name: 'Copilot', maker: 'Microsoft' },
];

export const testDataCopy = {
  text: "Nexo's internal AI turns your product data and competitors into realistic shopper questions, then tests them across the top AI models.",
  builtFrom: (products, competitors) => `Built from ${products} products, their target customers and ${competitors} ${competitors === 1 ? 'competitor' : 'competitors'}`,
  generate: 'Generate test data',
  generating: 'Generating synthetic shopper questions…',
  generatedLabel: "Generated by Nexo's internal AI · Simulated",
  showing: 'Showing 10 of 100 generated prompts',
  columns: ['#', 'Test prompt', 'Type', 'Shopper persona'],
  headlineBadge: 'Headline prompt',
  modelsTitle: 'Choose the AI models to test',
  modelsText: 'Pick at least one. All five are selected by default.',
  modelsDisclaimer: 'Model names are shown for illustration. No models are called in this demo; every answer is simulated.',
  modelsError: 'Choose at least one AI model.',
  generateError: 'Generate the test data first.',
  summary: (n) => `100 prompts × ${n} ${n === 1 ? 'model' : 'models'} = ${100 * n} simulated tests`,
};

export const question = 'What are the best waterproof running shoes under $150?';

// 10 of the 100 synthetic prompts. The comparison prompt uses the viewer's first competitor.
export function buildPrompts(competitors) {
  const rival = competitors[0]?.product ?? 'Altus Ridge WP';
  return [
    { prompt: 'What are the best trail running shoes?', type: 'Category', persona: 'Trail runner, all levels' },
    { prompt: question, type: 'Category', persona: 'Trail runner who trains in rain and mud', headline: true },
    { prompt: 'Which trail running shoes grip best in mud?', type: 'Feature', persona: 'Trail runner, wet climate' },
    { prompt: 'What are the best trail running shoes for rainy weather?', type: 'Category', persona: 'Runner in the Pacific Northwest' },
    { prompt: 'Is the Niek Stormline Trail waterproof?', type: 'Fact check', persona: 'Shopper checking details' },
    { prompt: `${rival} vs Niek Stormline Trail for wet trails?`, type: 'Comparison', persona: 'Shopper comparing brands' },
    { prompt: 'Good trail running shoes for beginners under $150?', type: 'Budget', persona: 'New trail runner' },
    { prompt: 'What shoes should I wear for a muddy trail half marathon?', type: 'Scenario', persona: 'Race-day planner' },
    { prompt: 'What are the most comfortable trail running shoes for long distances?', type: 'Feature', persona: 'Ultra runner' },
    { prompt: 'Which brands make the best waterproof trail runners?', type: 'Brand', persona: 'Brand-curious shopper' },
  ];
}

// ---- Step 8: Re-test (answer cards). Step 4 is the dashboard: see dashboardData.js ----
export const niekProduct = {
  brand: 'Niek',
  sku: 'NK-101',
  product: 'Niek Stormline Trail',
  price: 135,
  blurbAfter: 'a waterproof trail runner with grippy lugs for wet, muddy terrain',
};

const answers = (n) => `${n} ${n === 1 ? 'answer' : 'answers'}`;

export const monitorCopy = {
  questionLabel: 'Headline prompt',
  scoreTitle: 'Recommended in',
  scoreOf: (n) => `of ${answers(n)}`,
  resultBefore: (n) => `Niek is recommended in 0 of ${answers(n)}. Competitors are recommended instead.`,
  wrongClaim: 'Note: the Niek Stormline Trail is not waterproof, so it does not fit this request.',
  intro: 'Here are strong waterproof running shoes under $150:',
  simulatedNote: (model) => `Simulated response, not real output from ${model}.`,
};

// The model that makes the wrong "not waterproof" claim: the 2nd chosen model (or the only one).
export const wrongClaimIndex = (chosen) => (chosen.length > 1 ? 1 : 0);

// Build one simulated answer per chosen model from the viewer's competitor list.
// after = true puts Niek first in every answer (the re-test).
export function buildAnswers(competitors, chosen, { after = false } = {}) {
  return chosen.map((model, i) => {
    const slot = models.findIndex((m) => m.id === model.id);
    let picks = competitors.filter((c) => c.mentions[slot]);
    if (picks.length === 0) picks = competitors.slice(0, 1);
    const items = picks.slice(0, after ? 2 : 3).map((c) => ({
      brand: c.name,
      product: c.product,
      price: c.price,
      blurb: c.blurb,
    }));
    if (after) {
      items.unshift({ brand: niekProduct.brand, product: niekProduct.product, price: niekProduct.price, blurb: niekProduct.blurbAfter, isClient: true });
    }
    const note = !after && i === wrongClaimIndex(chosen) ? monitorCopy.wrongClaim : null;
    return { model, items, note };
  });
}

export function scoreboard(competitors, results) {
  const count = (brand) => results.filter((a) => a.items.some((it) => it.brand === brand)).length;
  return [
    { brand: niekProduct.brand, count: count(niekProduct.brand), isClient: true },
    ...competitors.map((c) => ({ brand: c.name, count: count(c.name) })),
  ];
}

// ---- Step 5: Analyze ----
export const analyzeCopy = {
  lead: 'Niek Stormline Trail ($135) meets the question: waterproof, under $150.',
  tableCaption: "Simulated AI answers checked against Niek's verified product data",
  columns: ['AI model', 'What AI said about Niek', 'Verified data', 'Result'],
  notMentioned: 'Not mentioned',
  wrongSaid: '"Is not waterproof"',
  verified: 'Waterproof, $135',
  missing: 'Missing',
  inaccurate: 'Inaccurate',
  risksTitle: 'Risks found',
  risks: [
    { title: 'Lost visibility', text: 'not mentioned' },
    { title: 'Brand damage', text: 'wrong claim' },
  ],
};

export function analyzeRows(chosen) {
  const wrong = wrongClaimIndex(chosen);
  return chosen.map((m, i) => ({
    model: m.name,
    said: i === wrong ? analyzeCopy.wrongSaid : analyzeCopy.notMentioned,
    verified: analyzeCopy.verified,
    result: i === wrong ? analyzeCopy.inaccurate : analyzeCopy.missing,
    tone: i === wrong ? 'danger' : 'warning',
  }));
}

// ---- Step 6: Investigate ----
export const investigateCopy = {
  lead: 'Root cause: the product page and feed say "sealed weather membrane" but never use the word "waterproof", and the feed\'s waterproof field is empty.',
  rowLabel: 'Niek product data (from the CSV)',
  sampleNote: "This audit uses Niek's sample data.",
  highlightPhrase: 'sealed weather membrane',
  emptyField: 'waterproof',
  emptyLabel: '(empty)',
};

// ---- Step 7: Optimize ----
export const optimizeCopy = {
  changesTitle: 'Recommended changes',
  changes: [
    {
      where: 'Product page',
      what: 'add "Waterproof" to the title and short description.',
      before: 'Niek Stormline Trail: Trail runner with a sealed weather membrane for wet, muddy terrain.',
      after: 'Niek Stormline Trail Waterproof: Waterproof trail runner with a sealed weather membrane for wet, muddy terrain.',
    },
    {
      where: 'Product feed',
      what: 'set waterproof = yes and list "Waterproof" first in important features.',
      before: 'waterproof: (empty) · important_features: Sealed weather membrane; 5 mm grippy lugs; Rock plate; Reflective heel',
      after: 'waterproof: yes · important_features: Waterproof (sealed weather membrane); 5 mm grippy lugs; Rock plate; Reflective heel',
    },
  ],
  beforeLabel: 'Before',
  afterLabel: 'After',
  approvalNote: 'Every change is approved by the client before it goes live.',
  approve: 'Approve fix',
  approved: 'Fix approved',
};

// ---- Step 8: Re-test ----
export const retestCopy = {
  result: (n) => `Same question, ${n} AI ${n === 1 ? 'model' : 'models'}: Niek Stormline Trail is now recommended in ${n} of ${answers(n)}, described as waterproof.`,
};
