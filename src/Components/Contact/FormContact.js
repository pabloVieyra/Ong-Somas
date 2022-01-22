import React, { useState } from 'react';
import { useFormik } from 'formik';
import { emailRegex } from '../../Utils';
import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import '../../Styles/FormStyles.css';
import {
  sendContactData,
  editContactData,
} from '../../Services/contactsService';
import '../../Styles/CategoriesFormStyles.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormContact = ({ id }) => {
  const [apiResponse, setApiResponse] = useState({});
  const history = useHistory();

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'El nombre es requerido';
    } else if (values.name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!values.email) {
      errors.email = 'La descripción es requerida';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Tiene que ser un Email';
    }
    if (!values.phone) {
      errors.phone = 'El telefono es requerido';
    } else if (isNaN(values.phone)) {
      errors.phone = 'Tiene que ser un numero';
    } else if (values.phone.length < 8) {
      errors.phone = 'El numero debe contener al menos 8 caracteres';
    }
    if (!values.message) {
      errors.message = 'El mensaje es requerido';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validate,
    onSubmit: (values) => handleSubmitContact(values),
  });

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  const createOrUpdateContactData = (id, body) => {
    if (!id) {
      sendContactData(body);
    } else {
      editContactData(id, body);
    }
  };

  const handleSubmitContact = async () => {
    const body = {
      name: formik.values.name,
      email: formik.values.email,
      phone: formik.values.phone,
      message: formik.values.message,
    };

    Swal.fire('Gracias', 'por contactarnos', 'success');
    history.push('/');
    // createOrUpdateContactData(id, body).then((resp) =>
    //   setApiResponse(resp.data),
    // );
  };

  return (
    <div className="bckg">
      <Box
        noValidate
        className="form-container"
        component="form"
        onSubmit={formik.handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '3rem',
            gap: '2rem',
          }}>
          <Typography component="div" variant="h5">
            Nombre
          </Typography>
          <TextField
            autoComplete="off"
            name="name"
            placeholder="Dante"
            type="text"
            value={formik.values.name}
            variant="outlined"
            onChange={formik.handleChange}
          />
          {formik.errors.name && showErrorMessage(formik.errors.name)}
          <Typography component="div" variant="h5">
            Email
          </Typography>
          <TextField
            autoComplete="off"
            name="email"
            placeholder="ejemplo@ejemplo.com"
            type="email"
            value={formik.values.email}
            variant="outlined"
            onChange={formik.handleChange}
          />
          {formik.errors.email && showErrorMessage(formik.errors.email)}
          <Typography component="div" variant="h5">
            Teléfono
          </Typography>
          <TextField
            autoComplete="off"
            name="phone"
            placeholder="1234-5678"
            type="text"
            value={formik.values.phone}
            variant="outlined"
            onChange={formik.handleChange}
          />
          {formik.errors.phone && showErrorMessage(formik.errors.phone)}
          <Typography component="div" variant="h5">
            Mensaje
          </Typography>
          <TextField
            autoComplete="off"
            name="message"
            placeholder="Escriba su mensaje aquí..."
            type="text"
            value={formik.values.message}
            variant="outlined"
            onChange={formik.handleChange}
          />
          {formik.errors.message && showErrorMessage(formik.errors.message)}
          <Button
            className="submit-btn"
            sx={{
              width: { xs: '100%', sm: '200px' },
            }}
            type="submit"
            variant="contained">
            Enviar
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default FormContact;
