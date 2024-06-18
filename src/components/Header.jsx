import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #111;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Podcasts</h1>
    </HeaderContainer>
  );
};

export default Header;
