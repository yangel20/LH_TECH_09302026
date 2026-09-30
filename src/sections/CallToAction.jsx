import { cta } from '../lib/company.js';
import './CallToAction.css';

export default function CallToAction() {
  return (
    <section className="cta section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta__panel card">
          <div className="cta__copy">
            <h2 className="cta__title" id="cta-title">{cta.heading}</h2>
            <p className="cta__text">{cta.text}</p>
          </div>
          {cta.email ? (
            <a className="cta__button btn" href={`mailto:${cta.email}`}>{cta.button}<span aria-hidden="true"> ↗</span></a>
          ) : (
            <span className="todo">[TODO: team email for “{cta.button}”]</span>
          )}
        </div>
      </div>
    </section>
  );
}
