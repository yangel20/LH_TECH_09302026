import { dashboardCopy as copy } from '../../lib/dashboardData.js';
import './BrandRanking.css';

// Table of every brand by mentions (also the table view for the charts).
export default function BrandRanking({ ranking }) {
  return (
    <section className="dash-panel ranking">
      <div className="dash-panel__head"><h3>{copy.rankingTitle}</h3></div>
      <div className="ranking__wrap" tabIndex={0} role="region" aria-label={copy.rankingTitle}>
        <table className="ranking__table">
          <thead><tr>{copy.rankingCols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
          <tbody>
            {ranking.map((b, i) => (
              <tr key={b.name} className={b.isClient ? 'ranking__row--client' : undefined}>
                <td>{i + 1}</td>
                <th scope="row">
                  <span className={`dash__swatch dash__swatch--${b.slot}`} aria-hidden="true" /> {b.name}
                </th>
                <td><span className={`ranking__sent${b.sentiment < 30 ? ' ranking__sent--low' : ''}`}>+{b.sentiment}</span></td>
                <td>{b.mentions}</td>
                <td>{b.coverage}%</td>
                <td>{b.share}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
