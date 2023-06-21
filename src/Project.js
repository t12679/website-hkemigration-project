import React from 'react';
import './Project.css';
import useContentful from './useContentful';
import ReactMarkdown from 'react-markdown';



function Project() {
    const { data: Pagedata, isLoading, error } = useContentful('Project');


    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
        return <div>Error: {error.message}</div>; // render some error state
      }
  
    
        const entry = Pagedata ? Pagedata[0] : null;


  return (
    <div className="project-content">
        <ReactMarkdown>{entry && entry.fields.ProjectContent}</ReactMarkdown>
    </div>
  );
}

export default Project;
