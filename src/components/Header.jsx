import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #111;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const NavLinks = styled.div`
  margin-top: 10px;

  a {
    color: #fff;
    margin: 0 15px;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Podcasts</h1>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
