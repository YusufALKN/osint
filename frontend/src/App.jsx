import React, { useState } from 'react';
import { Topbar } from './components/Topbar';
import { Dashboard } from './components/Dashboard';
import { Advisories } from './components/Advisories';
import { Sources } from './components/Sources';
import { CrawlJobs } from './components/CrawlJobs';
import { INITIAL_SOURCES, INITIAL_ADVISORIES, INITIAL_JOBS, NAV_PAGES } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sources, setSources] = useState(INITIAL_SOURCES);

  const handleToggleSource = (id) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const activeNav = NAV_PAGES.find((p) => p.id === currentPage);

  return (
    <div>
      <Topbar currentPage={currentPage} onSelectPage={setCurrentPage} pages={NAV_PAGES} />

      <main className="main">
        <h1 className="page-title">{activeNav?.label}</h1>
        <p className="page-sub">Real-time threat monitoring and crawler feed orchestrator</p>

        {currentPage === 'dashboard' && (
          <Dashboard advisories={INITIAL_ADVISORIES} sources={sources} jobs={INITIAL_JOBS} />
        )}
        {currentPage === 'advisories' && <Advisories advisories={INITIAL_ADVISORIES} />}
        {currentPage === 'sources' && <Sources sources={sources} onToggle={handleToggleSource} />}
        {currentPage === 'jobs' && <CrawlJobs jobs={INITIAL_JOBS} />}
      </main>
    </div>
  );
}
