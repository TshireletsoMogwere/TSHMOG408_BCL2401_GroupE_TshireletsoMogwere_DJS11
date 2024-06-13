
import React, { useState, useEffect } from 'react';

const Genres = () => {
  const [genres, setGenre] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/id/10716')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setGenre(data))
      .catch(error => setError(error));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!genres) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{genres.title}</h1>
      <p>{genres.description}</p>
    </div>
  );
};

export default Genres;
