import React from 'react';

const phrases = [
  { text: 'Built around you', type: 'primary' },
  { text: 'Simple solutions', type: 'secondary' },
  { text: 'Strong results', type: 'accent' },
  { text: 'Built around you', type: 'primary' },
  { text: 'Simple solutions', type: 'secondary' },
  { text: 'Strong results', type: 'accent' },
];

export const MarqueeBand: React.FC = () => {
  const renderItem = (keyPrefix: string) => (
    <>
      {phrases.map((item, idx) => (
        <React.Fragment key={`${keyPrefix}-${idx}`}>
          <span className={`marquee-phrase marquee-phrase-${item.type}`}>
            {item.text}
          </span>
          <span className="marquee-divider" aria-hidden="true">✦</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div className="marquee-band relative z-10" aria-label="Avantra capabilities">
      <div className="marquee-track">
        <div className="marquee-item">
          {renderItem('item-1')}
        </div>
        <div className="marquee-item" aria-hidden="true">
          {renderItem('item-2')}
        </div>
      </div>
    </div>
  );
};
