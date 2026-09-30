import { mission, vision, values, metrics } from '../lib/company.js';
import './Mission.css';

// PLACEHOLDER. Owner: Codex (task #4). Replace freely; keep using the data from src/lib/company.js.
// Goals must carry metrics.goalsLabel; process facts may be shown without it.
export default function Mission() {
  return (
    <section className="section">
      <div className="container">
        <h1>Mission</h1>
        <p>{mission}</p>
        <h2>Vision</h2>
        <p>{vision}</p>
        <h2>Values</h2>
        <ul>
          {values.map((v) => <li key={v.title}><strong>{v.title}</strong>: {v.text}</li>)}
        </ul>
        <h2>Metrics</h2>
        <p className="badge">{metrics.goalsLabel}</p>
        <ul>
          {[metrics.headline, ...metrics.goals].map((m) => <li key={m.text}><strong>{m.value}</strong> {m.text}</li>)}
        </ul>
        <h3>{metrics.processLabel}</h3>
        <ul>
          {metrics.process.map((m) => <li key={m.text}><strong>{m.value}</strong> {m.text}</li>)}
        </ul>
      </div>
    </section>
  );
}
