import { analyzeCopy } from '../../lib/demoData.js';
import './Analyze.css';

// Step 4: compare what AI said against Niek's verified product data.
export default function Analyze() {
  return (
    <div className="analyze">
      <p className="analyze__lead">{analyzeCopy.lead}</p>
      <div className="analyze__table-wrap" tabIndex={0} role="region" aria-label={analyzeCopy.tableCaption}>
        <table className="analyze__table">
          <caption>{analyzeCopy.tableCaption}</caption>
          <thead>
            <tr>{analyzeCopy.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
          </thead>
          <tbody>
            {analyzeCopy.rows.map((r) => (
              <tr key={r.assistant}>
                <th scope="row">{r.assistant}</th>
                <td>{r.said}</td>
                <td>{r.verified}</td>
                <td><span className={`badge badge--${r.tone}`}>{r.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="analyze__risks-title">{analyzeCopy.risksTitle}</h3>
      <ul className="analyze__risks">
        {analyzeCopy.risks.map((r) => (
          <li key={r.title} className="analyze__risk"><strong>{r.title}</strong> ({r.text})</li>
        ))}
      </ul>
    </div>
  );
}
