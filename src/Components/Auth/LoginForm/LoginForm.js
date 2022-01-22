import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  CardHeader,
  Box,
} from '@mui/material';
import {
  containsSixCharacters,
  containsOneNumber,
  containSpecialCharacter,
  containsOneLetter,
  validEmail,
} from '../../../Utils/Validations/userValidations';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import '../../../Styles/FormStyles.css';
import Swal from 'sweetalert2';

const validate = (values) => {
  let errors = {};

  if (!values.password) {
    errors.password = 'Por favor, complete el campo.';
  } else if (containsSixCharacters(values.password)) {
    errors.password = 'Debe contener 6 caracteres';
  } else if (!containsOneNumber(values.password)) {
    errors.password = 'Debe contener al menos un numero';
  } else if (!containSpecialCharacter(values.password)) {
    errors.password = 'Debe contener 1 caracter especial';
  } else if (!containsOneLetter(values.password)) {
    errors.password = 'Debe contener al menos una letra';
  }
  if (!values.email) {
    errors.email = 'Por favor, complete el campo.';
  } else if (!validEmail(values.email)) {
    errors.email = 'Correo electrónico invalido.';
  }

  return errors;
};

const LoginForm = () => {
  const [userValues, setUserValues] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const SignupForm = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validate,
      onSubmit: (values) => {
        setUserValues({
          ...userValues,
          email: values.email,
          password: values.password,
        });

        if (
          values.email === 'user@user.com' &&
          values.password === 'user@1234'
        ) {
          localStorage.setItem('token', 1);
          Swal.fire({
            icon: 'success',
            text: 'Logeado como usuario',
          });
          history.push('/');

          return;
        }
        if (
          values.email === 'admin@admin.com' &&
          values.password === 'admin@1234'
        ) {
          localStorage.setItem('token', 2);
          Swal.fire({
            icon: 'success',
            text: 'Logeado como administrador',
          });
          history.push('/');

          return;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Email y/o contraseña incorrectos',
          });
          setUserValues({ email: '', password: '' });

          return;
        }
      },
    });
    const showErrors = (errorAttribute) => {
      if (formik.touched[errorAttribute] && formik.errors[errorAttribute]) {
        return (
          <Alert
            align="justify"
            severity="error"
            sx={{ width: '90%', height: 'fit-content' }}>
            {formik.errors[errorAttribute]}
          </Alert>
        );
      }
    };

    const titleValidation = () => {
      if (history.location.pathname === '/login') {
        return 'Iniciar sesion';
      } else if (history.location.pathname === '/register') {
        return 'Registrate';
      }
    };

    console.log(history.location);

    return (
      <>
        {localStorage.getItem('token') && <Redirect to="/" />}
        <form className="login-user-form" onSubmit={formik.handleSubmit}>
          <div className="login-user-form__left">
            <div className="login-user-form__left--img">
              <img src="http://ongapi.alkemy.org/storage/SisQ2VMbze.png" />
            </div>
          </div>
          <div className="login-user-form__right">
            <div className="login-user-form__right--container">
              <CardHeader title={titleValidation()} />
              <FormControl
                sx={{ width: '100%', margin: '55px 0', display: 'flex' }}>
                <InputLabel htmlFor="email">Correo electronico</InputLabel>
                <Input
                  id="email"
                  margin="dense"
                  name="email"
                  placeholder="Ingrese su correo electronico"
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  }
                  type="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {showErrors('email')}
              </FormControl>
              <FormControl
                sx={{ width: '100%', margin: '55px 0', display: 'flex' }}>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input
                  id="password"
                  margin="dense"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  startAdornment={
                    <InputAdornment position="start">
                      <VisibilityOutlinedIcon />
                    </InputAdornment>
                  }
                  type="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {showErrors('password')}
              </FormControl>
              {history.location.pathname === '/register' && (
                <FormControl
                  sx={{ width: '100%', margin: '55px 0', display: 'flex' }}>
                  <InputLabel htmlFor="password">
                    Confirmar contraseña
                  </InputLabel>
                  <Input
                    id="password"
                    margin="dense"
                    name="password"
                    placeholder="Confirme su contraseña"
                    startAdornment={
                      <InputAdornment position="start">
                        <VisibilityOutlinedIcon />
                      </InputAdornment>
                    }
                    type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {showErrors('password')}
                </FormControl>
              )}
              <FormControl>
                <Button
                  className="submit-btn"
                  sx={{ alignItem: 'center' }}
                  type="submit"
                  variant="contained">
                  Enviar
                </Button>
                {history.location.pathname === '/login' && (
                  <Link to="/register">Registrarme</Link>
                )}
                {history.location.pathname === '/register' && (
                  <Link to="/login">Ya tengo una cuenta</Link>
                )}
              </FormControl>
            </div>
          </div>
        </form>
      </>
    );
  };

  return (
    <Container maxWidth="none" sx={{ padding: '0 !important' }}>
      <SignupForm />
    </Container>
  );
};

export default LoginForm;
