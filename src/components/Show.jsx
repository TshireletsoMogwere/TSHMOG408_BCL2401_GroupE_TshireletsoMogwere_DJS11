import React, { useEffect, useState } from 'react';
import { fetchShow } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../components/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [show, setShow] = useState(null);
  const [expandedSeasonId, setExpandedSeasonId] = useState(null);

  useEffect(() => {
    fetchShow(id).then((data) => setShow(data));
  }, [id]);

  if (!show) return <div>Loading...</div>;

  const handleSeasonClick = (seasonId) => {
    setExpandedSeasonId((prevExpandedSeasonId) =>
      prevExpandedSeasonId === seasonId ? null : seasonId
    );
  };

  const handleAddToFavorites = (episode, show, season) => {
    const episodeExists = favorites.some((fav) => fav.episode.episode === episode.episode);
    if (!episodeExists) {
      addToFavorites({ episode, show, season });
    }
  };

  const handleRemoveFromFavorites = (episodeNumber) => {
    removeFromFavorites(episodeNumber);
  };

  const isFavorite = (episodeNumber) => {
    return favorites.some((e) => e.episode.episode === episodeNumber);
  };

  

  return (
    <div className="show-container">
      <button onClick={() => navigate('/')} className="back-to-list-button">
      <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
        Back to Home
      </button>
      <h1 className='show-title'> {show.title}</h1>
      <h3 className='season-number'>Number of Seasons: {show.seasons.length}</h3>
      <div className="description">
        {show.description.split('. ').map((sentence, index) => (
          <p key={index} className="p-title">{sentence.trim()}.</p>
        ))}
      </div>
      <img src={show.image} alt={show.title} className="show-image" />
      <p>Genre ID: {show.genreId}</p>
      <h3>Updated: {show.updated}</h3>
      <ul className="seasons-list">
        {show.seasons.map((season) => (
          <li key={season.season} className="season-item">
            <button onClick={() => handleSeasonClick(season.season)} className="season-button">
              {season.title} ({season.episodes.length})
            </button>
            {expandedSeasonId === season.season && (
              <ul className="episode-list">
                {season.episodes.map((episode) => (
                  <li key={`${season.season}-${episode.episode}`} className="episode-item">
                    <p>Episode Number: {episode.episode}</p>
                    <p>Title: {episode.title}</p>
                    <audio controls src={episode.file} />
                    {isFavorite(episode.episode) ? (
                      <button
                        onClick={() => handleRemoveFromFavorites(episode.episode)}
                        className="remove-from-favorites-button"
                      >
                        Remove from Favorites
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToFavorites(episode, show, season)}
                        className="add-to-favorites-button"
                      >
                        Add to Favorites
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Show;
