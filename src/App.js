// App.js

import React, { useState } from 'react';
import VerticalBar from './components/VerticalBar.js';
import WeightPopup from './components/WeightPopup.js';
import './index.css';

const App = () => {
  const [percentageControl, setPercentageControl] = useState(50);
  const [percentageB, setPercentageB] = useState(25);
  const [percentageC, setPercentageC] = useState(25);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupSubmit = (newPercentageB, newPercentageC, controlPercentage) => {
    console.log(`---- Report ---- ${Date. now()}`)
    setPercentageControl(controlPercentage);
    setPercentageB(newPercentageB);
    setPercentageC(newPercentageC);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
      <VerticalBar
        percentageA={percentageControl}
        percentageB={percentageB}
        percentageC={percentageC}
      />

      <div className="center-button">
        <button className="my-button" onClick={handlePopupOpen}>
          Set Weights
        </button>
      </div>

      <WeightPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        onSubmit={handlePopupSubmit}
      />
    </div>
    </div>
  );
};

export default App;
