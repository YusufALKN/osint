import React, { useState } from 'react';
import { Badge } from './Badge';

export const CrawlJobs = ({ jobs }) => {
  const [openJobId, setOpenJobId] = useState(null);

  return (
    <div>
      {jobs.map((job) => {
        const progress = Math.round((job.pages / job.maxPages) * 100);
        const isOpen = openJobId === job.id;

        return (
          <div key={job.id} className="job-row">
            <div
              onClick={() => setOpenJobId(isOpen ? null : job.id)}
              className="job-header"
            >
              <div className="job-left">
                <Badge variant={job.status} />
                <span className="job-id">{job.id}</span>
                <span className="job-sources">{job.sources.join(', ')}</span>
              </div>

              <div className="job-right">
                <span className="job-progress">{progress}%</span>
                <span>{job.records} records</span>
              </div>
            </div>

            {isOpen && (
              <div className="job-detail">
                <div className="job-detail-meta">
                  Target pages: {job.pages}/{job.maxPages} · Errors: {job.errors}
                </div>
                {job.logs.map((log, idx) => (
                  <div key={idx} className="log-line">
                    <span className="log-level">[{log.level.toUpperCase()}]</span>
                    <span className="log-msg">{log.msg}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
