// VerticalBar.js

import React, { useState, useEffect } from 'react';
import './VerticalBar.css';

const VerticalBar = ({ percentageA, percentageB, percentageC }) => {
  const [heightA, setHeightA] = useState(percentageA);
  const [heightB, setHeightB] = useState(percentageB);
  const [heightC, setHeightC] = useState(percentageC);

  useEffect(() => {
    // Update slice heights when percentages change
    setHeightA(percentageA);
    setHeightB(percentageB);
    setHeightC(percentageC);
  }, [percentageA, percentageB, percentageC]);

  return (
    <div className="vertical-bar">
      {/* Bars */}
      <div className="bar-slice" style={{ height: `${heightA}%`, backgroundColor: 'red' }}>
        <span className="bar-label">Control</span>
      </div>
      <div className="bar-slice" style={{ height: `${heightB}%`, backgroundColor: 'green'}}>
        <span className="bar-label">_L_</span>
      </div>
      <div className="bar-slice" style={{ height: `${heightC}%`, backgroundColor: 'blue' }}>
        <span className="bar-label">e_L_e</span>
      </div>
    </div>
  );
};

export default VerticalBar;