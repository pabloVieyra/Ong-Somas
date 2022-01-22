import axios from 'axios';

const CONTACT_URL = 'http://ongapi.alkemy.org/api/contact';

export const gcreateContact = (id, body) => {
  const response = createContact(body);

  return response;
};

const createContact = async (body) => await axios.post(CONTACT_URL, body);
