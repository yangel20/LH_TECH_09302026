import { consultCopy as copy } from '../../lib/demoData.js';
import './Consultation.css';

// Step 5 (end of the demo for now): ask when the viewer can meet our data analyst and consultant.
// Nothing is sent; submitting just shows a simulated confirmation.
export default function Consultation({ days, slots, onToggle, format, onFormat, notes, onNotes, sent, email, error }) {
  if (sent) {
    const picked = days.flatMap((d) => copy.times.filter((t) => slots.includes(`${d.key} ${t}`)).map((t) => `${d.label}, ${t}`));
    return (
      <div className="consult consult--sent" role="status">
        <p className="consult__check" aria-hidden="true">✓</p>
        <h3 className="consult__sent-title">{copy.sentTitle}</h3>
        <p>{copy.sentText(email)}</p>
        <ul className="consult__picked">
          {picked.map((p) => <li key={p}>{p}</li>)}
          <li>{format}</li>
        </ul>
        <p className="consult__sim"><span className="badge badge--warning">Simulated</span> {copy.sentNote}</p>
      </div>
    );
  }

  return (
    <div className="consult">
      <p className="consult__text">{copy.text}</p>
      <ul className="consult__team">
        {copy.team.map((m) => (
          <li key={m.role} className="consult__member">
            <span className="consult__icon" aria-hidden="true">{m.role[0]}</span>
            <span><strong>{m.role}</strong><br />{m.does}</span>
          </li>
        ))}
      </ul>

      <fieldset className="consult__group">
        <legend>{copy.availabilityTitle}</legend>
        <p className="consult__help">{copy.availabilityText}</p>
        <div className="consult__grid-wrap">
          <table className="consult__grid">
            <thead>
              <tr><td />{days.map((d) => <th key={d.key} scope="col">{d.label}</th>)}</tr>
            </thead>
            <tbody>
              {copy.times.map((t) => (
                <tr key={t}>
                  <th scope="row">{t}</th>
                  {days.map((d) => {
                    const id = `${d.key} ${t}`;
                    const on = slots.includes(id);
                    return (
                      <td key={id}>
                        <button type="button" className={`consult__slot${on ? ' consult__slot--on' : ''}`}
                          aria-pressed={on} aria-label={`${d.label} at ${t}`} onClick={() => onToggle(id)}>
                          {on ? '✓' : ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && <p className="consult__error" role="alert">{error}</p>}
      </fieldset>

      <fieldset className="consult__group">
        <legend>{copy.formatTitle}</legend>
        <div className="consult__formats">
          {copy.formats.map((f) => (
            <label key={f} className={`consult__format${format === f ? ' consult__format--on' : ''}`}>
              <input type="radio" name="consult-format" value={f} checked={format === f} onChange={() => onFormat(f)} />
              {f}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="consult__notes">
        <label htmlFor="consult-notes">{copy.notesLabel} <span className="consult__optional">({copy.optional})</span></label>
        <textarea id="consult-notes" rows="3" value={notes} onChange={(e) => onNotes(e.target.value)} />
      </div>
    </div>
  );
}
