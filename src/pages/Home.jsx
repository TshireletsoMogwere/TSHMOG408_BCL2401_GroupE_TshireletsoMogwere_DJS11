import React, { useEffect, useState } from 'react';
import { fetchPreviews } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [previews, setPreviews] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // State to manage sorting order

  
    useEffect(() => { //hoook to handle side effects
      fetchPreviews().then(data => {
        // Sort previews alphabetically by title
        const sortedPreviews = data.sort((a, b) => {
          if (a.title < b.title) return sortOrder === 'asc' ? -1 : 1;
          if (a.title > b.title) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
        setPreviews(sortedPreviews);
      });
    }, [sortOrder]);

    const sortPreviews = (order) => {
      // Toggle sorting order
      setSortOrder(order);
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

