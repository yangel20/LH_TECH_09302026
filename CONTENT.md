# CONTENT.md — the words on the website

Owner: Human (business team). Agents READ this file for all site text; they don't invent copy.
Sources: team Google Doc "Nexo: AI-Assisted Shopping Visibility Platform" + team decisions (2026-09-30).
Anything marked [TODO] still needs the business team.

---------------------------------------------------------------------------------------------
# SITE MAP
- Home        /          hero, what we do, how it works, headline metric, testimonials, CTA
- Mission     /mission   mission, vision, values, metrics
- About Us    /about     our story, founders (with photos), governance & ethics
- Demo        /demo      interactive simulated audit (built later)
---------------------------------------------------------------------------------------------

## Company name
Nexo

## Slogan (use everywhere: hero, footer, page title)
Connecting brands to better answers.

## What we do (Home hero description; use word for word)
Nexo is a B2B GEO consulting and analytics company that researches how AI recommends products,
finds why brands are overlooked or misrepresented, and helps companies improve the information
AI relies on.

## Hero buttons
- Primary: "See how it works" → scrolls to How it works
- Secondary: "Meet the team" → /about

## The problem (Home, short section)
Customers increasingly ask AI assistants what to buy instead of searching and clicking.
If the AI doesn't mention a brand, or describes its product incorrectly, the customer may
never visit that brand's website.

Two risks:
- **Lost visibility**: the product is never mentioned, so the customer never arrives.
- **Brand damage**: the AI gets pricing, features, availability or policies wrong.

## How it works (Home; 4 steps)
1. **Monitor**: We ask major AI assistants realistic customer questions and track whether a
   brand's products appear, which competitors are recommended, and what the AI claims.
2. **Analyze**: We compare AI answers against the brand's verified product information and flag
   wrong features, pricing, availability and policies.
3. **Investigate**: We trace the root cause. Example: a product page lists battery capacity in
   watt-hours but never says how many hours the battery lasts.
4. **Optimize**: We recommend specific updates to product pages, retailer listings, FAQs and
   feeds. The client approves every change, then we re-test to confirm it worked.

## What makes us different
Other tools only report when a product is left out. Nexo checks AI claims against verified
product information, traces problems to their source, guides approved corrections, and
measures results through repeated testing.

---------------------------------------------------------------------------------------------
# MISSION PAGE (/mission)

## Mission
To make sure businesses of every size are found, and described accurately, when customers ask
AI what to buy.

## Vision
A world where AI recommendations are built on accurate, verified information, so customers get
better answers and honest businesses get a fair chance to be chosen.

## Values
- **Accuracy first**: every claim is checked against verified product information.
- **Humans approve**: no customer-facing change goes live without the client's approval.
- **Transparency**: we show clients exactly what AI said, why, and what we changed.
- **Fair visibility**: small and local businesses deserve to be recommended too, not only big brands.

## Metrics
IMPORTANT: Nexo is a new company. Show the first group with the label
"Our 90-day goals for every client" (they are targets, not past results).

Headline (big number, also used on Home):
- **20%**: increase in how often AI assistants recommend a client's products (our 90-day goal)

Goals:
- **20%**: more customers arriving from AI recommendations
- **20%**: fewer inaccurate AI claims about pricing, features and availability
- **20%**: less time for a small business to fix its product information, using our step-by-step recommendations

How we work (facts about our process; these can be shown without the "goals" label):
- **3**: major AI assistants monitored for every client
- **4**: steps in every audit: Monitor, Analyze, Investigate, Optimize
- **100%**: of customer-facing changes approved by the client before going live
- **Every 30 days**: re-testing, to make sure improvements last

---------------------------------------------------------------------------------------------
# ABOUT US PAGE (/about)

## Our story
Shopping is changing. More and more customers ask an AI assistant what to buy, and many of them
never see a search results page. We started Nexo after seeing how easily good products get left
out of those answers, often because of something small, like a battery listed in watt-hours
instead of hours. Big brands have teams to manage this. Most small and local businesses don't.
Nexo exists to close that gap.

## Founders
Section title: "Meet the founders"
Photos live in public/team/ (see file names). If a photo is missing, show the person's initials.

| Name | Title | Photo file |
|------|-------|------------|
| Racielly Mella | Chief Executive Officer (CEO) | public/team/racielly-mella.jpg |
| Chiamaka Elezieanya | Chief Financial Officer (CFO) | public/team/chiamaka-elezieanya.jpg |
| Lena George | Chief Marketing Officer (CMO) | public/team/lena-george.jpg |
| Yangel Aguilera | Chief Technology Officer (CTO) | public/team/yangel-aguilera.jpg |
| Daniela Loveridge | Chief Operating Officer (COO) | public/team/daniela-loveridge.jpg |

One-line bios: [TODO: optional, business team; leave out until provided]

## Governance and ethics (About page, "How we keep AI answers honest")
- **Automated monitoring**: continuously detects AI errors and accuracy issues
- **Human review**: every customer-facing change is approved before it goes live
- **Escalation**: urgent issues are handled right away; routine ones are scheduled
- **Accountability**: clear responsibility for every change and every error
- **Trust metrics**: we measure customer confidence and business results, not just visibility
- **Built to scale safely**: oversight stays strong as we grow across products and AI systems

---------------------------------------------------------------------------------------------
# TESTIMONIALS (Home; can repeat on About)
IMPORTANT: these are illustrative. Names and businesses are fictional. Always show this line
under the testimonials, in small text:
"Illustrative testimonials. Nexo is a new company; these represent the small businesses we're built to serve."

1. "Customers kept telling me an AI app recommended the big chain down the street. Nexo showed
   us our menu and hours were missing online. Now we're getting mentioned, and new faces are
   coming in."
   **Rosa Delgado**, owner, Delgado's Family Bakery

2. "An AI assistant said we didn't do repairs, which is half our business. Nexo found where
   that came from and helped us fix it in an afternoon."
   **Marcus Bell**, owner, Bell Street Bikes

3. "I don't have a marketing team. Nexo gave me a simple list of what to change and then
   proved it worked. I finally understand how AI sees my shop."
   **Priya Nair**, founder, Nair Home & Garden

---------------------------------------------------------------------------------------------
# CALL TO ACTION (bottom of Home and About)
Heading: "Is AI recommending your business?"
Text: "Let's find out, and make sure it gets your story right."
Button: "Contact us" → mailto:[TODO: team email]

## Footer
Nexo · Connecting brands to better answers. · Built by Team LH

---------------------------------------------------------------------------------------------
# DEMO PAGE (/demo)
Added 2026-09-30 by Claude with Yangel's approval (replaces the earlier gaming-laptop example).
IMPORTANT: everything on this page is simulated. Always show the "Simulated" label and this line:
"Niek is a fictional brand created for this demo. AI answers are simulated."
Brands, websites and AI assistants are fictional (no real brands, no real AI products).
Every step has a "Next" button; steps 2-7 also have "Back".
Small UI labels (Back, Remove, Before/After, table headers) and the simulated AI answers,
competitor products and prices live in src/lib/demoData.js (all fictional).

## Intro
Title: "See a Nexo audit in action"
Text: "Follow a simulated audit for Niek, a fictional running brand, from first question to verified fix."

## Step 1: Start (form, pre-filled)
Title: "Tell us about the brand"
- Company name: Niek
- Website: https://niek.example
- Location: Portland, OR
- Industry: Running shoes & apparel
  (other options: Consumer electronics, Retail & e-commerce, Food & beverage, Home & garden,
  Health & beauty, Local services, Other)
- Product data (CSV): niek-products.csv (pre-attached sample; "Replace file" to choose another)
  Helper: "Your file stays in your browser. Nothing is uploaded."
  Link: "Download the sample CSV"
Button: "Next: Competitors"

## Step 2: Competitors
Title: "Who do you compete with?"
Text: "We'll check how often AI recommends these brands instead of you. Remove or add competitors."
Pre-filled: Altus Running (altus.example), Kova Athletics (kova.example), Ridgeline Gear (ridgeline.example)
Suggestions: Summit Stride (summitstride.example), Cadence Co. (cadence.example),
             Northpace (northpace.example), Tempo Trail (tempotrail.example), Brisk Athletic (brisk.example)
Add box label: "Competitor name" · optional "Website" · Button: "Add"
Rules: at least 1, up to 8 competitors.
Button: "Next: Run AI check"

## Step 3: Monitor
Title: "What AI recommends today"
Shopper question: "What are the best waterproof running shoes under $150?"
Asked to 3 AI assistants (shown as Assistant A, B, C).
Result: Niek is recommended in 0 of 3 answers. Competitors are recommended instead.
Button: "Next: Analyze answers"

## Step 4: Analyze
Title: "What AI got wrong"
Niek Stormline Trail ($135) meets the question: waterproof, under $150.
Assistant B also claims it "is not waterproof": inaccurate.
Risks found: Lost visibility (not mentioned) and Brand damage (wrong claim).
Button: "Next: Find the cause"

## Step 5: Investigate
Title: "Why it happened"
Root cause: the product page and feed say "sealed weather membrane" but never use the word
"waterproof", and the feed's waterproof field is empty.
Button: "Next: See the fix"

## Step 6: Optimize
Title: "Recommended fix"
Recommended changes:
- Product page: add "Waterproof" to the title and first line of the description.
- Product feed: set waterproof = yes.
"Every change is approved by the client before it goes live."
Button: "Approve fix" (required), then "Next: Re-test"

## Step 7: Re-test
Title: "After the fix"
Same question, 3 assistants: Niek Stormline Trail is now recommended in 3 of 3 answers,
described as waterproof.
Button: "Start over"
