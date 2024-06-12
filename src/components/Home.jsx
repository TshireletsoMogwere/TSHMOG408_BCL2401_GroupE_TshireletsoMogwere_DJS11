import React, { useEffect, useState } from "react";


function Home() {
    const [previews, setPreviews] = useState([])
    const [error, setError] = useState(null)

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

    return (
        <div className="container">
            {error ? (
                <div className="error">
                    <p>{error}</p>
                    </div>
            ) : (
                previews.map((preview, index) => (
                    <div className="block" key = {index}>
                        {/* <h3>{preview.id}</h3> */}
                        <h3>{preview.title}</h3>
                        {/* <p>{preview.description}</p> */}
                        {/* <h4>{preview.seasons}</h4> */}
                        <img src={preview.image} className="preview-image"/>
                        {/* <h4>{preview.genres}</h4>
                        <h4>{preview.updated}</h4> */}

                     </div>
                ))
            )}
        </div>
    );
    
}
export default Home
