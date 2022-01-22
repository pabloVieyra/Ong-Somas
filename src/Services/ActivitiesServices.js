import axios from 'axios';
import { errorAlert, successAlert } from './alertsService';

export const ACTIVITIES_URL = 'http://ongapi.alkemy.org/api/activities';

const getActivities = async (activitiesId) => {
  try {
    if (activitiesId == null) {
      const res = await axios.get(ACTIVITIES_URL);

      return res.data.data;
    } else {
      const res = await axios.get(`${ACTIVITIES_URL}/${activitiesId}`);

      return res.data.data;
    }
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener las Actividades');

    return err.data || err;
  }
};

const createActivity = async (activity) => {
  try {
    const res = await axios.post(ACTIVITIES_URL, activity);

    successAlert('Actividad creada correctamente');

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al crear la Actividad');

    return err.data || err;
  }
};

const editActivity = async (activityId, editActivity) => {
  try {
    const res = await axios.put(
      `${ACTIVITIES_URL}/${activityId}`,
      editActivity,
    );

    successAlert('Actividad actualizada correctamente');

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al editar la Actividad');

    return err.data || err;
  }
};

const deleteActivity = async (activityId) => {
  try {
    const res = await axios.delete(`${ACTIVITIES_URL}/${activityId}`);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al eliminar la Actividad');

    return err.data || err;
  }
};

export { getActivities, createActivity, editActivity, deleteActivity };
