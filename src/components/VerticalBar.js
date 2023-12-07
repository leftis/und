// VerticalBar.js

import React, { useState, useEffect } from 'react';
import './VerticalBar.css';

const VerticalBar = ({ percentageA, percentageB, percentageC }) => {
  const [controlHeight, setControlHeight] = useState(percentageA);
  const [messageHeight, setMessageHeight] = useState(percentageB);
  const [eHeight, seteHeight] = useState(percentageC);

  useEffect(() => {
    // Update slice heights when percentages change
    setControlHeight(percentageA);
    setMessageHeight(percentageB);
    seteHeight(percentageC);
  }, [percentageA, percentageB, percentageC]);

  return (
    <div className="vertical-bar">
      <div
        className="bar-slice"
        style={{ height: `${controlHeight}%`, backgroundColor: 'purple' }}>
        <span className="bar-label">Control - {controlHeight}% </span>
      </div>

      <div
        className="bar-slice"
        style={{ height: `${messageHeight}%`, backgroundColor: 'green'}}>
        <span className="bar-label">Persado - {messageHeight}%</span>
      </div>

      <div
        className="bar-slice"
        style={{ height: `${eHeight}%`, backgroundColor: 'blue' }}
      >
        <span className="bar-label">Persado E - {eHeight}%</span>
      </div>
    </div>
  );
};

export default VerticalBar;