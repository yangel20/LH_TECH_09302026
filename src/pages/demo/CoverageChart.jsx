import { useState } from 'react';
import { dashboardCopy as copy } from '../../lib/dashboardData.js';
import './CoverageChart.css';

const W = 960, H = 300, L = 40, R = 90, T = 12, B = 28;

// Line chart: % of AI answers mentioning each brand over 14 days. Legend toggles series;
// hover or arrow keys move a crosshair with a tooltip.
export default function CoverageChart({ days, series }) {
  const [hidden, setHidden] = useState([]);
  const [hover, setHover] = useState(null);
  const shown = series.filter((s) => !hidden.includes(s.name));
  const max = Math.max(10, Math.ceil(Math.max(...series.flatMap((s) => s.values)) / 10) * 10);
  const x = (i) => L + (i * (W - L - R)) / (days.length - 1);
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const ticks = [0, max / 2, max];

  function pick(evt) {
    const box = evt.currentTarget.getBoundingClientRect();
    const px = ((evt.clientX - box.left) / box.width) * W;
    const i = Math.round(((px - L) / (W - L - R)) * (days.length - 1));
    setHover(Math.max(0, Math.min(days.length - 1, i)));
  }
  function key(evt) {
    if (evt.key === 'ArrowRight') setHover((h) => Math.min(days.length - 1, (h ?? -1) + 1));
    if (evt.key === 'ArrowLeft') setHover((h) => Math.max(0, (h ?? days.length) - 1));
    if (evt.key === 'Escape') setHover(null);
  }

  const tipRows = hover === null ? [] : [...shown].sort((a, b) => b.values[hover] - a.values[hover]);
  const tipLeft = hover === null ? 0 : (x(hover) / W) * 100;

  return (
    <section className="dash-panel coverage">
      <div className="dash-panel__head">
        <h3>{copy.coverageTitle}</h3>
        <p>{copy.coverageNote}</p>
      </div>
      <div className="dash-panel__body">
        <div className="coverage__plot">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="coverage__svg"
            role="img"
            aria-label={`${copy.coverageTitle}. Use left and right arrow keys to read values by day.`}
            tabIndex={0}
            onMouseMove={pick}
            onMouseLeave={() => setHover(null)}
            onKeyDown={key}
            onBlur={() => setHover(null)}
          >
            {ticks.map((t) => (
              <g key={t}>
                <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="coverage__grid" />
                <text x={L - 8} y={y(t) + 4} className="coverage__tick" textAnchor="end">{t}</text>
              </g>
            ))}
            {days.map((d, i) => (days.length - 1 - i) % 3 === 0 && (
              <text key={d} x={x(i)} y={H - 8} className="coverage__tick" textAnchor="middle">{d}</text>
            ))}
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} className="coverage__cross" />}
            {shown.map((s) => (
              <g key={s.name} className={`coverage__series coverage__series--${s.slot}`}>
                <polyline points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ')} className="coverage__line" />
                {hover !== null && <circle cx={x(hover)} cy={y(s.values[hover])} r="4.5" className="coverage__dot" />}
                {s.isClient && (
                  <text x={x(days.length - 1) + 8} y={y(s.values[days.length - 1]) + 4} className="coverage__label">
                    {s.name} {s.values[days.length - 1]}%
                  </text>
                )}
              </g>
            ))}
          </svg>
          {hover !== null && (
            <div className="coverage__tip" style={{ left: `${tipLeft}%` }} role="status">
              <p className="coverage__tip-day">{days[hover]}</p>
              {tipRows.map((s) => (
                <p key={s.name} className="coverage__tip-row">
                  <span className={`dash__swatch dash__swatch--${s.slot}`} aria-hidden="true" />
                  {s.name}<strong>{s.values[hover]}%</strong>
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="coverage__legend" role="group" aria-label="Show or hide brands">
          {series.map((s) => {
            const on = !hidden.includes(s.name);
            return (
              <button
                key={s.name}
                type="button"
                className={`coverage__key${on ? '' : ' coverage__key--off'}`}
                aria-pressed={on}
                onClick={() => setHidden((h) => (on ? [...h, s.name] : h.filter((n) => n !== s.name)))}
              >
                <span className={`dash__swatch dash__swatch--${s.slot}`} aria-hidden="true" />
                {s.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
