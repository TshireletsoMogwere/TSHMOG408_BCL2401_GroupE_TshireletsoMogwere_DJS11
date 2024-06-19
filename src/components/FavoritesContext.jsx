import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }, [favorites]);
    
      const addToFavorites = (item) => {
        const newItem = { ...item, addedAt: new Date().toISOString() }; // Add timestamp
        setFavorites((prevFavorites) => [...prevFavorites, newItem]);
      };

      const removeFromFavorites = (episodeId) => {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.episode.id !== episodeId)
        );
      };

      return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
          {children}
        </FavoritesContext.Provider>
      );
}

export const useFavorites = () => useContext(FavoritesContext);