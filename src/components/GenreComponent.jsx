import React from 'react';

const GenreComponent = ({ genre }) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="genre-item">
      <p>{genre.id}</p>
      <h2>{genre.title}</h2>
      <p>{genre.description}</p>
      <p>{genre.shows}</p>
      
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default GenreComponent;
