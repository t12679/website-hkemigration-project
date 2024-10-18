import React from 'react';
import useContentful from '../useContentful';
import ReactMarkdown from 'react-markdown';
import './Team.css';

function Team({currentLanguage}) {

  const { data: Pagedata, isLoading, error } = useContentful('team', currentLanguage);

  if (isLoading) {
    return <p></p>;
  }

  if (error) {
      return <div>Error: {error.message}</div>;
    }  
      const entry = Pagedata ? Pagedata[0] : null;

  return (
    <div className='container-fluid'>
      <div className='row py-1 my-4 Team-intro text-center'>
        <ReactMarkdown>{entry && entry.fields.team}</ReactMarkdown>
      </div>
      <div className='row py-3 px-4 text-white Team-section1'>
        <div className='Team-section1-title'>
          <ReactMarkdown>{entry && entry.fields.section1}</ReactMarkdown>
        </div>
        <div className='col-md-5 Team-section1-container'>
          <ReactMarkdown>{entry && entry.fields.section1Name1}</ReactMarkdown>
        </div>
      </div>

      <div className='row py-3 px-4 Team-section2'>
        <div className='Team-section2-title'>
          <ReactMarkdown>{entry && entry.fields.section2}</ReactMarkdown>
        </div>
        <div className='col-md-5 Team-section2-container'>
          <ReactMarkdown>{entry && entry.fields.section2Name1}</ReactMarkdown>
          <ReactMarkdown>{entry && entry.fields.section2Name2}</ReactMarkdown>
        </div>
      </div>

      <div className='row py-3 px-4 text-white Team-section3'>
        <div className='Team-section3-title'>
          <ReactMarkdown>{entry && entry.fields.section3}</ReactMarkdown>
        </div>
      </div>

      <div className='row py-3 px-4 Team-section4'>
        <div className='Team-section4-title'>
          <ReactMarkdown>{entry && entry.fields.section4}</ReactMarkdown>
        </div>
        <div className='col-md-5 Team-section4-container'>
          <ReactMarkdown>{entry && entry.fields.section4Name1}</ReactMarkdown>
        </div>
      </div>

      <div className='row py-3 px-4 text-white Team-section5'>
        <div className='Team-section5-title'>
          <ReactMarkdown>{entry && entry.fields.section5}</ReactMarkdown>
        </div>
        <div className='col-md-5 Team-section5-container'>
          <ReactMarkdown>{entry && entry.fields.section5Name1}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Team;
