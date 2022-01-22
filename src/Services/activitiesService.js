import Axios from 'axios';
import Swal from 'sweetalert2';
import { errorAlert } from './alertsService';

const ACTIVITIES_URL = process.env.REACT_APP_ACTIVITIES_URL;

export const getAllActivities = async () => {
  try {
    const res = await Axios.get(ACTIVITIES_URL);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getActivitiesByKeyword = async (keywords) => {
  try {
    const res = await Axios.get(`${ACTIVITIES_URL}?search=${keywords}`);

    return res.data.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener la Actividad');

    return err.data || err;
  }
};

export const getActivityById = async (id) => {
  try {
    const { data } = await Axios.get(`${ACTIVITIES_URL}/${id}`);

    return data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener la Actividad');

    return err.data || err;
  }
};

export const createOrUpdateActivity = (id, data) => {
  if (!id) {
    createActivity(data);
  } else {
    updateActivity(id, data);
  }
};

const createActivity = (data) => {
  Axios.post(ACTIVITIES_URL, data);
  Swal.fire('success');
  console.log(data);
};

const updateActivity = async (id, data) => {
  await Axios.patch(`${ACTIVITIES_URL}/${id}`, data).then(() => {
    console.log(data);
    Swal.fire('success');
  });
};
