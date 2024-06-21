import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './components/FavoritesContext';
import Home from './pages/Home';
import Show from './components/Show';
import Header from './components/Header';
import Favorites from './pages/Library';


const App = () => {
  return (
    <Router>
         <FavoritesProvider>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
      </FavoritesProvider>
    </Router>

  );
};

export default App;