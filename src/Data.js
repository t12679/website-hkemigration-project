
import React, { useState, useEffect } from 'react';
import useContentful from './useContentful';
import ReactMarkdown from 'react-markdown';
import WordCloud from './images/Word Cloud.png'
import ProjectChart1 from './images/Proejct Chart 1.png'
import ProjectChart2 from './images/Proejct Chart 2.png'
import ProjectChart3 from './images/Proejct Chart 3.png'
import './Data.css';

function Data() {

  const [activeIndex, setActiveIndex] = useState(1);
  const charts = [ProjectChart1, ProjectChart2, ProjectChart3];

  function goToNextSlide() {
    let index = activeIndex;
    let slidesLength = charts.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    setActiveIndex(index);
  }

  function goToPrevSlide() {
    let index = activeIndex;
    let slidesLength = charts.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    setActiveIndex(index);
  }
  const { data: Pagedata, isLoading, error } = useContentful('Project');


  if (isLoading) {
    return <p></p>;
  }

  if (error) {
      return <div>Error: {error.message}</div>; // render some error state
    }

  
      const entry = Pagedata ? Pagedata[0] : null;





  return (
    <div>
      <div className='WordCloud'>
        <div className='WordCloud-Container'>
          <ReactMarkdown>{entry && entry.fields.WordCloud}</ReactMarkdown>
          <img src={WordCloud} alt="WordCloudImage" className="WordCloudImage" />
        </div>
      </div>


      <div className="ProjectCharts-Data">
        {charts.map((chart, index) => (
          <img
            key={index}
            className={index === activeIndex ? 'ProjectChart active' : 'ProjectChart'}
            src={chart}
            alt="Project Chart"
          />
        ))}
      </div>
      <div className="ProjectButtonContainer-Data">
        <button onClick={goToPrevSlide}>Prev</button>
        <button onClick={goToNextSlide}>Next</button>
      </div>

    </div>
  );
}

export default Data;
