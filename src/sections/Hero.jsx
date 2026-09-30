import { Link } from 'react-router-dom';
import './Hero.css';

// PLACEHOLDER. Owner: Codex (task #3). Text comes from CONTENT.md.
export default function Hero() {
  return (
    <section className="hero section">
      <div className="container">
        <h1>Nexo helps brands get recommended, and described accurately, by AI shopping assistants.</h1>
        <p><span className="todo">[TODO task #3: problem statement + visual]</span></p>
        <Link className="btn" to="/demo">Try the demo</Link>
      </div>
    </section>
  );
}
