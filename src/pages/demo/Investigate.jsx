import { investigateCopy, niekProduct } from '../../lib/demoData.js';
import './Investigate.css';

// Step 5: show Niek's product row with the missing word and the empty field highlighted.
export default function Investigate({ sample, usingSample }) {
  const row = sample?.rows.find((r) => r.sku === niekProduct.sku);
  const phrase = investigateCopy.highlightPhrase.toLowerCase();

  // Wrap every case-insensitive match of the phrase in <mark>.
  const highlight = (text) => {
    const parts = [];
    let rest = text;
    let i = rest.toLowerCase().indexOf(phrase);
    while (i !== -1) {
      parts.push(rest.slice(0, i), <mark key={parts.length}>{rest.slice(i, i + phrase.length)}</mark>);
      rest = rest.slice(i + phrase.length);
      i = rest.toLowerCase().indexOf(phrase);
    }
    parts.push(rest);
    return parts;
  };

  return (
    <div className="investigate">
      <p className="investigate__lead">{investigateCopy.lead}</p>
      {!usingSample && <p className="investigate__note">{investigateCopy.sampleNote}</p>}
      {row && (
        <div className="investigate__row">
          <p className="investigate__row-label">{investigateCopy.rowLabel}</p>
          <dl className="investigate__fields">
            {sample.columns.map((col) => (
              <div key={col} className={col === investigateCopy.emptyField ? 'investigate__field investigate__field--flag' : 'investigate__field'}>
                <dt>{col}</dt>
                <dd>
                  {row[col] ? highlight(row[col]) : <em className="investigate__empty">{investigateCopy.emptyLabel}</em>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
