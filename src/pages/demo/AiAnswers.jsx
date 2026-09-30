import { question, monitorCopy, scoreboard } from '../../lib/demoData.js';
import './AiAnswers.css';

// Steps 3 (Monitor) and 7 (Re-test): three simulated AI answers plus a "recommended in" scoreboard.
export default function AiAnswers({ answers, competitors, result, after = false }) {
  const scores = scoreboard(competitors, answers);
  return (
    <div className="answers">
      <div className="answers__question">
        <span className="answers__q-label">{monitorCopy.questionLabel}</span>
        <p>“{question}”</p>
      </div>

      <p className={`answers__result answers__result--${after ? 'good' : 'bad'}`}>{result}</p>

      <div className="answers__grid">
        {answers.map((a) => (
          <article key={a.assistant} className="answers__card" aria-label={a.assistant}>
            <header className="answers__head">
              <span className="answers__avatar" aria-hidden="true">{a.assistant.slice(-1)}</span>
              <h3>{a.assistant}</h3>
              <span className="badge badge--warning">Simulated</span>
            </header>
            <p className="answers__intro">{monitorCopy.intro}</p>
            <ol className="answers__items">
              {a.items.map((it) => (
                <li key={it.product} className={it.isClient ? 'answers__item answers__item--client' : 'answers__item'}>
                  <strong>{it.product}</strong> <span className="answers__price">${it.price}</span>
                  <span className="answers__blurb">{it.blurb}</span>
                </li>
              ))}
            </ol>
            {a.note && <p className="answers__note">{a.note}</p>}
          </article>
        ))}
      </div>

      <div className="answers__score">
        <h3 className="answers__score-title">{monitorCopy.scoreTitle}</h3>
        <ul className="answers__bars">
          {scores.map((s) => (
            <li key={s.brand} className={s.isClient ? 'answers__bar answers__bar--client' : 'answers__bar'}>
              <span className="answers__bar-name">{s.brand}</span>
              <span className="answers__bar-track" aria-hidden="true">
                <span style={{ width: `${(s.count / 3) * 100}%` }} />
              </span>
              <span className="answers__bar-count">{s.count} {monitorCopy.scoreOf}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
