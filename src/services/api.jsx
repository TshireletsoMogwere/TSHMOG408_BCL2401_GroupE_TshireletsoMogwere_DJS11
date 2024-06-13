const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchPreviews = async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  

  export const fetchGenre = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/genre/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const fetchShow = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/id/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };