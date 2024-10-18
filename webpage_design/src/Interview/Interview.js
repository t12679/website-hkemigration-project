import React from 'react';
import useContentful from '../useContentful';
import ReactMarkdown from 'react-markdown';
import './Interview.css';


function Interview({currentLanguage}) {

  const { data: Pagedata, isLoading, error } = useContentful('interview', currentLanguage);

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
        <div className='col-10 Interview-intro'>
          <ReactMarkdown>{entry && entry.fields.intro}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Interview;
