import React from 'react';
import useContentful from './useContentful';
import ReactMarkdown from 'react-markdown';
import './ContactUs.css';


function ContactUs({currentLanguage}) {

  const { data: Pagedata, isLoading, error } = useContentful('contactUs', currentLanguage);


  if (isLoading) {
    return <p></p>;
  }

  if (error) {
      return <div>Error: {error.message}</div>; // render some error state
    }

  
      const entry = Pagedata ? Pagedata[0] : null;


  return (
    <div className='ContactUs'>
      <div className='Contact-info'>
        <ReactMarkdown>{entry && entry.fields.heading}</ReactMarkdown>
          <ReactMarkdown>{entry && entry.fields.contact1}</ReactMarkdown>
          <ReactMarkdown>{entry && entry.fields.contact2}</ReactMarkdown>
          <ReactMarkdown>{entry && entry.fields.contact3}</ReactMarkdown>
        </div>
    </div>
  );
}

export default ContactUs;