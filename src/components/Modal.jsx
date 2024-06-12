import React from 'react';

const Modal = ({ preview, onClose }) => {
  if (!preview) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
      <img 
          src={preview.image} 
          className="modal-image" 
        alt={preview.title} 
        onClick={() => handleImageClick(preview)} 
        />
        <span className="close" onClick={onClose}>&times;</span>
        <h3>ID: {preview.id}</h3>
        <p>Description: {preview.description}</p>
        <h4>Seasons: {preview.seasons}</h4>
        <h4>Genres: {preview.genres}</h4>
        <h4>Updated: {preview.updated}</h4>
      </div>
    </div>
  );
};

export default Modal;
