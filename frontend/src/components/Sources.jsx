import React from 'react';

export const Sources = ({ sources, onToggle }) => (
  <div>
    {sources.map((src) => (
      <div key={src.id} className="source-row">
        <div className="source-left">
          <span className={`source-dot ${src.enabled ? 'on' : ''}`} />
          <div>
            <div className="source-name">{src.name}</div>
            <div className="source-domain">{src.domain}</div>
          </div>
        </div>

        <div className="source-right">
          <span className="source-pages">{src.pages} pages crawled</span>
          <button
            onClick={() => onToggle(src.id)}
            className={`link-btn ${src.enabled ? 'disable' : 'enable'}`}
          >
            [{src.enabled ? 'DISABLE' : 'ENABLE'}]
          </button>
        </div>
      </div>
    ))}
  </div>
);
