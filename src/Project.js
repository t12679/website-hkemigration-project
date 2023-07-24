import React, { useState, useEffect  } from 'react';
import './Project.css';
import useContentful from './useContentful';
import ReactMarkdown from 'react-markdown';
import ProjectChart1 from './images/Proejct Chart 1.png'
import ProjectChart2 from './images/Proejct Chart 2.png'
import ProjectChart3 from './images/Proejct Chart 3.png'


const charts = [ProjectChart1, ProjectChart2, ProjectChart3];


function Project() {
  const [activeIndex, setActiveIndex] = useState(0);
  const charts = [ProjectChart1, ProjectChart2, ProjectChart3];

  function goToPrevSlide() {
    let index = activeIndex;
    let slidesLength = charts.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    setActiveIndex(index);
  }

  function goToNextSlide() {
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
    <div className="Project">
      <div></div>
      <div></div>

      <div className='ProjectHeading'>
        <div className='ProjectHeading-Container'>
          <ReactMarkdown>{entry && entry.fields.ProjectHeading}</ReactMarkdown>
        </div>
      </div>

      <div className='ProjectPreliminaryConclusions'>
        <div className='ProjectPreliminaryConclusions-Container'>
          <ReactMarkdown>{entry && entry.fields.ProjectPreliminaryConclusions}</ReactMarkdown>
        </div>
      </div>


      <div className="ProjectCharts">
        {charts.map((chart, index) => (
          <img
            key={index}
            className={index === activeIndex ? 'ProjectChart active' : 'ProjectChart'}
            src={chart}
            alt="Project Chart"
          />
        ))}
      </div>
      <div className="ProjectButtonContainer">
        <button onClick={goToPrevSlide}>Prev</button>
        <button onClick={goToNextSlide}>Next</button>
      </div>



      <div className='ProjectContent1'>
        <div className='ProjectContent1-Container'>
          <ReactMarkdown>{entry && entry.fields.ProjectContent1}</ReactMarkdown>
        </div>
      </div>
    </div>
    
  );
}

export default Project;
