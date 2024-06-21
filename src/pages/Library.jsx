import React, { useState, useEffect } from 'react';
import { useFavorites } from '../components/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortCriteria, setSortCriteria] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const favoritesPerPage = 6;

  const sortFavorites = (favorites, criteria, order) => {
    return [...favorites].sort((a, b) => {
      if (criteria === 'title') {
        return order === 'asc' ? a.episode.title.localeCompare(b.episode.title) : b.episode.title.localeCompare(a.episode.title);
      } else if (criteria === 'date') {
        return order === 'asc' ? a.addedAt - b.addedAt : b.addedAt - a.addedAt;
      }
      return 0;
    });
  };

  
  const handleSortChange = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting criteria changes
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const paginate = (favorites) => {
    const startIndex = (currentPage - 1) * favoritesPerPage;
    return favorites.slice(startIndex, startIndex + favoritesPerPage);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const groupFavoritesByShowAndSeason = (favorites) => {
    const groupedFavorites = favorites.reduce((acc, { episode, show, season, addedAt }) => {
      const showTitle = show?.title || 'Unknown Show';
      const seasonTitle = season?.title || 'Unknown Season';

      if (!acc[showTitle]) acc[showTitle] = {};
      if (season && !acc[showTitle][seasonTitle]) acc[showTitle][seasonTitle] = [];

      if (season) {
        acc[showTitle][seasonTitle].push({ episode, addedAt });
      } else {
        // Handle episodes without a valid season (optional)
        const unknownSeasonKey = 'Unknown Season';
        if (!acc[showTitle][unknownSeasonKey]) acc[showTitle][unknownSeasonKey] = [];
        acc[showTitle][unknownSeasonKey].push({ episode, addedAt });
      }
      
      return acc;
    }, {});

    return groupedFavorites;
  };

  const sortedFavorites = sortFavorites(favorites, sortCriteria, sortOrder);
  const paginatedFavorites = paginate(sortedFavorites);
  const groupedFavorites = groupFavoritesByShowAndSeason(paginatedFavorites);

  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite episodes added.</p>
      ) : (
        <>
          <div className="sort-buttons">
            <button onClick={handleGoBack}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
              Go back
            </button>
            <button onClick={() => handleSortChange('title')} className="sort-button">
              Sort by Title ({sortOrder === 'asc' && sortCriteria === 'title' ? 'A-Z' : 'Z-A'})
            </button>
            <button onClick={() => handleSortChange('date')} className="sort-button">
              Sort by Date ({sortOrder === 'asc' && sortCriteria === 'date' ? 'Oldest' : 'Newest'})
            </button>
          </div>
          <div className="favorites-list">
            {Object.keys(groupedFavorites).map(showTitle => (
              <div key={showTitle} className="favorite-show">
                <h2>{showTitle}</h2>
                {Object.keys(groupedFavorites[showTitle]).map(seasonTitle => (
                  <div key={seasonTitle} className="favorite-season">
                    <h3>{seasonTitle}</h3>
                    <ul>
                      {groupedFavorites[showTitle][seasonTitle].map(({ episode, addedAt }) => (
                        <li key={`${episode.title}-${episode.episode}`} className="favorite-item">
                          <p>Episode Number: {episode?.episode}</p>
                          <p>Title: {episode?.title}</p>

                          <p>Added at: {new Date(addedAt * 1000).toDateString()}</p>

                          <audio controls src={episode?.file} />
                          <button
                            onClick={() => removeFromFavorites(episode?.episode)}
                            className="remove-from-favorites-button"
                          >
                            Remove from Favorites
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="pagination">
            {favorites.length > favoritesPerPage && (
              <>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-button previous"
                >
                  <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(favorites.length / favoritesPerPage)}
                  className="pagination-button next"
                >
                  <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '5px' }} />
                  Next
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
