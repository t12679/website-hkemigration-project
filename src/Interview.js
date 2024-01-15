import React from 'react';
import useContentful from './useContentful';
import ReactMarkdown from 'react-markdown';
import './Interview.css';


function Interview({currentLanguage}) {

  const { data: Pagedata, isLoading, error } = useContentful('interview', currentLanguage);


  if (isLoading) {
    return <p></p>;
  }

  if (error) {
      return <div>Error: {error.message}</div>; // render some error state
    }

  
      const entry = Pagedata ? Pagedata[0] : null;




  return (
    <div className='Interview'>
      <div className='Interview-intro'>
          <ReactMarkdown>{entry && entry.fields.intro}</ReactMarkdown>
        </div>
    </div>
  );
}

export default Interview;
