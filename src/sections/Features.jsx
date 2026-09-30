import './Features.css';

// PLACEHOLDER. Owner: Codex (task #4). Text comes from CONTENT.md.
const steps = ['Monitor', 'Analyze', 'Investigate', 'Optimize'];

export default function Features() {
  return (
    <section className="features section" id="how-it-works">
      <div className="container">
        <h2>How it works</h2>
        <ol className="features__grid">
          {steps.map((s) => (
            <li key={s} className="card"><strong>{s}</strong> <span className="todo">[TODO task #4]</span></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
