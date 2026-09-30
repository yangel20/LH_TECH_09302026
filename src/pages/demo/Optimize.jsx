import { optimizeCopy } from '../../lib/demoData.js';
import './Optimize.css';

// Step 6: the recommended changes. Nothing moves on until a human approves.
export default function Optimize({ approved, onApprove }) {
  return (
    <div className="optimize">
      <h3 className="optimize__title">{optimizeCopy.changesTitle}</h3>
      <ol className="optimize__list">
        {optimizeCopy.changes.map((c) => (
          <li key={c.where} className="optimize__change">
            <p className="optimize__what"><strong>{c.where}:</strong> {c.what}</p>
            <div className="optimize__diff">
              <p className="optimize__before"><span>{optimizeCopy.beforeLabel}</span>{c.before}</p>
              <p className="optimize__after"><span>{optimizeCopy.afterLabel}</span>{c.after}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className={`optimize__approve${approved ? ' optimize__approve--done' : ''}`}>
        <p>{optimizeCopy.approvalNote}</p>
        {approved ? (
          <p className="optimize__approved" role="status">✓ {optimizeCopy.approved}</p>
        ) : (
          <button type="button" className="btn" onClick={onApprove}>{optimizeCopy.approve}</button>
        )}
      </div>
    </div>
  );
}
