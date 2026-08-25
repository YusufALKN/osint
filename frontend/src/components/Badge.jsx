import React from 'react';

const ABBR = {
  critical: 'CRIT',
  high: 'HIGH',
  medium: 'MED',
  low: 'LOW',
  running: 'RUN',
  completed: 'DONE',
  stopped: 'STOP',
  failed: 'FAIL',
  queued: 'QUEUE',
};

export const Badge = ({ variant = 'low', children }) => {
  const key = String(variant).toLowerCase();
  const label = ABBR[key] || String(children ?? key).toUpperCase();
  return <span className={`tag tag-${key}`}>[{label}]</span>;
};
