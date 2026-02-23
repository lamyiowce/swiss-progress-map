import { useState } from 'react';
import { CANTONS, REGIONS } from '../data/cantons';
import './CantonGrid.css';

const TABS = [{ key: 'all', label: 'All' }, ...Object.entries(REGIONS).map(([k, v]) => ({ key: k, label: v.label }))];

export default function CantonGrid({ visits, selectedCanton, onSelect, isVisited }) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all' ? CANTONS : CANTONS.filter(c => c.region === activeTab);

  return (
    <aside className="canton-grid-panel">
      <div className="grid-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`grid-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            style={activeTab === tab.key && tab.key !== 'all'
              ? { borderBottomColor: REGIONS[tab.key]?.color, color: REGIONS[tab.key]?.color }
              : {}
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="canton-cards">
        {filtered.map(canton => {
          const visited = isVisited(canton.id);
          const visit = visits[canton.id];
          const color = REGIONS[canton.region].color;
          const selected = selectedCanton === canton.id;

          return (
            <button
              key={canton.id}
              className={`canton-card ${visited ? 'visited' : 'unvisited'} ${selected ? 'selected' : ''}`}
              style={visited || selected ? { '--accent': color } : {}}
              onClick={() => onSelect(canton.id)}
            >
              <div className="card-header">
                <span className="card-abbr">{canton.id}</span>
                {visited && <span className="card-dot" style={{ background: color }} />}
              </div>
              <div className="card-name">{canton.name}</div>
              {visited && visit?.place && (
                <div className="card-place">📍 {visit.place}</div>
              )}
              {visited && visit?.date && (
                <div className="card-date">{visit.date}</div>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
