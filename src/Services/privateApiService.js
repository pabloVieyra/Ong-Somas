import axios from 'axios';

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');
  const auth = 'Bearer ' + token;

  return token !== null ? auth : null;
};

const config = {
  headers: {
    Group: 105,
    Authorization: getAuthorizationHeader(),
  },
};


const Get = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', config)
    // eslint-disable-next-line
    .then((res) => console.log(res))
    // eslint-disable-next-line
    .catch((err) => console.log(err));
};

export const privatePost = async (url, data) => {
  return await axios
    .post(url, data, config)
    // eslint-disable-next-line
    .then((response) => console.log(response))
    // eslint-disable-next-line
    .catch((error) => console.log(error));
};

export const privateDelete = async (path, id) => {
  try {
    const response = await axios.delete(`${path}/${id}`, config);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const PrivateGet = async (route, id = null) => {
  const fullRoute = id ? `${route}/${id}` : route;

  try {
    return await axios.get(fullRoute, config);
  } catch (err) {
    return err;
  }
};

export const privatePUT = async (path, id, body) => {
  try {
    const response = await axios.put(`${path}/${id}`, body, config);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const privatePATCH = async (path, id, body) => {
  try {
    const response = await axios.patch(`${path}/${id}`, body, config);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export default Get;
