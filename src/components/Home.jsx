import React, { useEffect, useState } from "react";
import Modal from "./Modal";


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

    const handleCloseModal = () => {
      setSelectedPreview(null);
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
                 </div>
                ))
              )}

        {selectedPreview && (
        <Modal preview={selectedPreview} onClose={handleCloseModal} />
        )}
        </div>
    );
   } 

export default Home
