import axios from 'axios';
import { errorAlert, successAlert } from './alertsService';

const TESTIMONIALS_URL = process.env.REACT_APP_TESTIMONIALS_URL;

export const createOrEditTestimonial = (id, body) => {
  if (id) {
    const response = updateTestimonial(id, body);

    return response;
  } else {
    const response = createTestimonial(body);

    return response;
  }
};

const createTestimonial = async (body) => {
  try {
    await axios.post(TESTIMONIALS_URL, body);
    successAlert('Testimonio creado satisfactoriamente');
  } catch {
    return errorAlert('Error al crear el testimonio');
  }
};
const updateTestimonial = async (id, body) => {
  try {
    await axios.patch(`${TESTIMONIALS_URL}/${id}`, body);
    successAlert('Testimonio editado satisfactoriamente');
  } catch {
    return errorAlert('Error al editar el testimonio');
  }
};

export const deleteTestimonial = async (id) => {
  try {
    const response = await axios.delete(`${TESTIMONIALS_URL}/${id}`);

    successAlert('Testimonio eliminado satisfactoriamente');

    return response;
  } catch {
    return errorAlert();
  }
};

export const getAllTestimonials = async () => {
  try {
    const response = await axios.get(TESTIMONIALS_URL);

    return response;
  } catch {
    return errorAlert();
  }
};

export const getTestimonial = async (id) => {
  try {
    const response = await axios.get(`${TESTIMONIALS_URL}/${id}`);

    return response;
  } catch {
    return errorAlert();
  }
};
