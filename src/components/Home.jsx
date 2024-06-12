import React, { useEffect, useState } from "react";


function Home() {
    const [previews, setPreviews] = useState([])
    const [error, setError] = useState(null)
    const [selectedPreview, setSelectedPreview] = useState(null);

    useEffect(() => {
      fetch('https://podcast-api.netlify.app')
      .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch previews' + response.statusText);
        }
        return response.json();
      })
      .then(previews => {
        setPreviews(previews)
      })
      .catch(error => {
        setError(error.toString());
      });
     [];
    })

    const handleImageClick = (preview) => {
      setSelectedPreview(selectedPreview?.id === preview.id ? null: preview);
    };

    return (
        <div className="container">
            {error ? (
                <div className="error">
                    <p>{error}</p>
                    </div>
            ) : (
              previews.map((preview, index) => (
                <div className="block" key={index}>
                  <h3>{preview.title}</h3>
                  <img 
                    src={preview.image} 
                    className="preview-image" 
                    alt={preview.title} 
                    onClick={() => handleImageClick(preview)} 
                  />
                  {selectedPreview && selectedPreview.id === preview.id && (
                    <div className="details">
                      <h3>ID: {preview.id}</h3>
                      <p>Description: {preview.description}</p>
                      <h4>Seasons: {preview.seasons}</h4>
                      <h4>Genres: {preview.genres}</h4>
                      <h4>Updated: {preview.updated}</h4>
                 </div>
                )}
                </div>
              ))
            )}
        </div>
    );
    
}
export default Home
