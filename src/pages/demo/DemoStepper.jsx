import './DemoStepper.css';

// Progress through the 7 demo steps. Phones show "Step 3 of 7" + a bar; wider screens show every step.
export default function DemoStepper({ steps, current }) {
  const pct = ((current + 1) / steps.length) * 100;
  return (
    <nav className="stepper" aria-label="Demo progress">
      <p className="stepper__compact">
        Step {current + 1} of {steps.length} · <strong>{steps[current].label}</strong>
      </p>
      <div className="stepper__bar" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      <ol className="stepper__list">
        {steps.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'todo';
          return (
            <li key={s.key} className={`stepper__item stepper__item--${state}`} aria-current={i === current ? 'step' : undefined}>
              <span className="stepper__dot" aria-hidden="true">{i < current ? '✓' : i + 1}</span>
              <span className="stepper__label">{s.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
