import React from 'react';
import './Tabs.css';

const Tabs = ({ zones, activeZone, onTabClick }) => {
  return (
    <div className="tabs">
      {zones.map((zone) => (
        <button
          key={zone}
          className={`tab ${activeZone === zone ? 'active' : ''}`}
          onClick={() => onTabClick(zone)}
        >
          {zone}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
