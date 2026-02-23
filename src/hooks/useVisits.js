import { useState, useCallback } from 'react';

const STORAGE_KEY = 'swiss-canton-visits';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useVisits() {
  const [visits, setVisits] = useState(load);

  const saveVisit = useCallback((cantonId, data) => {
    setVisits(prev => {
      const next = { ...prev, [cantonId]: { ...data } };
      save(next);
      return next;
    });
  }, []);

  const removeVisit = useCallback((cantonId) => {
    setVisits(prev => {
      const next = { ...prev };
      delete next[cantonId];
      save(next);
      return next;
    });
  }, []);

  const isVisited = useCallback((cantonId) => Boolean(visits[cantonId]), [visits]);

  return { visits, saveVisit, removeVisit, isVisited };
}
