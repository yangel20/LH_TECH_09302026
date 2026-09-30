import { metrics } from '../lib/company.js';
import './Metrics.css';

export default function Metrics() {
  return (
    <section className="metrics section" aria-labelledby="metrics-title">
      <div className="container metrics__layout">
        <div className="metrics__heading">
          <h2 className="metrics__label" id="metrics-title">{metrics.goalsLabel}</h2>
          <div className="metrics__rule" aria-hidden="true" />
        </div>
        <p className="metrics__headline">
          <strong className="metrics__value">{metrics.headline.value}</strong>
          <span className="metrics__text">{metrics.headline.text}</span>
        </p>
      </div>
    </section>
  );
}
