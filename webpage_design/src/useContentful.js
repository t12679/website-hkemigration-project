// useContentful.js
import { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
  host:"preview.contentful.com"
});

const useContentful = (contentType, locale) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.getEntries({ content_type: contentType, locale: locale })
      .then((response) => {
        setData(response.items); 
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  }, [contentType, locale]);

  return { data, isLoading, error };
};

export default useContentful;
