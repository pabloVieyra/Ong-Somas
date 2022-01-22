import axios from 'axios';
import { errorAlert } from './alertsService';

const ORGANIZATION_URL = process.env.REACT_APP_GET_ORGANIZATION;

const getWelcomeMessage = async () => {
  try {
    const response = await axios(ORGANIZATION_URL);
    const welcomeText = response.data.data.welcome_text;

    return welcomeText;
  } catch (err) {
    errorAlert(
      'Error',
      err.response.data.message || 'Error al obtener el mensaje de bienvenida',
    );

    return 'Mensaje de muestra';
  }
};

const getOrganizationData = async () => {
  try {
    const response = await axios(ORGANIZATION_URL);
    const organizationName = response.data.data.name;

    return organizationName;
  } catch (err) {
    errorAlert('Error', err.response.data.message);

    return err.response.data || err;
  }
};

const editWelcomeMessage = async (welcomeMessage) => {
  const name = await getOrganizationData();
  const body = {
    name,
    welcome_text: welcomeMessage,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_EDIT_ORGANIZATION}`,
      body,
    );

    return response.data;
  } catch (err) {
    errorAlert('Error', err.response.data.message);

    return err.response.data || err;
  }
};

export { getWelcomeMessage, editWelcomeMessage };
