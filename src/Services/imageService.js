import axios from 'axios';

const imgToBase64 = (blob) => {
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

const URLImageToBlob = async (URLImage) => {
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

export { imgToBase64, URLImageToBlob };
