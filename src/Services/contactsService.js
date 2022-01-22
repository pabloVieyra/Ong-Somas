import axios from 'axios';

const CONTACTS_URL = process.env.REACT_APP_CONTACTS;

const getContactInfo = async () => {
  try {
    const res = await axios.get(CONTACTS_URL);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const sendContactData = async (data) => {
  try {
    const res = await axios.post(CONTACTS_URL, data);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editContactData = async (id, data) => {
  try {
    const res = await axios.put(`${CONTACTS_URL}/${id}`, data);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteContactData = async (id) => {
  try {
    const res = await axios.delete(`${CONTACTS_URL}/${id}`);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export { sendContactData, getContactInfo, editContactData, deleteContactData };
