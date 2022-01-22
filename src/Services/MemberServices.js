import axios from 'axios';

const TESTIMONIAL_URL = 'http://ongapi.alkemy.org/api/members/';

export const createOrEditTestimonial = (id, body) => {
  if (id) {
    const response = updateTestimonial(id, body);

    return response;
  } else {
    const response = createTestimonial(body);

    return response;
  }
};

const createTestimonial = async (body) =>
  await axios.post(TESTIMONIAL_URL, body);

const updateTestimonial = async (id, body) =>
  await axios.patch(`${TESTIMONIAL_URL}${id}`, body);
