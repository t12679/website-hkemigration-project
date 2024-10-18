// ThermometersWrapper.js
import React from 'react';
import Thermometer from './Thermometer'; 

const ThermometersWrapper = ({ surveyGoal, surveyCurrent, interviewGoal, interviewCurrent }) => {
  return (
    <div className="thermometers-wrapper">
      <Thermometer
        label="Survey"
        goalAmount={surveyGoal}
        currentAmount={surveyCurrent}
        labelText="Survey Respones ---" 
      />
      <Thermometer
        label="Interview"
        goalAmount={interviewGoal}
        currentAmount={interviewCurrent}
        labelText="Interviews Conducted ---"
      />
    </div>
  );
};

export default ThermometersWrapper;
