import React from 'react';
import './chart.css'

function DotChart({ people, color }) {
  // Calculate the number of dots
  const numDots = Math.ceil(people / 10000);

  // Create an array of dots
  const dots = Array(numDots).fill(null);

  return (
    <div className="dot-chart">
      <div className="dot-chart-number">
        <b>{people}</b>
      </div >
      <div className='chart-only'>
        {dots.map((dot, index) => (
          <div 
              key={index} 
              className="dot" 
              style={{ backgroundColor: color }}  // set the background color here
          />
        ))}
    </div>
    </div>
  );
}

export default DotChart;
