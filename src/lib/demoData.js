// Demo page copy + simulated data. Owner: Lead (Claude).
// Wording comes from CONTENT.md "DEMO PAGE". Everything here is SIMULATED and fictional:
// Niek, every competitor, every .example website and "Assistant A/B/C" are made up.

export const demoCopy = {
  badge: 'Simulated',
  disclaimer: 'Niek is a fictional brand created for this demo. AI answers are simulated.',
  title: 'See a Nexo audit in action',
  intro: 'Follow a simulated audit for Niek, a fictional running brand, from first question to verified fix.',
  back: 'Back',
  steps: [
    { key: 'start', label: 'Start', title: 'Tell us about the brand', next: 'Next: Competitors' },
    { key: 'competitors', label: 'Competitors', title: 'Who do you compete with?', next: 'Next: Run AI check' },
    { key: 'monitor', label: 'Monitor', title: 'What AI recommends today', next: 'Next: Analyze answers' },
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

// product/price/blurb/mentions are simulated. mentions[i] = recommended by assistant i (A, B, C) before the fix.
export const knownCompetitors = [
  { name: 'Altus Running', website: 'altus.example', product: 'Altus Ridge WP', price: 145, blurb: 'fully waterproof with a grippy trail outsole', mentions: [true, true, true] },
  { name: 'Kova Athletics', website: 'kova.example', product: 'Kova Drift Waterproof', price: 98, blurb: 'a budget waterproof pick for daily runs', mentions: [true, false, true] },
  { name: 'Ridgeline Gear', website: 'ridgeline.example', product: 'Ridgeline Torrent', price: 140, blurb: 'waterproof and built for rough, wet trails', mentions: [false, true, true] },
  { name: 'Summit Stride', website: 'summitstride.example', product: 'Summit Stride Rainpeak', price: 130, blurb: 'a waterproof hiking-running hybrid', mentions: [false, true, false] },
  { name: 'Cadence Co.', website: 'cadence.example', product: 'Cadence Storm Runner', price: 120, blurb: 'a waterproof road shoe for rainy commutes', mentions: [true, false, false] },
  { name: 'Northpace', website: 'northpace.example', product: 'Northpace Sleet Trail', price: 149, blurb: 'waterproof and insulated for cold, wet runs', mentions: [false, false, true] },
  { name: 'Tempo Trail', website: 'tempotrail.example', product: 'Tempo Trail Splash Racer', price: 125, blurb: 'a light, water-resistant racing option', mentions: [false, true, false] },
  { name: 'Brisk Athletic', website: 'brisk.example', product: 'Brisk All-Weather Run', price: 85, blurb: 'an affordable all-weather everyday runner', mentions: [true, false, true] },
];
export const defaultCompetitorNames = ['Altus Running', 'Kova Athletics', 'Ridgeline Gear'];

// A competitor typed in by the viewer gets simulated details too.
export function makeCompetitor(name, website, index) {
  const known = knownCompetitors.find((c) => c.name.toLowerCase() === name.trim().toLowerCase());
  if (known) return { ...known, website: website || known.website };
  const patterns = [[true, true, false], [false, true, true], [true, false, true]];
  return {
    name: name.trim(),
    website: website.trim(),
    product: `${name.trim()} Waterproof Runner`,
    price: 129,
    blurb: 'a waterproof running shoe',
    mentions: patterns[index % patterns.length],
  };
}

// ---- Step 3: Monitor / Step 7: Re-test ----
export const question = 'What are the best waterproof running shoes under $150?';
export const assistants = ['Assistant A', 'Assistant B', 'Assistant C'];

export const niekProduct = {
  brand: 'Niek',
  sku: 'NK-101',
  product: 'Niek Stormline Trail',
  price: 135,
  blurbAfter: 'a waterproof trail runner with grippy lugs for wet, muddy terrain',
};

export const monitorCopy = {
  questionLabel: 'Shopper question',
  recommends: 'Recommends',
  scoreTitle: 'Recommended in',
  scoreOf: 'of 3 answers',
  resultBefore: 'Niek is recommended in 0 of 3 answers. Competitors are recommended instead.',
  wrongClaim: 'Note: the Niek Stormline Trail is not waterproof, so it does not fit this request.',
  intro: 'Here are strong waterproof running shoes under $150:',
};

// Build the three simulated answers from the viewer's competitor list.
// after = true adds Niek first in every answer (the re-test).
export function buildAnswers(competitors, { after = false } = {}) {
  return assistants.map((assistant, i) => {
    let picks = competitors.filter((c) => c.mentions[i]);
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
    const note = !after && i === 1 ? monitorCopy.wrongClaim : null;
    return { assistant, items, note };
  });
}

export function scoreboard(competitors, answers) {
  const count = (brand) => answers.filter((a) => a.items.some((it) => it.brand === brand)).length;
  return [
    { brand: niekProduct.brand, count: count(niekProduct.brand), isClient: true },
    ...competitors.map((c) => ({ brand: c.name, count: count(c.name) })),
  ];
}

// ---- Step 4: Analyze ----
export const analyzeCopy = {
  lead: 'Niek Stormline Trail ($135) meets the question: waterproof, under $150.',
  tableCaption: 'AI answers checked against Niek\'s verified product data',
  columns: ['Assistant', 'What AI said about Niek', 'Verified data', 'Result'],
  rows: [
    { assistant: 'Assistant A', said: 'Not mentioned', verified: 'Waterproof, $135', result: 'Missing', tone: 'warning' },
    { assistant: 'Assistant B', said: '"Is not waterproof"', verified: 'Waterproof, $135', result: 'Inaccurate', tone: 'danger' },
    { assistant: 'Assistant C', said: 'Not mentioned', verified: 'Waterproof, $135', result: 'Missing', tone: 'warning' },
  ],
  risksTitle: 'Risks found',
  risks: [
    { title: 'Lost visibility', text: 'not mentioned' },
    { title: 'Brand damage', text: 'wrong claim' },
  ],
};

// ---- Step 5: Investigate ----
export const investigateCopy = {
  lead: 'Root cause: the product page and feed say "sealed weather membrane" but never use the word "waterproof", and the feed\'s waterproof field is empty.',
  rowLabel: 'Niek product data (from the CSV)',
  sampleNote: 'This audit uses Niek\'s sample data.',
  highlightPhrase: 'sealed weather membrane',
  emptyField: 'waterproof',
  emptyLabel: '(empty)',
};

// ---- Step 6: Optimize ----
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

// ---- Step 7: Re-test ----
export const retestCopy = {
  result: 'Same question, 3 assistants: Niek Stormline Trail is now recommended in 3 of 3 answers, described as waterproof.',
};
