import { useMemo, useState } from 'react';
import { dashboardCopy as copy, buildDashboard } from '../../lib/dashboardData.js';
import CoverageChart from './CoverageChart.jsx';
import BrandRanking from './BrandRanking.jsx';
import PromptResults from './PromptResults.jsx';
import VisibilityMatrix from './VisibilityMatrix.jsx';
import './Dashboard.css';

// Step 4: a CRM-style AI visibility dashboard built from mock numbers (all simulated).
export default function Dashboard({ competitors, chosen }) {
  const [filter, setFilter] = useState('all');
  const activeIds = filter === 'all' ? chosen.map((m) => m.id) : [filter];
  const data = useMemo(() => buildDashboard(competitors, activeIds), [competitors, activeIds.join()]);
  const { niek } = data;
  const ringPct = Math.min(100, niek.coverage);

  return (
    <div className="dash">
      <div className="dash__top">
        <nav aria-label="Breadcrumb" className="dash__crumbs">
          {copy.breadcrumb.map((c, i) => (
            <span key={c}>{i > 0 && <span aria-hidden="true"> / </span>}{c}</span>
          ))}
        </nav>
        <span className="badge badge--warning">{copy.simulated}</span>
      </div>
      <div className="dash__brand">
        <span className="dash__logo" aria-hidden="true">N</span>
        <p className="dash__brand-name">Niek</p>
      </div>

      <div className="dash__filters">
        <span className="dash__chip">{copy.period}</span>
        <span className="dash__chip">{copy.region}</span>
        <div className="dash__tabs" role="group" aria-label="Filter by AI model">
          {[{ id: 'all', name: copy.allModels }, ...chosen].map((m) => (
            <button
              key={m.id}
              type="button"
              className={`dash__tab${filter === m.id ? ' dash__tab--on' : ''}`}
              aria-pressed={filter === m.id}
              onClick={() => setFilter(m.id)}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>
      <p className="dash__based">{copy.basedOn(activeIds.length)}</p>

      <div className="dash__kpis">
        <section className="dash__kpi">
          <h3>{copy.kpis.visibility}</h3>
          <div className="dash__ring-row">
            <svg className="dash__ring" viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="15.9" className="dash__ring-track" />
              <circle cx="18" cy="18" r="15.9" className="dash__ring-fill" strokeDasharray={`${ringPct} 100`} />
            </svg>
            <p className="dash__big">{niek.coverage}%</p>
          </div>
          <p className="dash__note">{copy.kpis.visibilityNote(niek.mentions, data.tests)}</p>
        </section>
        <section className="dash__kpi">
          <h3>{copy.kpis.mentions}</h3>
          <p className="dash__big">{niek.mentions}</p>
          <ul className="dash__vs">
            {data.topCompetitors.map((b) => (
              <li key={b.name}><span className={`dash__swatch dash__swatch--${b.slot}`} aria-hidden="true" />{b.name} <strong>{b.mentions}</strong></li>
            ))}
          </ul>
        </section>
        <section className="dash__kpi">
          <h3>{copy.kpis.position}</h3>
          <p className="dash__big">{niek.position}</p>
          <ul className="dash__vs">
            {data.bestPositions.map((b) => (
              <li key={b.name}><span className={`dash__swatch dash__swatch--${b.slot}`} aria-hidden="true" />{b.name} <strong>{b.position}</strong></li>
            ))}
          </ul>
          <p className="dash__note">{copy.kpis.positionNote}</p>
        </section>
        <section className="dash__kpi dash__kpi--alert">
          <h3>{copy.kpis.sentiment}</h3>
          <p className="dash__big">+{niek.sentiment}</p>
          <p className="dash__alert"><span aria-hidden="true">⚠</span> {copy.kpis.sentimentNote}</p>
        </section>
      </div>

      <CoverageChart days={data.days} series={data.series} />
      <div className="dash__split">
        <BrandRanking ranking={data.ranking} />
        <PromptResults prompts={data.prompts} />
      </div>
      <VisibilityMatrix brands={data.ranking} />
    </div>
  );
}
