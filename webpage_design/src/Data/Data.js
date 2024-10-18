import React, { useState, useEffect } from 'react';
import useContentful from '../useContentful';
import ReactMarkdown from 'react-markdown';
import WordCloud from '../images/Word Cloud.png'
import ProjectChart1 from '../images/Proejct Chart 1.png'
import ProjectChart2 from '../images/Proejct Chart 2.png'
import ProjectChart3 from '../images/Proejct Chart 3.png'
import './Data.css';

function Data({currentLanguage}) {

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
  const { data: Pagedata, isLoading, error } = useContentful('Project', currentLanguage);

  if (isLoading) {
    return <p></p>;
  }

  if (error) {
      return <div>Error: {error.message}</div>; 
    }
      const entry = Pagedata ? Pagedata[0] : null;

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center mt-4'>
        <div className='col-10 d-flex flex-column align-items-center mb-5'>
          <ReactMarkdown>{entry && entry.fields.WordCloud}</ReactMarkdown>
          <img src={WordCloud} alt="WordCloudImage" className="col-6" />
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-wrap overflow-hidden mt-4 ProjectCharts-Data">
        {charts.map((chart, index) => (
          <img
            key={index}
            className={index === activeIndex ? 'ProjectChart active' : 'ProjectChart'}
            src={chart}
            alt="Project Chart"
          />
        ))}
      </div>
      
      <div className="text-center py-4 ProjectButtonContainer-Data">
        <button className="btn btn-light me-2 p-2 rounded" onClick={goToPrevSlide}>Prev</button>
        <button className="btn btn-light me-2 p-2 rounded"onClick={goToNextSlide}>Next</button>
      </div>
    </div>
   
  );
}

export default Data;
