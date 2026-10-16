import React from 'react';

export const MarqueeBand: React.FC = () => {
  return (
    <div className="marquee-band" aria-label="Avantra capabilities">
      <div className="marquee-track">
        <div className="marquee-item">
          <span>Precision in the details</span>
          <span>Confidence in the outcome</span>
          <span>Built around your team</span>
          <span>Precision in the details</span>
          <span>Confidence in the outcome</span>
          <span>Built around your team</span>
        </div>
        <div className="marquee-item" aria-hidden="true">
          <span>Precision in the details</span>
          <span>Confidence in the outcome</span>
          <span>Built around your team</span>
          <span>Precision in the details</span>
          <span>Confidence in the outcome</span>
          <span>Built around your team</span>
        </div>
      </div>
    </div>
  );
};
