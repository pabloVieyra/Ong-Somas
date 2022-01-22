import Swal from 'sweetalert2';

const confirmButtonColor = '#3085d6';
const cancelButtonColor = '#d33';

export const errorAlert = (title, text) => {
  Swal.fire({
    confirmButtonColor: confirmButtonColor,
    icon: 'error',
    text,
    title,
  });
};

export const infoAlert = (title, text) => {
  Swal.fire({
    confirmButtonColor: confirmButtonColor,
    icon: 'info',
    text,
    title,
  });
};

export const questionAlert = async (title, text) => {
  const answer = await Swal.fire({
    cancelButtonColor: cancelButtonColor,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: confirmButtonColor,
    icon: 'question',
    showCancelButton: true,
    text,
    title,
  });

  return answer.isConfirmed;
};

export const successAlert = (title, text) => {
  Swal.fire({
    confirmButtonColor: confirmButtonColor,
    icon: 'success',
    text,
    title,
  });
};
