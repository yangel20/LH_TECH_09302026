import { useState } from 'react';
import { competitorsCopy, knownCompetitors } from '../../lib/demoData.js';
import './Competitors.css';

// Step 2: remove, add or pick suggested competitors (all fictional). The list drives the simulated answers.
export default function Competitors({ competitors, onAdd, onRemove }) {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const full = competitors.length >= competitorsCopy.max;
  const atMin = competitors.length <= competitorsCopy.min;
  const has = (n) => competitors.some((c) => c.name.toLowerCase() === n.trim().toLowerCase());
  const suggestions = knownCompetitors.filter((c) => !has(c.name));

  function add(n, w = '') {
    if (!n.trim()) return setError('Enter a competitor name.');
    if (has(n)) return setError(`${n.trim()} is already on the list.`);
    if (full) return setError(competitorsCopy.rules);
    onAdd(n, w);
    setName(''); setWebsite(''); setError('');
  }

  return (
    <div className="competitors">
      <p className="competitors__text">{competitorsCopy.text}</p>

      <ul className="competitors__list">
        {competitors.map((c) => (
          <li key={c.name} className="competitors__item">
            <span className="competitors__name">
              <strong>{c.name}</strong>
              {c.website && <span className="competitors__site">{c.website}</span>}
            </span>
            <button
              type="button"
              className="competitors__remove"
              onClick={() => onRemove(c.name)}
              disabled={atMin}
              aria-label={`${competitorsCopy.remove} ${c.name}`}
            >
              ✕ <span className="competitors__remove-text">{competitorsCopy.remove}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="competitors__count" aria-live="polite">
        {competitors.length} / {competitorsCopy.max} · {competitorsCopy.rules}
      </p>

      {suggestions.length > 0 && !full && (
        <div className="competitors__suggest">
          <p className="competitors__suggest-label">{competitorsCopy.suggestionsLabel}</p>
          <div className="competitors__chips">
            {suggestions.map((s) => (
              <button key={s.name} type="button" className="competitors__chip" onClick={() => add(s.name, s.website)}>
                + {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <form className="competitors__add" onSubmit={(e) => { e.preventDefault(); add(name, website); }} noValidate>
        <div className="competitors__field">
          <label htmlFor="comp-name">{competitorsCopy.nameLabel}</label>
          <input id="comp-name" value={name} onChange={(e) => setName(e.target.value)} disabled={full}
            aria-invalid={error ? 'true' : undefined} aria-describedby={error ? 'comp-error' : undefined} />
        </div>
        <div className="competitors__field">
          <label htmlFor="comp-site">{competitorsCopy.websiteLabel} <span className="competitors__optional">({competitorsCopy.optional})</span></label>
          <input id="comp-site" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={full} inputMode="url" />
        </div>
        <button type="submit" className="btn" disabled={full}>{competitorsCopy.add}</button>
      </form>
      {error && <p className="competitors__error" id="comp-error" role="alert">{error}</p>}
    </div>
  );
}
