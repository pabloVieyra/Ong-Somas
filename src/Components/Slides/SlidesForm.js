import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container,
  TextField,
  InputLabel,
  Button,
  FormHelperText,
  FormControl,
  Tooltip,
  Box,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import '../../Styles/Slides/SlidesForm.css';
import * as service from '../../Services/slidesService';

const SlidesForm = () => {
  const { id } = useParams();
  const [slideError, setSlideError] = useState(null);
  const [formInitialValues, setFormInitialValues] = useState({
    name: '',
    order: '',
    image: '',
    description: '',
    responseError: '',
  });
  const acceptedFileExtensions = 'image/jpeg, image/png';
  const onDrop = async (acceptedFiles, fileRejections) => {
    if (fileRejections.length === 0) {
      try {
        const image = await service.imgToBase64(acceptedFiles[0]);

        formik.setFieldValue('image', image);
      } catch (error) {
        formik.setFieldError('image', error);
      }
    } else {
      formik.setFieldError('image', '*Tipo de Archivo no admitido');
    }
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: acceptedFileExtensions,
    maxFiles: 1,
    multiple: false,
    onDrop: onDrop,
  });
  const removeSlideImage = () => {
    formik.setFieldValue('image', '');
  };
  const yupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'El nombre debe tener mínimo 4 caracteres de largo')
      .required('*El nombre es requerido'),
    order: Yup.number().required('*El número de orden es requerido'),
    image: Yup.string().required('*La imagen es requerida'),
    description: Yup.string().required('*La descripción es requerida'),
  });
  const formikOnSubmit = (values) => {
    const { name, order, image, description } = values;
    const body = {
      name,
      order,
      image,
      description,
    };

    try {
      id ? service.updateSlide(id, body) : service.createSlide(body);
      formik.resetForm();
    } catch (error) {
      formik.setFieldError('responseError', 'Error al guardar el slide');
    } finally {
      formik.setSubmitting(false);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formInitialValues,
    validationSchema: yupSchema,
    onSubmit: formikOnSubmit,
  });
  const ckeditorConfig = {
    language: 'es',
    removePlugins: [
      'BlockQuote',
      'CKFinder',
      'CKFinderUploadAdapter',
      'CloudServices',
      'EasyImage',
      'Image',
      'ImageCaption',
      'ImageStyle',
      'ImageToolbar',
      'ImageUpload',
      'MediaEmbed',
      'Table',
      'TableToolbar',
    ],
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'undo',
      'redo',
    ],
  };
  const getInitialFormData = async () => {
    try {
      const slideResponse = await service.getSlide(id);
      const slideData = await slideResponse.data;
      const imageData = await service.URLImageToBlob(slideData.image);

      setFormInitialValues({
        name: slideData.name,
        order: slideData.order,
        image: imageData,
        description: slideData.description,
        responseError: '',
      });
    } catch (error) {
      setSlideError(error);
    }
  };

  useEffect(() => {
    if (id) {
      getInitialFormData();
    }
  }, [id]);

  if (slideError) {
    return (
      <Container maxWidth="md" sx={{ mb: '1rem' }}>
        <h2>Slide no encontrado</h2>
      </Container>
    );
  }

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
          <Typography component="div" variant="h4">
            Formulario de {id ? 'edición' : 'creación'} de Slide
          </Typography>
          <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
            <Typography component="div" variant="h5">
              Título del Slide
            </Typography>
            <TextField
              fullWidth
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              id="name"
              label="Nombre"
              margin="normal"
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Typography component="div" variant="h5">
              Orden
            </Typography>
            <TextField
              fullWidth
              error={formik.touched.order && Boolean(formik.errors.order)}
              helperText={formik.touched.order && formik.errors.order}
              id="order"
              label="Orden"
              margin="normal"
              name="order"
              type="number"
              value={formik.values.order}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Typography component="div" variant="h5">
              Imagen
            </Typography>
            <div
              {...getRootProps({
                className: `base-style ${isDragAccept ? 'accept-style' : ''} ${
                  isDragActive ? 'active-style' : ''
                } ${isDragReject ? 'reject-style' : ''}`,
              })}>
              <input {...getInputProps()} id="image" name="image" />
              <p>Arrastra tu imagen aquí o haz click para seleccionarla.</p>
              <em>(Solo imágenes *.jpeg y *.png serán aceptadas)</em>
            </div>
            <FormControl error={Boolean(formik.errors.image)}>
              <FormHelperText>{formik.errors.image}</FormHelperText>
            </FormControl>
            {formik.values.image ? (
              <aside>
                <Typography component="div" variant="h5">
                  Archivos subidos:
                </Typography>
                <div className="thumb" onClick={() => removeSlideImage()}>
                  <Tooltip title="Delete">
                    <div className="thumb-inner">
                      <div className="thumb-btn-container">
                        <DeleteIcon fontSize="large" htmlColor="white" />
                      </div>
                      <img className="img-preview" src={formik.values.image} />
                    </div>
                  </Tooltip>
                </div>
              </aside>
            ) : null}
            <div className="ck-content">
              <Typography component="div" variant="h5">
                Descripción
              </Typography>
              <CKEditor
                config={ckeditorConfig}
                data={formik.values.description}
                editor={ClassicEditor}
                onChange={(_event, editor) => {
                  formik.setFieldValue('description', editor.getData());
                }}
                onReady={(editor) => {
                  editor.editing.view.change((writer) => {
                    writer.setStyle(
                      'min-height',
                      '200px',
                      editor.editing.view.document.getRoot(),
                    );
                  });
                }}
              />
              <FormControl error={Boolean(formik.errors.description)}>
                <FormHelperText>{formik.errors.description}</FormHelperText>
              </FormControl>
            </div>
            {formik.errors.responseError && (
              <Alert severity="error">{formik.errors.responseError}</Alert>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                className="submit-btn"
                disabled={formik.isSubmitting}
                sx={{
                  width: { xs: '100%', sm: '200px' },
                }}
                type="submit"
                variant="contained">
                {id ? 'Actualizar Slide' : 'Crear Slide'}
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default SlidesForm;
