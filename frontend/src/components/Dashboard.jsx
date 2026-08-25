import React from 'react';
import { Badge } from './Badge';

export const Dashboard = ({ advisories, sources, jobs }) => {
  const criticalCount = advisories.filter((a) => a.severity === 'critical').length;
  const activeSources = sources.filter((s) => s.enabled).length;
  const runningJobs = jobs.filter((j) => j.status === 'running').length;

  return (
    <div>
      <div className="status-line">
        <span><b>{advisories.length}</b> advisories</span>
        <span className="sep">·</span>
        <span className="crit">{criticalCount} critical</span>
        <span className="sep">·</span>
        <span><b>{activeSources}/{sources.length}</b> sources active</span>
        <span className="sep">·</span>
        <span className="run">{runningJobs} job{runningJobs === 1 ? '' : 's'} running</span>
      </div>

      <div className="section-label">Recent advisories</div>
      {advisories.slice(0, 6).map((adv) => (
        <div key={adv.id} className="feed-item">
          <span className="feed-tag"><Badge variant={adv.severity} /></span>
          <div className="feed-body">
            <div className="feed-title">{adv.title}</div>
            <div className="feed-meta">{adv.cve} · {adv.source}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
