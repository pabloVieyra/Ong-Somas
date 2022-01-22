import React, { useState } from 'react';
import '../../Styles/FormStyles.css';
import { Field, Formik } from 'formik';
import '../../Styles/CategoriesFormStyles.css';
import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import { UserFormSchema } from './UserFormSchema';
import { CustomDropzone } from './CustomDropzone';
import s from '../../Styles/UsersForm/CreateEditUserFormStyle.module.css';

const UserForm = ({ user = null }) => {
  const [success, setSuccess] = useState({
    status: false,
    errors: null,
  });
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    roleId: '',
  });
  const userValues = user
    ? { ...user, role: user.role_id }
    : {
        name: '',
        email: '',
        password: '',
        role: '',
        image: '',
      };

  const handleSubmit = async (values, formik) => {};

  const setImage = (image) => {
    userValues.image = image;
  };

  const clearImage = () => {
    userValues.image = '';
  };

  return (
    <div className="bckg">
      <Formik
        initialValues={userValues}
        validationSchema={UserFormSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Box noValidate className="form-container" component="form">
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '3rem',
                gap: '2rem',
              }}>
              <Typography component="div" variant="h4">
                {user ? 'Editar' : 'Crear'} usuario
              </Typography>

              <Typography component="div" variant="h5">
                Nombre de usuario
              </Typography>
              <TextField
                id="name"
                name="name"
                placeholder="User name"
                type="text"
              />
              {errors.name && touched.name ? (
                <Alert severity="warning">{errors.name}</Alert>
              ) : null}

              <Typography component="div" variant="h5">
                Correo electrónico
              </Typography>
              <TextField
                id="email"
                name="email"
                placeholder="User email"
                type="text"
              />
              {errors.email && touched.email ? (
                <Alert severity="warning">{errors.email}</Alert>
              ) : null}
              <Typography component="div" variant="h5">
                Rol
              </Typography>

              <Field
                as="select"
                className={s.input_field}
                id="role"
                name="role"
                placeholder="User email"
                type="text">
                <option disabled value="">
                  Seleccione rol
                </option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </Field>
              {errors.role && touched.role ? (
                <Alert severity="warning">{errors.role}</Alert>
              ) : null}

              <Typography component="div" variant="h5">
                Contraseña
              </Typography>
              <TextField
                id="password"
                name="password"
                placeholder="User password"
                type="text"
              />
              {errors.password && touched.password ? (
                <Alert severity="warning">{errors.password}</Alert>
              ) : null}

              <Typography component="div" variant="h5">
                Imagen de usuario
              </Typography>
              <CustomDropzone setImage64={setImage} />

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  className="submit_btn"
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                  }}
                  type="submit"
                  variant="contained">
                  {user ? 'Actualizar usuario' : 'Crear usuario'}
                </Button>
              </div>
              {success.status && (
                <Alert severity="success">{`Usuario ${
                  user ? 'editado' : 'guardado'
                } con éxito`}</Alert>
              )}
              {success.errors && (
                <Alert severity="error">
                  Error en el envío del formulario. Comprueba la información
                </Alert>
              )}
            </Paper>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
