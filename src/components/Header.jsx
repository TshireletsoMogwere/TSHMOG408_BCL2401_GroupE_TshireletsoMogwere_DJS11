import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
}


const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};

const handleSearchSubmit = (e) => {
  e.preventDefault();
  onSearch(searchQuery.trim()); // Trim whitespace and pass search query to parent component
};
