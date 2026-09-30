import { mission, vision, values, metrics } from '../lib/company.js';
import './Mission.css';

export default function Mission() {
  return (
    <div className="mission">
      <section className="section mission__purpose" aria-labelledby="mission-title">
        <div className="container mission__purpose-grid">
          <div className="mission__statement">
            <h1 id="mission-title" className="mission__title">Mission</h1>
            <p className="mission__lead">{mission}</p>
          </div>
          <div className="card mission__vision">
            <h2>Vision</h2>
            <p>{vision}</p>
          </div>
        </div>
      </section>

      <section className="section mission__values" aria-labelledby="mission-values">
        <div className="container">
          <h2 id="mission-values" className="mission__heading">Values</h2>
          <ul className="mission__values-grid">
            {values.map((value) => (
              <li className="card mission__value" key={value.title}>
                <span className="mission__value-mark" aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section mission__metrics" aria-labelledby="mission-metrics">
        <div className="container">
          <h2 id="mission-metrics" className="mission__heading">Metrics</h2>
          <div className="mission__goals" role="group" aria-labelledby="mission-goals">
            <h3 id="mission-goals" className="mission__goals-label">{metrics.goalsLabel}</h3>
            <div className="mission__headline">
              <p className="mission__headline-number">{metrics.headline.value}</p>
              <p className="mission__headline-text">{metrics.headline.text}</p>
            </div>
            <ul className="mission__goals-grid">
              {metrics.goals.map((goal) => (
                <li className="mission__goal" key={goal.text}>
                  <p className="mission__number">{goal.value}</p>
                  <p>{goal.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mission__process" role="group" aria-labelledby="mission-process">
            <h3 id="mission-process" className="mission__heading">{metrics.processLabel}</h3>
            <ul className="mission__process-grid">
              {metrics.process.map((fact) => (
                <li className="card mission__fact" key={fact.text}>
                  <p className="mission__number mission__number--process">{fact.value}</p>
                  <p>{fact.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
