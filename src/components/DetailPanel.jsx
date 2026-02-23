import { useState, useEffect } from 'react';
import { CANTONS, REGIONS, CANTON_MAP, getRegionCantons } from '../data/cantons';
import './DetailPanel.css';

function RegionProgress({ visits, isVisited }) {
  return (
    <div className="region-progress">
      <h3 className="section-title">Region Progress</h3>
      {Object.entries(REGIONS).map(([key, region]) => {
        const cantons = getRegionCantons(key);
        const visited = cantons.filter(c => isVisited(c.id)).length;
        const total = cantons.length;
        const pct = (visited / total) * 100;
        return (
          <div key={key} className="region-row">
            <div className="region-row-header">
              <span className="region-name" style={{ color: region.color }}>{region.label}</span>
              <span className="region-fraction">{visited}/{total}</span>
            </div>
            <div className="region-bar-bg">
              <div
                className="region-bar-fill"
                style={{ width: `${pct}%`, background: region.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DetailPanel({ selectedCanton, visits, onSave, onRemove, isVisited }) {
  const canton = selectedCanton ? CANTON_MAP[selectedCanton] : null;
  const region = canton ? REGIONS[canton.region] : null;
  const visit = canton ? (visits[canton.id] || {}) : {};

  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [notes, setNotes] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (canton) {
      setDate(visit.date || '');
      setPlace(visit.place || '');
      setNotes(visit.notes || '');
    }
  }, [selectedCanton, visits]);

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }

  function handleSave() {
    onSave(canton.id, { date, place, notes });
    showToast(`${canton.name} marked as visited!`);
  }

  function handleRemove() {
    onRemove(canton.id);
    showToast(`${canton.name} removed from visited.`, 'warn');
  }

  const visited = canton && isVisited(canton.id);

  return (
    <aside className="detail-panel">
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}

      {canton ? (
        <div className="detail-content">
          <div className="detail-header" style={{ borderLeftColor: region.color }}>
            <div>
              <span className="detail-abbr" style={{ color: region.color }}>{canton.id}</span>
              <h2 className="detail-name">{canton.name}</h2>
            </div>
            <div className="detail-meta">
              <span className="detail-region" style={{ background: `${region.color}22`, color: region.color }}>
                {region.label}
              </span>
              <span className="detail-capital">🏛 {canton.capital}</span>
            </div>
          </div>

          <div className="detail-form">
            <label className="form-label">
              Date Visited
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </label>

            <label className="form-label">
              Place / Highlight
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Zürich Old Town…"
                value={place}
                onChange={e => setPlace(e.target.value)}
              />
            </label>

            <label className="form-label">
              Notes & Memories
              <textarea
                className="form-input form-textarea"
                placeholder="What did you see, eat, feel…"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={4}
              />
            </label>

            <div className="form-actions">
              <button
                className="btn-primary"
                style={{ '--btn-color': region.color }}
                onClick={handleSave}
              >
                {visited ? 'Update Visit' : 'Mark Visited'}
              </button>
              {visited && (
                <button className="btn-danger" onClick={handleRemove}>
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="detail-empty">
          <div className="empty-icon">🗺</div>
          <p>Click a canton on the map<br />or in the list to view details</p>
        </div>
      )}

      <RegionProgress visits={visits} isVisited={isVisited} />
    </aside>
  );
}
