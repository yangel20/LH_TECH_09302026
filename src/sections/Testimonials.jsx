import { testimonials } from '../lib/company.js';
import './Testimonials.css';

// PLACEHOLDER. Owner: Codex (task #3). The disclaimer line must always be shown under the quotes.
export default function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        {testimonials.items.map((t) => (
          <figure key={t.name}>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption><strong>{t.name}</strong>, {t.role}</figcaption>
          </figure>
        ))}
        <p><small>{testimonials.disclaimer}</small></p>
      </div>
    </section>
  );
}
