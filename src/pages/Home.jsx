import React, { useEffect, useState } from 'react';
import { fetchPreviews, fetchGenre } from '../services/api';
import { Link } from 'react-router-dom';
import GenreComponent from '../components/GenreComponent';
import { genreMapping } from '../components/Genre';

const Home = ({ handleSearch }) => {
  const [previews, setPreviews] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreDetails, setGenreDetails] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchBar, setSearchBar] = useState('');

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

      <ul>
        {previews.map(preview => (
          <li key={preview.id}>
            <Link to={`/show/${preview.id}`}>
              <h2>{preview.title}</h2>
              <h2>{preview.genres}</h2>
              <img src={preview.image} alt={preview.title} className="small-image" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
