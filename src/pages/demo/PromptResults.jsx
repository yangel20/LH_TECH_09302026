import { dashboardCopy as copy } from '../../lib/dashboardData.js';
import './PromptResults.css';

// Per-prompt result for Niek: mentioned, not mentioned, or mentioned with a wrong claim.
export default function PromptResults({ prompts }) {
  const label = { yes: copy.mentioned, no: copy.notMentioned, wrong: copy.inaccurate };
  const icon = { yes: '✓', no: '✕', wrong: '!' };
  return (
    <section className="dash-panel prompts">
      <div className="dash-panel__head">
        <h3>{copy.promptsTitle}</h3>
        <p>{copy.promptsNote}</p>
      </div>
      <ul className="prompts__list">
        {prompts.map((p) => (
          <li key={p.prompt} className={`prompts__item${p.headline ? ' prompts__item--headline' : ''}`}>
            <div className="prompts__main">
              <p className="prompts__q">{p.prompt}</p>
              <p className="prompts__meta">
                {p.position && <span>{copy.position} {p.position}</span>}
                <span>{p.branded ? copy.branded : copy.nonBranded}</span>
                <span>{copy.sources(p.sources)}</span>
              </p>
            </div>
            <span className={`prompts__status prompts__status--${p.status}`}>
              <span aria-hidden="true">{icon[p.status]}</span> {label[p.status]}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
