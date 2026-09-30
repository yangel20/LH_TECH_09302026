import { investigateCopy, niekProduct } from '../../lib/demoData.js';
import './Investigate.css';

// Step 5: show Niek's product row with the missing word and the empty field highlighted.
export default function Investigate({ sample, usingSample }) {
  const row = sample?.rows.find((r) => r.sku === niekProduct.sku);
  const desc = row?.description ?? '';
  const i = desc.indexOf(investigateCopy.highlightPhrase);
  const description = i === -1 ? desc : (
    <>
      {desc.slice(0, i)}
      <mark>{investigateCopy.highlightPhrase}</mark>
      {desc.slice(i + investigateCopy.highlightPhrase.length)}
    </>
  );

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
                  {col === 'description' ? description
                    : row[col] || <em className="investigate__empty">{investigateCopy.emptyLabel}</em>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
