import { useState } from 'react';
import Header from './components/Header';
import SwitzerlandMap from './components/SwitzerlandMap';
import CantonGrid from './components/CantonGrid';
import DetailPanel from './components/DetailPanel';
import { useVisits } from './hooks/useVisits';
import './App.css';

export default function App() {
  const { visits, saveVisit, removeVisit, isVisited } = useVisits();
  const [selectedCanton, setSelectedCanton] = useState(null);

  const visitedCount = Object.keys(visits).length;

  function handleSelect(id) {
    setSelectedCanton(prev => (prev === id ? null : id));
  }

  return (
    <div className="app-shell">
      <Header visitedCount={visitedCount} />

      <div className="app-body">
        <CantonGrid
          visits={visits}
          selectedCanton={selectedCanton}
          onSelect={handleSelect}
          isVisited={isVisited}
        />

        <main className="app-main">
          <SwitzerlandMap
            visits={visits}
            selectedCanton={selectedCanton}
            onSelect={handleSelect}
            isVisited={isVisited}
          />
        </main>

        <DetailPanel
          selectedCanton={selectedCanton}
          visits={visits}
          onSave={saveVisit}
          onRemove={removeVisit}
          isVisited={isVisited}
        />
      </div>
    </div>
  );
}
