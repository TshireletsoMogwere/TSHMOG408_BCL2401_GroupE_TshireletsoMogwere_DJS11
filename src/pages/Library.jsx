import React from 'react';
import { useFavorites } from '../pages/FavoritesContext';

const Favorites = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    return(
        <div className="favorites-container">
            <h1>Favorites</h1>
            {favorites.length === 0 ? (
        <p>No favorite episodes added.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map(({ episode, show, season, addedAt }) => (
            <li key={episode.id} className="favorite-item">
              <h2>{show.title}</h2>
              <h3>{season.title}</h3>
              <p>Episode ID: {episode.id}</p>
              <p>Title: {episode.title}</p>
              <p>Added on: {new Date(addedAt).toLocaleString()}</p> {/* Display added date and time */}
              <audio controls src={episode.file} />
              <button
                onClick={() => removeFromFavorites(episode.id)}
                className="remove-from-favorites-button"
              >
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
        </div>
    )
}

