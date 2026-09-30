import Avatar from '../components/Avatar.jsx';
import CallToAction from '../sections/CallToAction.jsx';
import { story, founders, governance } from '../lib/company.js';
import './About.css';

// PLACEHOLDER. Owner: Codex (task #6). Replace freely; keep using the data from src/lib/company.js
// and <Avatar> for founder photos (it shows initials if a photo is missing).
export default function About() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1>{story.title}</h1>
          <p>{story.text}</p>
          <h2>{founders.title}</h2>
          <ul className="about__founders">
            {founders.people.map((p) => (
              <li key={p.name} className="about__founder">
                <Avatar name={p.name} src={p.photo} size={96} />
                <p className="about__founder-text"><strong>{p.name}</strong><br />{p.title}</p>
              </li>
            ))}
          </ul>
          <h2>{governance.title}</h2>
          <ul>
            {governance.items.map((g) => <li key={g.title}><strong>{g.title}</strong>: {g.text}</li>)}
          </ul>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
