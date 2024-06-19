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
          <div className="sort-buttons">
            <button onClick={() => sortPreviews('asc')}>Sort A-Z</button>
            <button onClick={() => sortPreviews('desc')}>Sort Z-A</button>
          </div>
          <ul>
            {previews.map(preview => (
              <li key={preview.id}>
                <Link to={`/show/${preview.id}`}>
                  <h2>{preview.title}</h2>
                  <img src={preview.image} alt={preview.title} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default Home;
    