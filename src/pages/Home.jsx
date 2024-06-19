import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [previews, setPreviews] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // State to manage sorting order

  
    useEffect(() => { //hoook to handle side effects
      fetch('https://podcast-api.netlify.app')
      .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch previews' + response.statusText);
        }
        return response.json();
      })
      .then(previews => {  //updates state with fetched data
        const sortedPreviews = previews.sort((a, b) => a.title.localeCompare(b.title));
        setPreviews(sortedPreviews);
      })
      .catch(error => {
        setError(error.toString());
      });
     [];
    })

    const handleBlockClick = (preview) => { 
      setSelectedPreview(selectedPreview?.id === preview.id ? null: preview); //checks if preview is selected
    };

    const handleCloseModal = () => { 
      setSelectedPreview(null); //closes modal
    };

      // renders component
    return (

        <div className="container">
            {error ? (
                <div className="error">
                    <p>{error}</p>
                    </div>
            ) : (
              previews.map((preview, index) => (
                <div className="block" key={index} onClick={() => handleBlockClick(preview)}>
                  <h3>{preview.title}</h3>
                  <img 
                    src={preview.image} 
                    className="preview-image" 
                    alt={preview.title}  
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

