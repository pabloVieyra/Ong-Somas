import axios from 'axios';

const getOrganization = async (id) => {
  try {
    const url = id
      ? `${process.env.REACT_APP_GET_ORGANIZATION}/${id}`
      : process.env.REACT_APP_GET_ORGANIZATION;
    const response = await axios(url);

    return response.data;
  } catch (err) {
    return err.respose.data;
  }
};
const editOrganization = async (id, body) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_EDIT_ORGANIZATION}/${id}`,
      body,
    );

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const createOrganization = async (body) => {
  try {
    const response = await axios.post(process.env.CREATE_ORGANIZATION, body);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export { getOrganization, editOrganization, createOrganization };
