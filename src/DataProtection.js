import React, { useState, useEffect } from 'react';
import useContentful from './useContentful';
import ReactMarkdown from 'react-markdown';
import './DataProtection.css';


function DataProtection({currentLanguage}) {

    const { data: Pagedata, isLoading, error } = useContentful('dataProtection', currentLanguage);


    if (isLoading) {
      return <p></p>;
    }
  
    if (error) {
        return <div>Error: {error.message}</div>; // render some error state
      }
  
        const entry = Pagedata ? Pagedata[0] : null;
  

    return(

        <div className='DataProtection'>
            <ReactMarkdown>{entry&&entry.fields.heading}</ReactMarkdown>
            <div className='DataProtectionContent'>
                <ReactMarkdown>{entry&&entry.fields.content}</ReactMarkdown>
            </div>
        </div>
    
    );

}

export default DataProtection;

