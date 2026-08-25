import React from 'react';

export const Topbar = ({ currentPage, onSelectPage, pages = [] }) => {
  return (
    <div className="topbar">
      <div className="brand">
        <span className="brand-mark" />
        <span className="brand-text">OSINT<span>/feed</span></span>
      </div>

      <nav className="topnav">
        {pages.map((item) => {
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`topnav-item ${active ? 'active' : ''}`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="topbar-status">v2.4.0 · <b>OK</b></div>
    </div>
  );
};
