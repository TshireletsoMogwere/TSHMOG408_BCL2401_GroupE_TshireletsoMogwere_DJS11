import React, { useEffect, useState } from "react";
import Modal from "./Modal";


function Home() { //component
    const [previews, setPreviews] = useState([]) //holds list of data fetched from API
    const [error, setError] = useState(null) //holds error messages occuring during fetch operation
    const [selectedPreview, setSelectedPreview] = useState(null); //holds currently selected preview to display modal

    useEffect(() => { //hoook to handle side effects
      fetch('https://podcast-api.netlify.app')
      .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch previews' + response.statusText);
        }
        return response.json();
      })
      .then(previews => {  //updates state with fetched data
        setPreviews(previews)
      })
      .catch(error => {
        setError(error.toString());
      });
     [];
    })

    const handleImageClick = (preview) => { 
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
