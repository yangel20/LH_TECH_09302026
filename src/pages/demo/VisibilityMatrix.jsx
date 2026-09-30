import { useState } from 'react';
import { dashboardCopy as copy } from '../../lib/dashboardData.js';
import './VisibilityMatrix.css';

const W = 900, H = 380, L = 44, R = 130, T = 20, B = 40;
const XMAX = 70, XMID = 30, YMID = 50;

const quadrant = (b) =>
  b.coverage >= XMID ? (b.buy >= YMID ? 'tr' : 'br') : (b.buy >= YMID ? 'tl' : 'bl');

// Quadrant scatter: coverage (x) vs likelihood to buy (y). Brands are labeled directly;
// Niek is highlighted. A table beside it lists the same numbers.
export default function VisibilityMatrix({ brands }) {
  const [hover, setHover] = useState(null);
  const x = (v) => L + (Math.min(v, XMAX) / XMAX) * (W - L - R);
  const y = (v) => T + (1 - v / 100) * (H - T - B);
  const q = copy.quadrants;

  // Label placement: to the right of each dot, nudged down until it doesn't overlap an earlier label.
  const placed = [];
  const labelY = {};
  [...brands].sort((a, b) => y(a.buy) - y(b.buy)).forEach((b) => {
    let ly = y(b.buy) + 4;
    const lx = x(b.coverage) + 10;
    while (placed.some((p) => Math.abs(p.y - ly) < 15 && Math.abs(p.x - lx) < 120)) ly += 15;
    placed.push({ x: lx, y: ly });
    labelY[b.name] = ly;
  });

  return (
    <section className="dash-panel matrix">
      <div className="dash-panel__head"><h3>{copy.matrixTitle}</h3></div>
      <div className="dash-panel__body matrix__body">
        <div className="matrix__scroll">
        <svg viewBox={`0 0 ${W} ${H}`} className="matrix__svg" role="img"
          aria-label={`${copy.matrixTitle}: ${copy.matrixX} against ${copy.matrixY}. The table next to it lists every value.`}>
          <line x1={x(XMID)} x2={x(XMID)} y1={T} y2={H - B} className="matrix__mid" />
          <line x1={L} x2={W - R} y1={y(YMID)} y2={y(YMID)} className="matrix__mid" />
          <line x1={L} x2={W - R} y1={H - B} y2={H - B} className="matrix__axis" />
          <line x1={L} x2={L} y1={T} y2={H - B} className="matrix__axis" />
          <text x={(L + x(XMID)) / 2} y={T + 12} className="matrix__q" textAnchor="middle">{q.tl}</text>
          <text x={(x(XMID) + W - R) / 2} y={T + 12} className="matrix__q" textAnchor="middle">{q.tr}</text>
          <text x={(L + x(XMID)) / 2} y={H - B - 8} className="matrix__q" textAnchor="middle">{q.bl}</text>
          <text x={(x(XMID) + W - R) / 2} y={H - B - 8} className="matrix__q" textAnchor="middle">{q.br}</text>
          {[0, 10, 20, 30, 40, 50, 60, 70].map((t) => (
            <text key={t} x={x(t)} y={H - B + 16} className="matrix__tick" textAnchor="middle">{t}</text>
          ))}
          {[0, 25, 50, 75, 100].map((t) => (
            <text key={t} x={L - 8} y={y(t) + 4} className="matrix__tick" textAnchor="end">{t}</text>
          ))}
          <text x={(L + W - R) / 2} y={H - 4} className="matrix__axis-label" textAnchor="middle">{copy.matrixX}</text>
          <text x={12} y={(T + H - B) / 2} className="matrix__axis-label" textAnchor="middle" transform={`rotate(-90 12 ${(T + H - B) / 2})`}>{copy.matrixY}</text>
          {brands.map((b) => (
            <g key={b.name} className={b.isClient ? 'matrix__pt matrix__pt--client' : 'matrix__pt'}
              onMouseEnter={() => setHover(b.name)} onMouseLeave={() => setHover(null)}>
              <circle cx={x(b.coverage)} cy={y(b.buy)} r="14" className="matrix__hit" />
              <circle cx={x(b.coverage)} cy={y(b.buy)} r={b.isClient ? 7 : 5.5} className="matrix__dot" />
              <text x={x(b.coverage) + 10} y={labelY[b.name]} className="matrix__label">{b.name}</text>
              {hover === b.name && (
                <text x={x(b.coverage) + 10} y={labelY[b.name] + 13} className="matrix__value">
                  {b.coverage}% · {b.buy}%
                </text>
              )}
            </g>
          ))}
        </svg>
        </div>
        <div className="matrix__table-wrap" tabIndex={0} role="region" aria-label={`${copy.matrixTitle} table`}>
          <table className="matrix__table">
            <thead><tr><th scope="col">Brand</th><th scope="col">Coverage</th><th scope="col">Likelihood to buy</th></tr></thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.name} className={b.isClient ? 'matrix__row--client' : undefined}>
                  <th scope="row">
                    {b.name} <span className={`matrix__badge matrix__badge--${quadrant(b)}`}>{q[quadrant(b)]}</span>
                  </th>
                  <td>{b.coverage}%</td>
                  <td>{b.buy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
