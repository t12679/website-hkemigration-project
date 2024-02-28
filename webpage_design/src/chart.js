import React from 'react';
import './chart.css'

function DotChart({ people, color, animate }) {
  // Calculate the number of dots
 
  const numDots = Math.ceil(people / 10000);
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
              className={`dot ${animate ? 'animate' : ''}`}
              style={{ 
                backgroundColor: color,
                animationDelay: `${index * 0.015}s` 
              
              }}  // set the background color here
          />
        ))}
    </div>
    </div>
  );
}

export default DotChart;
