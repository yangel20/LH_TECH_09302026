import { steps, difference } from '../lib/company.js';
import './Features.css';

// PLACEHOLDER. Owner: Codex (task #3). Replace freely; keep id="how-it-works" (the hero button scrolls here).
export default function Features() {
  return (
    <section className="features section" id="how-it-works">
      <div className="container">
        <h2>How it works</h2>
        <ol className="features__grid">
          {steps.map((s) => (
            <li key={s.title} className="card">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <h3>{difference.title}</h3>
        <p>{difference.text}</p>
      </div>
    </section>
  );
}
