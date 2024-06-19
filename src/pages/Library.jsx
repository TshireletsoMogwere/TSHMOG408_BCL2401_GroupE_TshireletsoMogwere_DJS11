import React, { useState } from 'react';
import { useFavorites } from '../components/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [sortOrder, setSortOrder] = useState('asc'); // State to track sorting order (A-Z or Z-A)
  const [sortCriteria, setSortCriteria] = useState('title'); // State to track sorting criteria (title or date)

  const sortFavorites = (favorites, criteria, order) => {
    return [...favorites].sort((a, b) => {
      if (criteria === 'title') {
        if (a.episode.title < b.episode.title) return order === 'asc' ? -1 : 1;
        if (a.episode.title > b.episode.title) return order === 'asc' ? 1 : -1;
        return 0;
      } else if (criteria === 'date') {
        if (new Date(a.addedAt) < new Date(b.addedAt)) return order === 'asc' ? -1 : 1;
        if (new Date(a.addedAt) > new Date(b.addedAt)) return order === 'asc' ? 1 : -1;
        return 0;
      }
    });
  };

  const handleSortChange = (criteria) => {
    if (sortCriteria === criteria) {
      // Toggle sort order if the same criteria is clicked again
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set new criteria and reset to ascending order
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  const sortedFavorites = sortFavorites(favorites, sortCriteria, sortOrder);

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite episodes added.</p>
      ) : (
        <>
          <div className="sort-buttons">
            <button onClick={() => handleSortChange('title')} className="sort-button">
              Sort by Title ({sortOrder === 'asc' && sortCriteria === 'title' ? 'A-Z' : 'Z-A'})
            </button>
            <button onClick={() => handleSortChange('date')} className="sort-button">
              Sort by Date ({sortOrder === 'asc' && sortCriteria === 'date' ? 'Oldest' : 'Newest'})
            </button>
          </div>
          <ul className="favorites-list">
            {sortedFavorites.map(({ episode, show, season, addedAt }) => (
              <li key={episode.episode} className="favorite-item">
                <h2>{show.title}</h2>
                <h3>{season.title}</h3>
                <p>Episode Number: {episode.episode}</p>
                <p>Title: {episode.title}</p>
                <p>Added on: {new Date(addedAt).toLocaleString()}</p> {/* Display added date and time */}
                <audio controls src={episode.file} />
                <button
                  onClick={() => removeFromFavorites(episode.episode)}
                  className="remove-from-favorites-button"
                >
                  Remove from Favorites
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Favorites;
