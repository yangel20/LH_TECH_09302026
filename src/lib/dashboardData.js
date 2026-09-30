// Mock numbers for the demo's AI visibility dashboard. Owner: Lead (Claude). ALL SIMULATED.
// Everything is derived from the viewer's competitor list and chosen AI models, so the
// dashboard reacts to earlier steps. Nothing here is real data.
import { buildPrompts, niekProduct } from './demoData.js';

export const dashboardCopy = {
  breadcrumb: ['Brand report', 'Niek', 'Overview'],
  period: 'Last 14 days',
  region: 'United States',
  allModels: 'All models',
  basedOn: (models) => `Report based on 100 prompts × ${models} ${models === 1 ? 'model' : 'models'} = ${100 * models} simulated tests`,
  kpis: {
    visibility: 'AI visibility score',
    visibilityNote: (m, t) => `Mentioned in ${m}/${t} responses`,
    mentions: 'Your brand mentions',
    position: 'Your average position',
    positionNote: 'Lower is better (1 = first recommendation)',
    sentiment: 'Sentiment',
    sentimentNote: '1 inaccurate claim found',
  },
  coverageTitle: 'Brand coverage over time',
  coverageNote: 'Niek + up to 5 competitors · % of AI answers that mention the brand',
  coverageAxis: 'Brand coverage %',
  rankingTitle: 'Brand ranking',
  rankingCols: ['#', 'Brand', 'Sentiment', 'Mentions', 'Coverage', 'Share of voice'],
  matrixTitle: 'Brand visibility index',
  matrixX: 'Brand coverage (%)',
  matrixY: 'Likelihood to buy (%)',
  quadrants: { tl: 'Niche', tr: 'Leaders', bl: 'Low performance', br: 'Low conversion' },
  promptsTitle: 'Niek in the test prompts',
  promptsNote: 'Showing 10 of 100 prompts',
  mentioned: 'Mentioned',
  notMentioned: 'Not mentioned',
  inaccurate: 'Mentioned · inaccurate',
  branded: 'Branded',
  nonBranded: 'Non-branded',
  position: 'Position',
  sources: (n) => `${n} sources`,
  simulated: 'Simulated data',
};

// Simulated brand profiles: coverage %, likelihood to buy %, sentiment, average position.
const profiles = {
  Niek: { coverage: 9, buy: 34, sentiment: 18, position: 4.6 },
  'Altus Running': { coverage: 58, buy: 72, sentiment: 64, position: 1.8 },
  'Kova Athletics': { coverage: 41, buy: 58, sentiment: 57, position: 2.6 },
  'Ridgeline Gear': { coverage: 47, buy: 69, sentiment: 61, position: 2.2 },
  'Summit Stride': { coverage: 29, buy: 76, sentiment: 66, position: 2.9 },
  'Cadence Co.': { coverage: 22, buy: 52, sentiment: 49, position: 3.4 },
  Northpace: { coverage: 18, buy: 79, sentiment: 70, position: 3.1 },
  'Tempo Trail': { coverage: 15, buy: 61, sentiment: 55, position: 3.8 },
  'Brisk Athletic': { coverage: 26, buy: 47, sentiment: 44, position: 3.3 },
};
const customProfile = { coverage: 20, buy: 60, sentiment: 50, position: 3.5 };

// How generous each model is with competitors, and Niek's own coverage per model.
const modelFactor = { chatgpt: 1, gemini: 0.85, claude: 1.1, perplexity: 0.95, copilot: 0.9 };
const niekByModel = { chatgpt: 11, gemini: 4, claude: 12, perplexity: 9, copilot: 7 };

const round1 = (n) => Math.round(n * 10) / 10;

function coverageFor(brand, modelIds) {
  if (brand === 'Niek') {
    return modelIds.reduce((sum, id) => sum + niekByModel[id], 0) / modelIds.length;
  }
  const base = (profiles[brand] ?? customProfile).coverage;
  const factor = modelIds.reduce((sum, id) => sum + modelFactor[id], 0) / modelIds.length;
  return Math.min(95, base * factor);
}

// Color slot follows the brand (Niek = 1, then competitors in list order), never its rank.
export function brandSlots(competitors) {
  return { Niek: 1, ...Object.fromEntries(competitors.map((c, i) => [c.name, i + 2])) };
}

export function buildDashboard(competitors, modelIds) {
  const tests = 100 * modelIds.length;
  const names = ['Niek', ...competitors.map((c) => c.name)];
  const slots = brandSlots(competitors);

  const brands = names.map((name) => {
    const p = profiles[name] ?? customProfile;
    const coverage = round1(coverageFor(name, modelIds));
    return {
      name,
      isClient: name === 'Niek',
      slot: slots[name],
      coverage,
      mentions: Math.round((coverage / 100) * tests),
      buy: p.buy,
      sentiment: p.sentiment,
      position: p.position,
    };
  });
  const totalMentions = brands.reduce((s, b) => s + b.mentions, 0) || 1;
  brands.forEach((b) => { b.share = round1((b.mentions / totalMentions) * 100); });
  const ranking = [...brands].sort((a, b) => b.mentions - a.mentions);
  const niek = brands[0];
  const competitorsOnly = ranking.filter((b) => !b.isClient);

  // 14 days of coverage for Niek + the first 5 competitors in the viewer's list.
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(2026, 8, 17 + i);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  const series = brands.slice(0, 6).map((b, bi) => ({
    name: b.name,
    slot: b.slot,
    isClient: b.isClient,
    values: days.map((_, di) => {
      // Niek slips after day 9, when answers start calling the shoe "not waterproof".
      const drift = b.isClient ? (di >= 9 ? -2.5 : 1) : 0;
      const wave = 1 + 0.1 * Math.sin(di * 0.9 + bi * 1.7);
      return Math.max(0, round1(b.coverage * wave + drift));
    }),
  }));

  // Prompt-level outcomes for Niek (Gemini, the weakest model for Niek, misses two more).
  const weak = modelIds.length === 1 && modelIds[0] === 'gemini';
  const outcomes = [
    { status: weak ? 'no' : 'yes', position: '5/7', branded: false, sources: 4 },
    { status: 'no', branded: false, sources: 5 },
    { status: 'no', branded: false, sources: 3 },
    { status: 'no', branded: false, sources: 4 },
    { status: 'wrong', position: '1/1', branded: true, sources: 2 },
    { status: 'yes', position: '2/2', branded: true, sources: 3 },
    { status: weak ? 'no' : 'yes', position: '6/8', branded: false, sources: 4 },
    { status: 'no', branded: false, sources: 2 },
    { status: 'no', branded: false, sources: 3 },
    { status: 'no', branded: false, sources: 5 },
  ];
  const prompts = buildPrompts(competitors).map((p, i) => ({ ...p, ...outcomes[i] }));

  return {
    tests,
    niek,
    ranking,
    topCompetitors: competitorsOnly.slice(0, 3),
    bestPositions: [...competitorsOnly].sort((a, b) => a.position - b.position).slice(0, 3),
    days,
    series,
    prompts,
    product: niekProduct.product,
  };
}
