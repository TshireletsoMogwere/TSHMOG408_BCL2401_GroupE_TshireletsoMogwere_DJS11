import React, { useState, useEffect } from 'react';
import { fetchGenre } from '../services/api';

export const genreMapping = {
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

const Genres = ({ onGenreSelect }) => {
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
    <div className="genre-list">
      <ul className='genres'>
        {genres.map(genre => (
          <li key={genre.id} className='genre'>
            <button onClick={() => onGenreSelect(genre)}>
              {genreMapping[genre.id]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
