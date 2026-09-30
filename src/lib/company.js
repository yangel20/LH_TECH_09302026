// All Nexo site copy, taken word for word from CONTENT.md. Owner: Lead (Claude).
// Components import from here instead of hard-coding text. If CONTENT.md changes, update this file.
// A value of null means CONTENT.md still has a [TODO]; render <span className="todo"> for it.

export const company = {
  name: 'Nexo',
  slogan: 'Connecting brands to better answers.',
  description:
    'Nexo is a B2B GEO consulting and analytics company that researches how AI recommends products, finds why brands are overlooked or misrepresented, and helps companies improve the information AI relies on.',
  footer: 'Nexo · Connecting brands to better answers. · Built by Team LH',
};

export const heroButtons = {
  primary: { label: 'See how it works', href: '#how-it-works' },
  secondary: { label: 'Meet the team', to: '/about' },
};

export const problem = {
  title: 'The problem',
  text: [
    'Customers increasingly ask AI assistants what to buy instead of searching and clicking.',
    "If the AI doesn't mention a brand, or describes its product incorrectly, the customer may never visit that brand's website.",
  ],
  risksIntro: 'Two risks:',
  risks: [
    { title: 'Lost visibility', text: 'the product is never mentioned, so the customer never arrives.' },
    { title: 'Brand damage', text: 'the AI gets pricing, features, availability or policies wrong.' },
  ],
};

export const steps = [
  {
    title: 'Monitor',
    text: "We ask major AI assistants realistic customer questions and track whether a brand's products appear, which competitors are recommended, and what the AI claims.",
  },
  {
    title: 'Analyze',
    text: "We compare AI answers against the brand's verified product information and flag wrong features, pricing, availability and policies.",
  },
  {
    title: 'Investigate',
    text: 'We trace the root cause. Example: a product page lists battery capacity in watt-hours but never says how many hours the battery lasts.',
  },
  {
    title: 'Optimize',
    text: 'We recommend specific updates to product pages, retailer listings, FAQs and feeds. The client approves every change, then we re-test to confirm it worked.',
  },
];

export const difference = {
  title: 'What makes us different',
  text: 'Other tools only report when a product is left out. Nexo checks AI claims against verified product information, traces problems to their source, guides approved corrections, and measures results through repeated testing.',
};

export const mission =
  'To make sure businesses of every size are found, and described accurately, when customers ask AI what to buy.';

export const vision =
  'A world where AI recommendations are built on accurate, verified information, so customers get better answers and honest businesses get a fair chance to be chosen.';

export const values = [
  { title: 'Accuracy first', text: 'every claim is checked against verified product information.' },
  { title: 'Humans approve', text: "no customer-facing change goes live without the client's approval." },
  { title: 'Transparency', text: 'we show clients exactly what AI said, why, and what we changed.' },
  { title: 'Fair visibility', text: 'small and local businesses deserve to be recommended too, not only big brands.' },
];

// Nexo is a new company: goals are TARGETS, never show them as past results.
// Always display goals (and the headline) with metrics.goalsLabel.
export const metrics = {
  goalsLabel: 'Our 90-day goals for every client',
  headline: {
    value: '20%',
    text: "increase in how often AI assistants recommend a client's products (our 90-day goal)",
  },
  goals: [
    { value: '20%', text: 'more customers arriving from AI recommendations' },
    { value: '20%', text: 'fewer inaccurate AI claims about pricing, features and availability' },
    { value: '20%', text: 'less time for a small business to fix its product information, using our step-by-step recommendations' },
  ],
  // Facts about how we work; these can be shown without the goals label.
  processLabel: 'How we work',
  process: [
    { value: '3', text: 'major AI assistants monitored for every client' },
    { value: '4', text: 'steps in every audit: Monitor, Analyze, Investigate, Optimize' },
    { value: '100%', text: 'of customer-facing changes approved by the client before going live' },
    { value: 'Every 30 days', text: 're-testing, to make sure improvements last' },
  ],
};

export const story = {
  title: 'Our story',
  text: "Shopping is changing. More and more customers ask an AI assistant what to buy, and many of them never see a search results page. We started Nexo after seeing how easily good products get left out of those answers, often because of something small, like a battery listed in watt-hours instead of hours. Big brands have teams to manage this. Most small and local businesses don't. Nexo exists to close that gap.",
};

// bio: null until the business team provides one-line bios (leave them out until then).
export const founders = {
  title: 'Meet the founders',
  people: [
    { name: 'Racielly Mella', title: 'Chief Executive Officer (CEO)', photo: '/team/racielly-mella.jpg', bio: null },
    { name: 'Chiamaka Elezieanya', title: 'Chief Financial Officer (CFO)', photo: '/team/chiamaka-elezieanya.jpg', bio: null },
    { name: 'Lena George', title: 'Chief Marketing Officer (CMO)', photo: '/team/lena-george.jpg', bio: null },
    { name: 'Yangel Aguilera', title: 'Chief Technology Officer (CTO)', photo: '/team/yangel-aguilera.jpg', bio: null },
    { name: 'Daniela Loveridge', title: 'Chief Operating Officer (COO)', photo: '/team/daniela-loveridge.jpg', bio: null },
  ],
};

export const governance = {
  title: 'How we keep AI answers honest',
  items: [
    { title: 'Automated monitoring', text: 'continuously detects AI errors and accuracy issues' },
    { title: 'Human review', text: 'every customer-facing change is approved before it goes live' },
    { title: 'Escalation', text: 'urgent issues are handled right away; routine ones are scheduled' },
    { title: 'Accountability', text: 'clear responsibility for every change and every error' },
    { title: 'Trust metrics', text: 'we measure customer confidence and business results, not just visibility' },
    { title: 'Built to scale safely', text: 'oversight stays strong as we grow across products and AI systems' },
  ],
};

// Fictional people and businesses. ALWAYS render testimonials.disclaimer under them, in small text.
export const testimonials = {
  disclaimer:
    "Illustrative testimonials. Nexo is a new company; these represent the small businesses we're built to serve.",
  items: [
    {
      quote:
        "Customers kept telling me an AI app recommended the big chain down the street. Nexo showed us our menu and hours were missing online. Now we're getting mentioned, and new faces are coming in.",
      name: 'Rosa Delgado',
      role: "owner, Delgado's Family Bakery",
    },
    {
      quote:
        'An AI assistant said we didn\'t do repairs, which is half our business. Nexo found where that came from and helped us fix it in an afternoon.',
      name: 'Marcus Bell',
      role: 'owner, Bell Street Bikes',
    },
    {
      quote:
        "I don't have a marketing team. Nexo gave me a simple list of what to change and then proved it worked. I finally understand how AI sees my shop.",
      name: 'Priya Nair',
      role: 'founder, Nair Home & Garden',
    },
  ],
};

// Placeholder address chosen by Yangel: the reserved .example domain can never reach a real inbox.
// Swap in a real team inbox when there is one.
export const cta = {
  heading: 'Is AI recommending your business?',
  text: "Let's find out, and make sure it gets your story right.",
  button: 'Contact us',
  email: 'contact@nexo.example',
};

// Demo page (built later). Fictional example only; the demo must be labeled "Simulated".
export const demoExample = {
  question: 'Best gaming laptop under $1,500 with at least 6 hours of battery life?',
  outcome: 'The client\'s laptop qualifies but is not mentioned.',
  cause: 'The product page lists battery as watt-hours with no estimated runtime.',
  fix: 'Add verified battery life in hours to the product page and feeds.',
  retest: 'The laptop now appears in the AI recommendation.',
};
