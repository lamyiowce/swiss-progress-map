import './Header.css';

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Header({ visitedCount }) {
  const total = 26;
  const pct = visitedCount / total;
  const dashOffset = CIRCUMFERENCE * (1 - pct);

  return (
    <header className="app-header">
      <div className="header-title">
        <span className="header-flag">🇨🇭</span>
        <div>
          <h1>Swiss Canton Tracker</h1>
          <p className="header-sub">Track your journey through Switzerland</p>
        </div>
      </div>

      <div className="header-stats">
        <div className="visit-count">
          <span className="count-number">{visitedCount}</span>
          <span className="count-divider"> / </span>
          <span className="count-total">26</span>
          <span className="count-label">cantons visited</span>
        </div>

        <div className="progress-ring-wrap">
          <svg width="72" height="72" className="progress-ring">
            <circle
              cx="36" cy="36" r={RADIUS}
              className="ring-bg"
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="36" cy="36" r={RADIUS}
              className="ring-fill"
              strokeWidth="5"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
            />
          </svg>
          <span className="ring-pct">{Math.round(pct * 100)}%</span>
        </div>
      </div>
    </header>
  );
}
