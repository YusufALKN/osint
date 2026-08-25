import React, { useState, useMemo } from 'react';
import { Badge } from './Badge';

export const Advisories = ({ advisories }) => {
  const [query, setQuery] = useState('');
  const [sevFilter, setSevFilter] = useState('');

  const filtered = useMemo(() => {
    return advisories.filter((a) => {
      const matchSev = !sevFilter || a.severity === sevFilter;
      const q = query.toLowerCase();
      const matchQuery = !q || a.title.toLowerCase().includes(q) || a.cve.toLowerCase().includes(q);
      return matchSev && matchQuery;
    });
  }, [advisories, query, sevFilter]);

  return (
    <div>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by CVE identifier or keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sevFilter} onChange={(e) => setSevFilter(e.target.value)}>
          <option value="">All severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {filtered.length === 0 && (
        <div className="feed-meta" style={{ padding: '18px 0' }}>No advisories match this filter.</div>
      )}

      {filtered.map((adv) => (
        <div key={adv.id} className="feed-item">
          <span className="feed-tag"><Badge variant={adv.severity} /></span>
          <div className="feed-body">
            <div className="feed-title">{adv.title}</div>
            <div className="feed-meta">{adv.cve} · {adv.source} · {adv.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
