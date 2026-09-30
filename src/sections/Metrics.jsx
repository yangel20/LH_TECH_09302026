import { metrics } from '../lib/company.js';
import './Metrics.css';

// PLACEHOLDER. Owner: Codex (task #3). The headline is a GOAL: always show metrics.goalsLabel with it.
export default function Metrics() {
  return (
    <section className="metrics section">
      <div className="container">
        <p className="badge">{metrics.goalsLabel}</p>
        <p><strong>{metrics.headline.value}</strong> {metrics.headline.text}</p>
      </div>
    </section>
  );
}
