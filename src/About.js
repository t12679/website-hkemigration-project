import React, { useState, useEffect } from 'react';
import useContentful from './useContentful';
import ReactMarkdown from 'react-markdown';
import './About.css';

function About() {


  const { data: Pagedata, isLoading, error } = useContentful('about');


  if (isLoading) {
    return <p></p>;
  }

  if (error) {
      return <div>Error: {error.message}</div>; // render some error state
    }

  
      const entry = Pagedata ? Pagedata[0] : null;


  return (
    <div className='About'>
      <div className='AboutContent1'>
        <ReactMarkdown>{entry && entry.fields.AboutContent1}</ReactMarkdown> 
      </div>


      
    </div>
  );
}

export default About;
