import axios from 'axios';

export const youtubeAllvideos = async () => {
  const response = await axios.get('http://localhost:8080/api/v1/youtube');
  return response.data;
};

export const findByIdVideoPlay = async ({ id }) => {
  const response = await axios.post('http://localhost:8080/api/v1/youtube/watch', {
    id,
  });
  return response.data;
};