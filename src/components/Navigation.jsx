import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const NavItem = styled.div`
  cursor: pointer;
`;

const NavigationBar = ({ genres, onGenreClick }) => {
  const handleGenreClick = (genre) => {
    onGenreClick(genre);
  };

  return (
    <NavBar>
      {genres.map(genre => (
        <NavItem key={genre.id} onClick={() => handleGenreClick(genre)}>
          {genre.title}
        </NavItem>
      ))}
    </NavBar>
  );
};

export default NavigationBar;
