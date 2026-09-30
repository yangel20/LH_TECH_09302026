import { NavLink, Link } from 'react-router-dom';
import { company } from '../lib/company.js';
import './Nav.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/mission', label: 'Mission' },
  { to: '/about', label: 'About Us' },
  { to: '/demo', label: 'Demo' },
];

export default function Nav() {
  return (
    <header className="nav">
      <a className="nav__skip" href="#main">Skip to content</a>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" aria-label={`${company.name} home`}>
          <picture>
            <source srcSet="/brand/nexo-logo-light.svg" media="(prefers-color-scheme: dark)" />
            <img src="/brand/nexo-logo.svg" alt={company.name} width="97" height="32" />
          </picture>
        </Link>
        <nav aria-label="Main">
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
