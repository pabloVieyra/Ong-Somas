import * as Yup from 'yup';

export const UserFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'El nombre debe tener al menos 4 caracteres')
    .required('Este campo es obligatorio'),
  email: Yup.string()
    .email('Email inválido')
    .required('Este campo es obligatorio'),
  role: Yup.string().required('Este campo es obligatorio'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('Este campo es obligatorio'),
});
