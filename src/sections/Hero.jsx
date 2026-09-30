import { Link } from 'react-router-dom';
import { company, heroButtons, problem } from '../lib/company.js';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__intro">
          <p className="badge badge--accent hero__brand">{company.name}</p>
          <h1 id="hero-title" className="hero__title">{company.slogan}</h1>
          <p className="hero__description">{company.description}</p>
          <div className="hero__actions">
            <Link className="btn" to={heroButtons.primary.href} onClick={() => document.getElementById('how-it-works')?.scrollIntoView()}>{heroButtons.primary.label}<span aria-hidden="true"> ↓</span></Link>
            <Link className="btn btn--ghost" to={heroButtons.secondary.to}>{heroButtons.secondary.label}</Link>
          </div>
        </div>
        <div className="hero__problem">
          <div className="hero__context">
            <h2>{problem.title}</h2>
            {problem.text.map((text) => <p key={text}>{text}</p>)}
          </div>
          <div className="hero__risks">
            <p className="hero__risks-label">{problem.risksIntro}</p>
            <ul className="hero__risk-list">
              {problem.risks.map((risk) => (
                <li className="hero__risk card" key={risk.title}>
                  <span className="hero__risk-marker" aria-hidden="true" />
                  <h3>{risk.title}</h3>
                  <p>{risk.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
