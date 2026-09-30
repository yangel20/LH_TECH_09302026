import './DemoNav.css';

export default function DemoNav({ showBack, backLabel, nextLabel, onBack, onNext, nextDisabled }) {
  return (
    <div className="demo-nav">
      {showBack && (
        <button type="button" className="btn btn--ghost" onClick={onBack}>← {backLabel}</button>
      )}
      <button type="button" className="btn demo-nav__next" onClick={onNext} disabled={nextDisabled}>
        {nextLabel} <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
