import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchIcons = async (term, limit, offset) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/icons/getIcons`, { params: { term, limit, offset } });

    return data;
  } catch (error) {
    console.error('Error fetching icons:', error);

    const message =
      error.response?.data?.message ||
      error.message ||
      'Unknown error fetching icons';
    throw new Error(message);
  }
};
