import axios from 'axios';
import { errorAlert, successAlert } from './alertsService';

export const urlEditNews = process.env.REACT_APP_PUBLIC_NEWS_URL;
export const urlCreateNews = process.env.REACT_APP_PUBLIC_NEWS_URL;

const NEWS_URL = process.env.REACT_APP_NEWS_URL;

const getAllNews = async () => {
  try {
    const res = await axios.get(NEWS_URL);

    return res.data.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener Novedades');

    return err.data || err;
  }
};

const getNewsByKeyword = async (keywords) => {
  try {
    const res = await axios.get(`${NEWS_URL}?search=${keywords}`);

    return res.data.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener Novedad');

    return err.data || err;
  }
};

const getNewsById = async (newsId) => {
  try {
    const res = await axios.get(`${NEWS_URL}/${newsId}`);

    return res.data.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener Novedad');

    return err.data || err;
  }
};

const createNews = async (news) => {
  try {
    const res = await axios.post(NEWS_URL, news);

    successAlert('Nodedad creada satisfactoriamente');

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al crear Novedad');

    return err.data || err;
  }
};

const editNews = async (newsId, editedNews) => {
  try {
    const res = await axios.put(`${NEWS_URL}/${newsId}`, editedNews);

    successAlert('Nodedad editada satisfactoriamente');

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al editar Novedad');

    return err.data || err;
  }
};

const deleteNews = async (newsId) => {
  try {
    const res = await axios.delete(`${NEWS_URL}/${newsId}`);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al eliminar Novedad');

    return err.data || err;
  }
};

export {
  getAllNews,
  getNewsByKeyword,
  getNewsById,
  createNews,
  editNews,
  deleteNews,
};
