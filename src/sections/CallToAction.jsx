import { cta } from '../lib/company.js';
import './CallToAction.css';

// PLACEHOLDER. Owner: Codex (task #3). Used at the bottom of Home and About.
// cta.email is null until the business team provides it: show the TODO instead of a broken link.
export default function CallToAction() {
  return (
    <section className="cta section">
      <div className="container">
        <h2>{cta.heading}</h2>
        <p>{cta.text}</p>
        {cta.email ? (
          <a className="btn" href={`mailto:${cta.email}`}>{cta.button}</a>
        ) : (
          <span className="todo">[TODO: team email for “{cta.button}”]</span>
        )}
      </div>
    </section>
  );
}
