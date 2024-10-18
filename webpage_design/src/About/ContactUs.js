import React from 'react';
import useContentful from '../useContentful';
import ReactMarkdown from 'react-markdown';
import './ContactUs.css';


function ContactUs({currentLanguage}) {

  const { data: Pagedata, isLoading, error } = useContentful('contactUs', currentLanguage);

  if (isLoading) {
    return <p> </p>;
  }

  if (error) {
      return <div>Error: {error.message}</div>; 
    }

      const entry = Pagedata ? Pagedata[0] : null;

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center mt-3'>
          <div className='col-10'>
            <ReactMarkdown className="mb-3">{entry && entry.fields.heading}</ReactMarkdown>
            <ReactMarkdown className="contact-text">{entry && entry.fields.contact1}</ReactMarkdown>
            <ReactMarkdown className="contact-text">{entry && entry.fields.contact2}</ReactMarkdown>
            <ReactMarkdown className="contact-text">{entry && entry.fields.contact3}</ReactMarkdown>
          </div>
        </div>
    </div>
  );
}

export default ContactUs;