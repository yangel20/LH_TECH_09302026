import { Link } from 'react-router-dom';
import { company, heroButtons, problem } from '../lib/company.js';
import './Hero.css';

// PLACEHOLDER. Owner: Codex (task #3). Replace freely; keep using the data from src/lib/company.js.
export default function Hero() {
  return (
    <section className="hero section">
      <div className="container">
        <h1>{company.slogan}</h1>
        <p>{company.description}</p>
        <p className="hero__actions">
          <a className="btn" href={heroButtons.primary.href}>{heroButtons.primary.label}</a>
          <Link className="btn btn--ghost" to={heroButtons.secondary.to}>{heroButtons.secondary.label}</Link>
        </p>
        <h2>{problem.title}</h2>
        {problem.text.map((t) => <p key={t}>{t}</p>)}
        <p>{problem.risksIntro}</p>
        <ul>
          {problem.risks.map((r) => <li key={r.title}><strong>{r.title}</strong>: {r.text}</li>)}
        </ul>
      </div>
    </section>
  );
}
