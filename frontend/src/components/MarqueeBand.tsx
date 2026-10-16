import React from 'react';

export const MarqueeBand: React.FC = () => {
  return (
    <div className="marquee-band" aria-label="Avantra capabilities">
      <div className="marquee-track">
        <div className="marquee-item">
          <span>Built around you</span>
          <span>Simple solutions</span>
          <span>Strong results</span>
          <span>Built around you</span>
          <span>Simple solutions</span>
          <span>Strong results</span>
        </div>
        <div className="marquee-item" aria-hidden="true">
          <span>Built around you</span>
          <span>Simple solutions</span>
          <span>Strong results</span>
          <span>Built around you</span>
          <span>Simple solutions</span>
          <span>Strong results</span>
        </div>
      </div>
    </div>
  );
};
