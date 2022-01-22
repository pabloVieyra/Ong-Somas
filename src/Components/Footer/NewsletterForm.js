import { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  Button,
  Grid,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { errorAlert } from '../../Services/alertsService';

const NewsletterForm = () => {
  const [subscribed, setSubscribed] = useState(false);
  const history = useHistory();
  const yupSchema = Yup.object().shape({
    email: Yup.string()
      .email('*Email inválido')
      .required('*El email es requerido'),
  });
  const initialValues = {
    email: '',
  };
  const formikOnSubmit = (_values) => {
    const token = localStorage.getItem('token');

    if (!token) {
      errorAlert('Error', 'Debes estar registrado para poder suscribirte');
      setTimeout(() => history.push('/login'), 2000);
    } else {
      try {
        setSubscribed(true);
        setTimeout(() => localStorage.setItem('subscribed', true), 5000);
        formik.resetForm();
      } catch (error) {
        formik.setFieldError('email', 'Error al suscribirse');
      } finally {
        formik.setSubmitting(false);
      }
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yupSchema,
    onSubmit: formikOnSubmit,
  });

  if (localStorage.getItem('subscribed')) {
    return null;
  }

  return !subscribed ? (
    <Container sx={{ my: '1rem' }}>
      <div>
        <a
          style={{
            textAlign: 'center',
            display: 'block',
            margin: '20px auto',
          }}>
          ¿Desea suscribirse para recibir noticias?
        </a>
      </div>
      <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
        <Grid container columnGap={1}>
          <FormControl size="small" variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              label="Email"
              name="email"
              size="small"
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </FormControl>
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            size="small"
            type="submit"
            variant="contained">
            Suscribirse
          </Button>
        </Grid>
        <FormHelperText
          error={formik.touched.email && Boolean(formik.errors.email)}
          sx={{ color: 'white !important' }}>
          {formik.errors.email}
        </FormHelperText>
      </form>
    </Container>
  ) : (
    <Container sx={{ my: '1rem', margin: 'auto', display: 'block' }}>
      <Typography gutterBottom component="p" variant="body1">
        Gracias por suscribirte!
      </Typography>
    </Container>
  );
};

export default NewsletterForm;
