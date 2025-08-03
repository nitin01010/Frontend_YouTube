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
  commentId, authToken }) => {
  const response = await axios.post('http://localhost:8080/api/v1/youtube/comment/delete', {
    userId,
    videoId,
    commentId,
    authToken
  });
  return response.data;
};

export const UpdateComments = async ({ userId,videoId,commentId, authToken, updatedText }) => {
  const response = await axios.post('http://localhost:8080/api/v1/youtube/comment/edit', {
    userId,
    videoId,
    commentId,
    authToken,
    updatedText
  });
  return response.data;
};

export const handleAuth = async ({ authToken }) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/auth', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('Auth failed:', error?.response?.data || error.message);
    return { success: false };
  }
};