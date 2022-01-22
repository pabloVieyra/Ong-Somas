import axios from 'axios';

const SLIDES_URL = process.env.REACT_APP_SLIDES_URL;

export const getAllSlides = async () => {
  try {
    const response = await axios.get(SLIDES_URL);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
};

export const createSlide = async (body) => {
  try {
    const response = await axios.post(SLIDES_URL, body);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
};

export const getSlide = async (id) => {
  try {
    const response = await axios.get(`${SLIDES_URL}/${id}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
};

export const updateSlide = async (id, body) => {
  try {
    const response = await axios.patch(`${SLIDES_URL}/${id}`, body);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
};

export const deleteSlide = async (id) => {
  try {
    const response = await axios.delete(`${SLIDES_URL}/${id}`);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
};

export const imgToBase64 = (blob) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

export const URLImageToBlob = async (URLImage) => {
  try {
    const response = await axios.get(URLImage, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: response.data.type });
    const image = imgToBase64(blob, (e) => e.target.result);

    return image;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
};
