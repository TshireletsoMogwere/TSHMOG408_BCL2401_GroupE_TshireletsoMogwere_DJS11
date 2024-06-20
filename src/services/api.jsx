const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchPreviews = async () => {
  const response = await fetch(`${BASE_URL}`);
  return response.json();
};

export const fetchGenre = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/genre/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch genre data');
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching genre data:', error);
    return null; // or handle error state appropriately
  }
};

export const fetchShow = async (id) => {
  const response = await fetch(`${BASE_URL}/id/${id}`);
  return response.json();
};

