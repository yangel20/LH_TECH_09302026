import { NavLink, Link } from 'react-router-dom';
import './Nav.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/demo', label: 'Demo' },
  { to: '/about', label: 'About' },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">Nexo</Link>
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
