import React, { useState, useEffect } from 'react';
import { useFavorites } from '../components/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MdPadding } from 'react-icons/md';

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

  const sortedFavorites = sortFavorites(favorites, sortCriteria, sortOrder);
  const paginatedFavorites = paginate(sortedFavorites);

  return (
    <div className="favorites-container">
      <h1>Favourites</h1>
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
          <ul className="favorites-list">
            {paginatedFavorites.map(({ episode, show, season, addedAt }) => (
              <li key={`${show?.title}-${episode.episode}`} className="favorite-item">
                <h2>{show?.title}</h2>
                <h3>{season?.title}</h3>
                <p>Episode Number: {episode?.episode}</p>
                <p>Title: {episode?.title}</p>
                <p>Added at: {new Date(addedAt).toLocaleString()}</p>
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

          <div className="pagination">
            {favorites.length > favoritesPerPage && (
              <>
               <button
         onClick={() => setCurrentPage(currentPage - 1)}
         disabled={currentPage === 1}
         className="previous"
>
  <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px'}} />
  Previous
</button>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === Math.ceil(favorites.length / favoritesPerPage)} className='next'
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
