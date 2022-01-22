import axios from 'axios';
import { errorAlert, successAlert } from './alertsService';

const USER_URL = 'http://ongapi.alkemy.org/api/users';

export const createOrEditUsers = (id, body) => {
  if (id) {
    const response = updateUsers(id, body);

    return response;
  } else {
    const response = createUsers(body);

    return response;
  }
};

const createUsers = async (body) => {
  try {
    await axios.post(USER_URL, body);
  } catch {
    return errorAlert();
  }
};
const updateUsers = async (id, body) => {
  try {
    await axios.put(`${USER_URL}/${id}`, body);
  } catch {
    return errorAlert();
  }
};

export const deleteUsers = async (id) => {
  try {
    const response = await axios.delete(`${USER_URL}/${id}`);

    successAlert('Usuario eliminado correctamente');

    return response;
  } catch {
    return errorAlert('Error en la eliminacion del usuario');
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(USER_URL);

    return response;
  } catch {
    return errorAlert();
  }
};

export const getUsersById = async (id) => {
  try {
    const response = await axios.get(`${USER_URL}/${id}`);

    return response;
  } catch {
    return errorAlert();
  }
};

export const getUsersByKeyword = async (keyword) => {
  try {
    const response = await axios.get(`${USER_URL}?search=${keyword}`);

    return response.data;
  } catch (error) {
    console.error(error.config);
  }
};
