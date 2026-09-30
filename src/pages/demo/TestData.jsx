import { useEffect, useRef, useState } from 'react';
import { testDataCopy, models, buildPrompts } from '../../lib/demoData.js';
import './TestData.css';

// Step 3: Nexo's internal AI "generates" synthetic shopper prompts (mock), then the viewer picks AI models.
export default function TestData({ productCount, competitors, generated, onGenerated, chosenIds, onToggleModel, error }) {
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const prompts = buildPrompts(competitors);

  function generate() {
    setLoading(true);
    timer.current = setTimeout(() => { setLoading(false); onGenerated(); }, 1500);
  }

  return (
    <div className="testdata">
      <p className="testdata__text">{testDataCopy.text}</p>
      <p className="testdata__from">{testDataCopy.builtFrom(productCount, competitors.length)}</p>

      {!generated && (
        <div className="testdata__generate">
          <button type="button" className="btn" onClick={generate} disabled={loading} aria-busy={loading}>
            {testDataCopy.generate}
          </button>
          {loading && (
            <p className="testdata__loading" role="status">
              <span className="testdata__spinner" aria-hidden="true" /> {testDataCopy.generating}
            </p>
          )}
        </div>
      )}

      {generated && (
        <div className="testdata__results">
          <div className="testdata__meta">
            <span className="badge badge--warning">{testDataCopy.generatedLabel}</span>
            <span className="testdata__showing">{testDataCopy.showing}</span>
          </div>
          <div className="testdata__table-wrap" tabIndex={0} role="region" aria-label={testDataCopy.showing}>
            <table className="testdata__table">
              <thead>
                <tr>{testDataCopy.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
              </thead>
              <tbody>
                {prompts.map((p, i) => (
                  <tr key={p.prompt} className={p.headline ? 'testdata__row--headline' : undefined}>
                    <td>{i + 1}</td>
                    <td>
                      “{p.prompt}”
                      {p.headline && <span className="badge badge--accent testdata__headline">{testDataCopy.headlineBadge}</span>}
                    </td>
                    <td>{p.type}</td>
                    <td>{p.persona}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <fieldset className="testdata__models" aria-describedby="models-help">
        <legend>{testDataCopy.modelsTitle}</legend>
        <p className="testdata__models-text" id="models-help">{testDataCopy.modelsText}</p>
        <div className="testdata__model-grid">
          {models.map((m) => {
            const on = chosenIds.includes(m.id);
            return (
              <label key={m.id} className={`testdata__model${on ? ' testdata__model--on' : ''}`}>
                <input type="checkbox" checked={on} onChange={() => onToggleModel(m.id)} />
                <span className="testdata__model-name">{m.name}</span>
                <span className="testdata__model-maker">{m.maker}</span>
              </label>
            );
          })}
        </div>
        <p className="testdata__disclaimer">{testDataCopy.modelsDisclaimer}</p>
        {generated && chosenIds.length > 0 && (
          <p className="testdata__summary">{testDataCopy.summary(chosenIds.length)}</p>
        )}
      </fieldset>
      {error && <p className="testdata__error" role="alert">{error}</p>}
    </div>
  );
}
