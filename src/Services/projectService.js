import Axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://ongapi.alkemy.org/api/projects';

export const createOrUpdateProject = (id, newFormValues) => {
  if (!id) {
    createProject(newFormValues);
  } else {
    updateProject(id, newFormValues);
  }
};

const createProject = (newFormValues) => {
  Axios.post(baseUrl, newFormValues);
  Swal.fire('success');
  console.log(newFormValues);
};

const updateProject = async (id, newFormValues) => {
  await Axios.patch(`${baseUrl}/${id}`, newFormValues).then(() => {
    console.log(newFormValues);
    Swal.fire('success');
  });
};
