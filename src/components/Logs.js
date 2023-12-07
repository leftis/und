import React from 'react';

const Logs = ({ logs }) => {
  return (
    <div className="logs grid content-start">
      {
        logs.map((log, idx) => (<div key={idx}>{log.toString()}</div>))
      }
    </div>
  );
}

export default Logs;