import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../../Styles/FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import CardHeader from '@mui/material/CardHeader';

import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import '../../Styles/CategoriesFormStyles.css';
import { useDropzone } from 'react-dropzone';
import { createOrEditTestimonial } from '../../Services/MemberServices';
import thumb from './membersCreateEdit.module.css';

function MembersCreateEdit() {
  const { id } = useParams();
  const [apiResponse, setApiResponse] = useState({});
  const [formValues, setFormValues] = useState({
    name: '',
    image: '',
    description: '',
    facebookUrl: '',
    linkedinUrl: '',
  });

  const [dropZoneFiles, setDropZoneFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpg',
    onDrop: (acceptedFiles) => {
      setFormValues({
        ...formValues,
        image: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      });
      setDropZoneFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  const thumbs = dropZoneFiles.map((file) => (
    <div key={file.name} style={thumb}>
      <div className="thumb-inner">
        <img className="img" src={file.preview} />
      </div>
    </div>
  ));
  const avoidMemoryLeak = () =>
    dropZoneFiles.forEach((file) => URL.revokeObjectURL(file.preview));

  useEffect(
    () => () => {
      avoidMemoryLeak();
    },
    [dropZoneFiles],
  );
  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  const descriptionChange = (e, editor) => {
    const data = editor.getData();

    setFormValues({ ...formValues, description: data });
  };
  const nameChange = (e, values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    setFormValues({ ...formValues, name: e.target.value });
  };
  const facebookChange = (e) => {
    setFormValues({ ...formValues, facebookUrl: e.target.value });
  };
  const linkedInChange = (e) => {
    setFormValues({ ...formValues, linkedinUrl: e.target.value });
  };
  const handleClick = () => {
    const dataTags = formValues.description;
    const cleanTags = dataTags.replace(/<[^>]+>/g, '');
    const body = {
      name: formValues.name,
      image: formValues.image,
      description: cleanTags,
      facebookUrl: formValues.facebookUrl,
      linkedinUrl: formValues.linkedinUrl,
    };

    createOrEditTestimonial(id, body).then((resp) => setApiResponse(resp.data));
  };

  return (
    <div className="bckg">
      <Formik
        formValues={{
          name: '',
          image: '',
          description: '',
          facebookUrl: '',
          linkedinUrl: '',
        }}
        validate={(values) => {
          let errors = {};

          if (!values.name) {
            errors.name = 'Please submit a email';
          }

          if (values.image === null) {
            errors.image = 'Please submit a image';
          } else if (values.image) {
            errors.image = false;
          }

          if (!values.description) {
            errors.description = 'Please submit a description';
          }
        }}
        onSubmit={(values) => {
          handleClick(values);
        }}>
        {({ errors, touched }) => {
          return (
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
                  Formulario de {id ? 'edición' : 'creación'} de miembro
                </Typography>

                <Typography component="div" variant="h5">
                  Nombre del miembro
                </Typography>
                <TextField
                  fullWidth
                  component={TextField}
                  error={Boolean(touched.name && errors.name)}
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="complet name"
                  type="text"
                  value={formValues.name}
                  onChange={(e, values) => nameChange(e, values)}
                />
                {errors.name && showErrorMessage(errors.name)}
                <Typography component="div" variant="h5">
                  Descripción
                </Typography>

                <CKEditor
                  required
                  component={TextField}
                  data={formValues.description}
                  editor={ClassicEditor}
                  label="Description"
                  onChange={descriptionChange}
                />

                {errors.description && showErrorMessage(errors.description)}
                <Typography component="div" variant="h5">
                  Foto de perfil
                </Typography>

                <Box
                  {...getRootProps({ className: 'dropzone' })}
                  className="dropzone-container"
                  component="div">
                  <input
                    {...getInputProps({
                      id: 'image',
                      name: 'image',
                      display: 'block',
                    })}
                  />
                  <p style={{ textAlign: 'center' }}>
                    Drag and drop some files here, or click to select files
                  </p>
                  <aside className="thumbs-container">{thumbs}</aside>
                </Box>

                {errors.image && showErrorMessage(errors.image)}

                <Typography component="div" variant="h5">
                  URL de Facebook
                </Typography>

                <TextField
                  fullWidth
                  component={TextField}
                  error={Boolean(touched.facebookUrl && errors.facebookUrl)}
                  id="facebookUrl"
                  label="facebookUrl"
                  name="facebookUrl"
                  placeholder="facebookUrl"
                  type="text"
                  value={formValues.facebookUrl}
                  variant="outlined"
                  onChange={(e, value) => facebookChange(e, value)}
                />
                {errors.facebookUrl && showErrorMessage(errors.facebookUrl)}

                <Typography component="div" variant="h5">
                  URL de Linkedin
                </Typography>
                <TextField
                  fullWidth
                  component={TextField}
                  error={Boolean(touched.linkedinUrl && errors.linkedinUrl)}
                  id="linkedinUrl"
                  label="linkedinUrl"
                  name="linkedinUrl"
                  placeholder="linkedinUrl"
                  type="text"
                  value={formValues.linkedinUrl}
                  variant="outlined"
                  onChange={linkedInChange}
                />
                {errors.linkedinUrl && showErrorMessage(errors.linkedinUrl)}
                <Button
                  className="submit-btn"
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                  }}
                  type="submit"
                  variant="contained"
                  onClick={() => handleClick()}>
                  Enviar
                </Button>
              </Paper>
            </Box>
          );
        }}
      </Formik>
    </div>
  );
}

export default MembersCreateEdit;
