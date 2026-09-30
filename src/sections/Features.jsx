import { steps, difference, metrics } from '../lib/company.js';
import './Features.css';

export default function Features() {
  return (
    <section className="features section" id="how-it-works" aria-labelledby="features-title">
      <div className="container">
        <h2 className="features__title" id="features-title">{metrics.processLabel}</h2>
        <ol className="features__grid">
          {steps.map((step, index) => (
            <li key={step.title} className="features__step card">
              <span className="features__number badge badge--accent" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="features__difference">
          <h3>{difference.title}</h3>
          <p>{difference.text}</p>
        </div>
      </div>
    </section>
  );
}
