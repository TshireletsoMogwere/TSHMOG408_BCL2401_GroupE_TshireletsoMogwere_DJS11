import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link">Library</Link>
      </nav>
    </header>
  );
};

export default Header;
