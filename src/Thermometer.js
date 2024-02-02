import React from 'react';
import './Thermometer.css'; 

const Thermometer = ({ label, goalAmount, currentAmount, labelText }) => {
  const percentage = (currentAmount / goalAmount) * 100;

  return (
    <div className="thermometer-container">
          <div className="thermometer-label">{label}</div>
          <div className="thermometer">
            <div className="thermometer__goal">{`GOAL: ${goalAmount}`}</div>
            <div className="thermometer__amount-container">
              <div className="thermometer__amount" style={{ bottom: `${percentage}%` }}>
                {`${currentAmount} ${labelText}`}
              </div>
              <div className="thermometer__tube">
                <div className="thermometer__mercury" style={{ height: `${percentage}%`}}></div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default Thermometer;
