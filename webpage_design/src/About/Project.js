import React, { useState, useEffect } from 'react';
import './Project.css';
import useContentful from '../useContentful';
import ReactMarkdown from 'react-markdown';
import ProjectChart1 from '../images/Proejct Chart 1.png'
import ProjectChart2 from '../images/Proejct Chart 2.png'
import ProjectChart3 from '../images/Proejct Chart 3.png'
import WordCloud from '../images/Word Cloud.png'

const charts = [ProjectChart1, ProjectChart2, ProjectChart3];

function Project({ currentLanguage }) {
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
    <div className="container-fluid mt-4">
        <div className='row justify-content-center'>
          <div className='col-10'>
            <div className="ProjectHeading-Container">  
              <ReactMarkdown>{entry && entry.fields.ProjectHeading}</ReactMarkdown>
            </div>
          </div>
        </div>


      <div className='row justify-content-center my-4'>
        <div className='col-8 text-center'>
          <ReactMarkdown>{entry && entry.fields.WordCloud}</ReactMarkdown>
          <img src={WordCloud} alt="WordCloudImage" className="img-fluid my-3" />
        </div>
      </div>

      <div className='ProjectPreliminaryConclusions row justify-content-center'>
        <div className='col-md-10 text-start text-white py-5 ProjectPreliminaryConclusions-Container'>
          <ReactMarkdown>{entry && entry.fields.ProjectPreliminaryConclusions}</ReactMarkdown>
        </div>
      </div>
      {/* Not yet coded with bootstrap */}
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
      <div className="text-center my-3">
        <button className="btn ProjectButtonContainerButton  me-2" onClick={goToPrevSlide}>
          Prev
        </button>
        <button className="btn ProjectButtonContainerButton " onClick={goToNextSlide}>
          Next
        </button>
      </div>
      {/* Until Here */}
      <div className=' row justify-content-center ProjectContent1'>
        <div className='col-md-9 text-white py-4'>
          <ReactMarkdown>{entry && entry.fields.ProjectContent1}</ReactMarkdown>
        </div>
      </div>
    </div>
    
  );
}

export default Project;
