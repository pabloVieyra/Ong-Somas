import * as yup from 'yup';

const re =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const validationSchema = yup.object({
  name: yup.string().required('Este campo es obligatorio'),
  logo: yup.string().required('Una imagen es requerida'),
  welcome_text: yup
    .string()
    .min(20, 'El texto de bienvenida debe ser de al menos 20 caracteres')
    .required('Este campo es obligatorio'),
  short_description: yup.string().required('Este campo es obligatorio'),
  long_description: yup.string().required('Este campo es obligatorio'),
  facebook_url: yup
    .string()
    .matches(re, 'URL inválida')
    .required('Este campo es obligatorio'),
  instagram_url: yup
    .string()
    .matches(re, 'URL inválida')
    .required('Este campo es obligatorio'),
  linkedin_url: yup
    .string()
    .matches(re, 'URL inválida')
    .required('Este campo es obligatorio'),
});

export default validationSchema;
