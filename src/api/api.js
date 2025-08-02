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

export const findBycategory = async ({ category }) => {
  const response = await axios.post('http://localhost:8080/api/v1/youtube/category', {
    category,
  });
  return response.data;
};

export const findBySearch = async ({ search }) => {
  const response = await axios.post('http://localhost:8080/api/v1/youtube/search', {
    search,
  });
  return response.data;
};

export const signinAccount = async ({ username, email, password }) => {
  const response = await axios.post('http://localhost:8080/api/v1/user/register', {
    username,
    email,
    password
  });
  return response.data;
};

export const loginAccount = async ({ email, password }) => {
  const response = await axios.post('http://localhost:8080/api/v1/user/login', {
    email,
    password
  });
  return response.data;
};

export const createComments = async ({ comments, videoId, authToken }) => {
  const response = await axios.post('http://localhost:8080/api/v1/youtube/comments', {
    comments, videoId, authToken
  });
  return response.data;
};

export const DeleteComments = async ({ userId,
  videoId,
  commentId, }) => {
  const response = await axios.post('http://localhost:8080/api/v1/youtube/comment/delete', {
    userId,
    videoId,
    commentId,
  });
  return response.data;
};