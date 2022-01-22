import React, { useState } from 'react';
import '../../../Styles/FormStyles.css';
import { Formik, Field, Form } from 'formik';
import { SignupSchema } from './SignupSchema';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import s from '../../../assets/terms_and_conditions.pdf';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RegisterForm = () => {
  const [open, setOpen] = React.useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const previousPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const nextPage = () => {
    if (pageNumber === numPages) return;
    setPageNumber(pageNumber + 1);
  };

  const handleClose = (e) => {
    if (e.target.textContent === 'Aceptar') {
      console.log('Términos aceptados');
    } else {
      console.log('Términos rechazados');
    }
    setOpen(false);
  };

  const userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    delete values.confirmPassword;
    setOpen(true);
  };

  const showAlert = (type, text) => {
    return <Alert severity={type}>{text}</Alert>;
  };

  return (
    <>
      <Formik
        initialValues={userData}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form className="form-container">
            <h1>Register</h1>
            <label htmlFor="firstName">First Name</label>
            <Field
              className="input-field"
              id="firstName"
              name="firstName"
              placeholder="Your first name"
            />
            {errors.firstName && touched.firstName
              ? showAlert('warning', errors.firstName)
              : null}
            <label htmlFor="lastName">Last Name</label>
            <Field
              className="input-field"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
            />
            {errors.lastName && touched.lastName
              ? showAlert('warning', errors.lastName)
              : null}
            <label htmlFor="email">Email</label>
            <Field
              className="input-field"
              id="email"
              name="email"
              placeholder="example@example.com"
              type="email"
            />
            {errors.email && touched.email
              ? showAlert('warning', errors.email)
              : null}
            <label htmlFor="password">Password</label>
            <Field
              className="input-field"
              id="password"
              name="password"
              placeholder="Your password"
              type="text"
            />
            {errors.password && touched.password
              ? showAlert('warning', errors.password)
              : null}
            <label htmlFor="confirmPassword">Confirm password</label>
            <Field
              className="input-field"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              type="text"
            />
            {errors.confirmPassword && touched.confirmPassword
              ? showAlert('warning', errors.confirmPassword)
              : null}
            <button className="submit-btn" disabled={!errors} type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>
      <Dialog keepMounted open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {'¿Acepta los términos y condiciones?'}
        </DialogTitle>
        <DialogContent>
          <Document file={s} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={0.8} />
          </Document>
        </DialogContent>
        <BottomNavigation
          showLabels
          sx={{
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
          }}>
          <BottomNavigationAction
            icon={<ArrowBackIosNewIcon />}
            label="Anterior"
            onClick={previousPage}
          />
          <p style={{ paddingInline: '1rem', alignSelf: 'center' }}>
            Página {pageNumber} de {numPages}
          </p>
          <BottomNavigationAction
            icon={<ArrowForwardIosIcon />}
            label="Siguiente"
            onClick={nextPage}
          />
        </BottomNavigation>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={(e) => handleClose(e)}>Aceptar</Button>
          <Button onClick={(e) => handleClose(e)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterForm;
