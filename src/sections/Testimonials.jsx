import { testimonials } from '../lib/company.js';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="testimonials section" aria-describedby="testimonials-disclaimer">
      <div className="container">
        <div className="testimonials__grid">
          {testimonials.items.map((item) => (
            <figure className="testimonials__quote card" key={item.name}>
              <span className="testimonials__mark" aria-hidden="true">“</span>
              <blockquote>{item.quote}</blockquote>
              <figcaption className="testimonials__author">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="testimonials__disclaimer" id="testimonials-disclaimer"><small>{testimonials.disclaimer}</small></p>
      </div>
    </section>
  );
}
