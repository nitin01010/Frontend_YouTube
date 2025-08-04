import axios from 'axios';


//  GET AL VIDEO 
export const youtubeAllvideos = async () => {
  const response = await axios.get(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube`);
  return response.data;
};

// PLAY WITH VIDEO ID
export const findByIdVideoPlay = async ({ id }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/watch`, {
    id,
  });
  return response.data;
};

//  FIND BY CATEGORY 
export const findBycategory = async ({ category }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/category`, {
    category,
  });
  return response.data;
};

// SEARCH BY KEYWORD
export const findBySearch = async ({ search }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/search`, {
    search,
  });
  return response.data;
};

//  CREATE ACCOUNT
export const signinAccount = async ({ username, email, password }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/user/register`, {
    username,
    email,
    password
  });
  return response.data;
};

//  LOGIN ACCOUNT
export const loginAccount = async ({ email, password }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/user/login`, {
    email,
    password
  });
  return response.data;
};

// CREATE COMMENT
export const createComments = async ({ comments, videoId, authToken }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/comments`, {
    comments, videoId, authToken
  });
  return response.data;
};

// DELETE COMMENT
export const DeleteComments = async ({ userId,
  videoId,
  commentId, authToken }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/comment/delete`, {
    userId,
    videoId,
    commentId,
    authToken
  });
  return response.data;
};


// UPDATE COMMENT
export const UpdateComments = async ({ userId, videoId, commentId, authToken, updatedText }) => {
  const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/comment/edit`, {
    userId,
    videoId,
    commentId,
    authToken,
    updatedText
  });
  return response.data;
};

// CHECK AUTH USER IS VALID OR NOT 
export const handleAuth = async ({ authToken }) => {
  try {
    const response = await axios.get(`https://backendyoutube-production-1394.up.railway.app/api/v1/auth`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Auth failed:', error?.response?.data || error.message);
    return { success: false };
  }
};

//  LIKE A VIDOE 
export const handleLikeVideo = async ({ userId, videoId }) => {
  try {
    const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/video/like/increment`, {
      videoId,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Auth failed:', error?.response?.data || error.message);
    return { success: false };
  }
};

export const handleCreateChannle = async ({ id,channelName }) => {
  try {
    const response = await axios.post(`https://backendyoutube-production-1394.up.railway.app/api/v1/youtube/create/channle`, {
      id,
      channelName
    });
    return response.data;
  } catch (error) {
    console.error('Auth failed:', error?.response?.data || error.message);
    return { success: false };
  }
};