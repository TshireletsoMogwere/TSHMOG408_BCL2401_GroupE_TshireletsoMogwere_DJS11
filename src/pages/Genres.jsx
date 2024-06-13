
import React, { useState, useEffect } from 'react';
import { fetchGenre } from '../services/api';

const genreMapping = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

export function Genres() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const promises = Object.keys(genreMapping).map(id => fetchGenre(id));
        const results = await Promise.all(promises);
        setGenres(results);
      } catch (error) {
        setError(error);
      }
    };

    fetchGenres();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!genres.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Browse by Genres</h1>
      <div className="genre-list">
        {genres.map(genre => (
          <div key={genre.id} className="genre-item">
            <h2>{genre.id}</h2>
            <h2>{genre.title}</h2>
            <p>{genre.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
