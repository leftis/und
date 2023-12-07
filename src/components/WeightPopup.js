// WeightPopup.js

import React, { useState } from 'react';
import './WeightPopup.css';

const WeightPopup = ({ isOpen, onClose, onSubmit, handleLog }) => {
  const [previousRanges, setPreviousRanges] = useState(null);

  const [weightB, setWeightB] = useState('50');
  const [weightC, setWeightC] = useState('50');

  const handleSubmit = () => {
    // Convert input values to numbers
    const newWeightB = parseFloat(weightB);
    const newWeightC = parseFloat(weightC);

    // Ensure the sum is 100 or less (Control is always 50)
    const totalWeight = newWeightB + newWeightC;
    if (totalWeight <= 100) {
      // Calculate new heights based on submitted weights (normalized to 50%)
      const normalizedWeightB = (newWeightB / 100) * 50;
      const normalizedWeightC = (newWeightC / 100) * 50;

      // Round the values to two decimal places
      const roundedWeightB = parseFloat(normalizedWeightB.toFixed(2));
      const roundedWeightC = parseFloat(normalizedWeightC.toFixed(2));
      const roundedWeightControl = 100 - (roundedWeightB + roundedWeightC);

      onSubmit(roundedWeightB, roundedWeightC, roundedWeightControl);
      logBarRanges(roundedWeightB, roundedWeightC, roundedWeightControl);

      onClose();
    } else {
      // Show an error or handle the case where the total exceeds 100%
      alert("Total weights cannot exceed 100%.");
    }
  };

 const logBarRanges = (percentageL, percentageE_L, percentageControl) => {
    const totalSlices = 10000;
    const slicesControl = Math.round((percentageControl / 100) * totalSlices);
    const slicesL = Math.round((percentageL / 100) * totalSlices);
    const slicesE_L = Math.round((percentageE_L / 100) * totalSlices);

    const endControl = slicesControl - 1;
    const endL = slicesControl + slicesL - 1;
    const endE_L = slicesControl + slicesL + slicesE_L - 1;

    // Log the latest ranges
    // console.log(`Latest Ranges: Control (0-${endControl}), L (${slicesControl}-${endL}), e_L (${slicesControl + slicesL}-${endE_L})`);
    handleLog(`Latest Ranges: Control (0-${endControl}), L (${slicesControl}-${endL}), e_L (${slicesControl + slicesL}-${endE_L})`)

    // If there are previous ranges, compare with the latest ranges
    if (previousRanges) {
      compareRanges(previousRanges, {
        control: [0, endControl],
        L: [slicesControl, endL],
        e_L: [slicesControl + slicesL, endE_L],
      });
    }

    // Update the previous ranges
    setPreviousRanges({
      control: [0, endControl],
      L: [slicesControl, endL],
      e_L: [slicesControl + slicesL, endE_L],
    });
  };
Array.range = function(min, max){
    return this.apply(null, this(max - min + 1)).map(function (i,j) {
        return j + min;
    });
};
  // Function to compare the ranges
const compareRanges = (previous, current) => {
  Object.keys(current).forEach((bar) => {
    const prevRange = previous[bar];
    const currentRange = current[bar];

    if (prevRange[0] === currentRange[0] && prevRange[1] === currentRange[1]) {
      handleLog(`Nothing changed for ${bar}`)
      // console.log(`Nothing changed for ${bar}`);
    } else {
      const overlap = calculateOverlap(prevRange, currentRange);
      if (overlap > 0) {
        handleLog(`${overlap} are going to get switched to ${bar}`);
        // console.log(`${overlap} are going to get switched to ${bar}`);
      }
    }
  });
};

// Function to calculate the overlap between two ranges
const calculateOverlap = (prevRange, nextRange) => {
  const [prRaArStart, prRaArEnd] = prevRange;
  const previousArr = Array.range(prRaArStart, prRaArEnd);

  const [neRaArStart, neRaArEnd] = nextRange;
  const nextArr = Array.range(neRaArStart, neRaArEnd);

  handleLog({prev: previousArr, next: nextArr})
  console.log({
    prev: previousArr,
    next: nextArr
  });

  // the new array is small and starts on the same start index thus no weights have bee shifted here, those gone away are allocated on the next bar and the overlap will get registered there
  if (nextArr.length < previousArr.length && nextArr[0] === previousArr[0]) {
    return 0;
  } else if (nextArr.length === previousArr.length && !(nextArr[0] === prevArr[0])) {
    return nextArr[0]-prevArr[0];
  }

  return nextArr.length - previousArr.length;
};

 return (
    <div className={`weight-popup ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="popup-content">
        <label htmlFor="weightB" className="block text-sm font-medium text-gray-700">Persado Weight:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          id="weightB"
          value={weightB}
          onChange={(e) => setWeightB(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        <label htmlFor="weightC" className="block mt-2 text-sm font-medium text-gray-700">E Weight:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          id="weightC"
          value={weightC}
          onChange={(e) => setWeightC(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeightPopup;