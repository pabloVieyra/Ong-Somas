import axios from 'axios';

const COMMENTS_URL = 'http://ongapi.alkemy.org/api/comments';

const getAllComments = async () => {
  try {
    const response = await axios(COMMENTS_URL);

    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export { getAllComments };
