import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPreviews, fetchGenre } from '../services/api';
import GenreComponent from '../components/GenreComponent';
import { genreMapping } from '../components/Genre';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = ({ handleSearch }) => {
  const [previews, setPreviews] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreDetails, setGenreDetails] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchBar, setSearchBar] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const previewsPerPage = 12;

  useEffect(() => {
    fetchPreviews().then(data => {
      const sortedPreviews = data.sort((a, b) => {
        if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
        if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
      setPreviews(sortedPreviews);
    });
  }, [sortOrder]);

  useEffect(() => {
    // Update previews when searchResults change
    setPreviews(searchResults);
  }, [searchResults]);

  const sortPreviews = (order) => {
    setSortOrder(order);
  };

  const handleGenreSelect = async (event) => {
    const genreId = event.target.value;
    if (!genreId) {
      setSelectedGenre(null);
      setGenreDetails(null);
      setPreviews(await fetchPreviews());
      return;
    }

    try {
      const genre = { id: genreId, name: genreMapping[genreId] };
      const genreDetail = await fetchGenre(genreId);
      setSelectedGenre(genre);
      setGenreDetails(genreDetail);

      const filteredPreviews = await fetchPreviewsByGenre(genreId);
      setPreviews(filteredPreviews);
    } catch (error) {
      console.error('Error fetching genre details:', error);
    }
  };

  const handleShowGenreDetails = () => {
    setGenreDetails(prev => !prev);
  };

  const fetchPreviewsByGenre = async (genreId) => {
    try {
      const previewsData = await fetchPreviews();
      const filteredPreviews = previewsData.filter(preview => {
        // Ensure this condition matches the structure of your preview objects
        return preview.genres && preview.genres.includes(parseInt(genreId));
      });
      return filteredPreviews;
    } catch (error) {
      console.error('Error fetching previews by genre:', error);
      return [];
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const previewsData = await fetchPreviews();
      const filteredPreviews = previewsData.filter(preview => {
        // Customize this condition based on your search requirements
        return preview.title.toLowerCase().includes(query.toLowerCase());
      });
      return filteredPreviews;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  useEffect(() => {
    const search = async () => {
      if (searchBar.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const results = await fetchSearchResults(searchBar);
        setSearchResults(results);
      } catch (error) {
        setError(error);
      }
    };

    search();
  }, [searchBar]);

  const indexOfLastPreview = currentPage * previewsPerPage;
  const indexOfFirstPreview = indexOfLastPreview - previewsPerPage;
  const currentPreviews = previews.slice(indexOfFirstPreview, indexOfLastPreview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="sort-buttons">
        <button onClick={() => sortPreviews('asc')}>Sort A-Z</button>
        <button onClick={() => sortPreviews('desc')}>Sort Z-A</button>
      </div>

      <select className="select-genre" onChange={handleGenreSelect}>
        <option value="">Select a Genre</option>
        {Object.keys(genreMapping).map(id => (
          <option key={id} value={id}>
            {genreMapping[id]}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search by title"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
        className="search-input"
      />

      {selectedGenre && (
        <div className="genre-details">
          <h2>Genre Details</h2>
          {genreDetails && <GenreComponent genre={genreDetails} />}
          <button onClick={handleShowGenreDetails}>
            {genreDetails ? 'Hide Genre Details' : 'Show Genre Details'}
          </button>
        </div>
      )}

      <ul className="preview-list">
        {currentPreviews.map(preview => (
          <li key={preview.id} className="preview-item">
            <h2>{preview.title}</h2>
            <h2>{preview.genres}</h2>
            
            <img src={preview.image} alt={preview.title} className="small-image" />
            
            <Link to={`/show/${preview.id}`} className="details-button">
              Click to see details
            </Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pagination-button previous-home">
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPreviews.length < previewsPerPage} className="pagination-button next-home">
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default Home;
