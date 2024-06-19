import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim()); // Trim whitespace and pass search query to parent component
  };

  return (
    <header className="header">
      <h1 className="header-title">Podcasts</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Library</Link>
      </nav>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search podcasts..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </header>
  );
};

export default Header;
