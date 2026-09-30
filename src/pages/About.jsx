import Avatar from '../components/Avatar.jsx';
import CallToAction from '../sections/CallToAction.jsx';
import { story, founders, governance } from '../lib/company.js';
import './About.css';

export default function About() {
  return (
    <div className="about">
      <section className="about__story section" aria-labelledby="about-story-title">
        <div className="about__story-layout container">
          <h1 id="about-story-title" className="about__title">{story.title}</h1>
          <p className="about__story-text">{story.text}</p>
        </div>
      </section>

      <section className="about__team section" aria-labelledby="about-founders-title">
        <div className="container">
          <h2 id="about-founders-title" className="about__heading">{founders.title}</h2>
          <ul className="about__founders">
            {founders.people.map((person) => (
              <li key={person.name} className="about__founder card">
                <Avatar name={person.name} src={person.photo} size={120} />
                <h3 className="about__founder-name">{person.name}</h3>
                <p className="about__founder-title">{person.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about__governance section" aria-labelledby="about-governance-title">
        <div className="container">
          <h2 id="about-governance-title" className="about__heading">{governance.title}</h2>
          <ul className="about__principles">
            {governance.items.map((item) => (
              <li key={item.title} className="about__principle card">
                <h3 className="about__principle-title">{item.title}</h3>
                <p className="about__principle-text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CallToAction />
    </div>
  );
}
