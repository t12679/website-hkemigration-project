import React from 'react';
import useContentful from '../useContentful';
import ReactMarkdown from 'react-markdown';
import './About.css';

function About({ currentLanguage }) {
  const { data: Pagedata, isLoading, error } = useContentful('about', currentLanguage);

  if (isLoading) {
    return <p> </p>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }
  
  const entry = Pagedata ? Pagedata[0] : null;

  return (
    <div className='container'>  
      <div className='row justify-content-center'> 
        <div className='col-md-8 AboutContent1 pt-4'>  
          <ReactMarkdown>{entry && entry.fields.AboutContent1}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default About;
