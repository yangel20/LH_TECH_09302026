import { company } from '../lib/company.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <picture>
          <source srcSet="/brand/nexo-icon-light.svg" media="(prefers-color-scheme: dark)" />
          <img className="footer__icon" src="/brand/nexo-icon.svg" alt="" width="24" height="24" />
        </picture>
        <p className="footer__text">{company.footer}</p>
      </div>
    </footer>
  );
}
