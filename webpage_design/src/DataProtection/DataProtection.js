import React, { useState, useEffect } from 'react';
import useContentful from '../useContentful';
import ReactMarkdown from 'react-markdown';
import './DataProtection.css';


function DataProtection({currentLanguage}) {

    const { data: Pagedata, isLoading, error } = useContentful('dataProtection', currentLanguage);

    if (isLoading) {
      return <p></p>;
    }
  
    if (error) {
        return <div>Error: {error.message}</div>; 
      }
        const entry = Pagedata ? Pagedata[0] : null;

    return(
        <div className='container-fluid'>
            <div className='row justify-content-center mx-4 mt-4'>
                <div className='col-10'>
                    <ReactMarkdown className ="text-center">{entry&&entry.fields.heading}</ReactMarkdown>
                    <div className='mx-4 mt-4 DataProtectionContent'>
                        <ReactMarkdown>{entry&&entry.fields.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataProtection;

