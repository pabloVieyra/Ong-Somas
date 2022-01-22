import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import {
  createOrEditTestimonial,
  getTestimonial,
} from '../../Services/testimonialsService';
import { listHasValues, dropzoneConfig, isEmptyList } from '../../Utils';
import LoadingBackdrop from '../CommonComponents/LoadingBackdrop';
import { URLImageToBlob } from '../../Services/imageService';
import '../../Styles/CategoriesFormStyles.css';
import '../../Styles/FormStyles.css';

const TestimonialForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const [imageError, setImageError] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [testimonialDescription, setTestimonialDescription] = useState('');
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;

  const getTestimonialById = async () => {
    const resp = await getTestimonial(id);

    URLImageToBlob(resp.data.data.image).then((res) => {
      const data = res;

      setImage(data);
      setBase64ImageFile(data);
    });

    return resp;
  };

  const handleDrop = (acceptedFiles, fileRejections) => {
    const imageFileWithPreview = addImagePreviewtoImageFile(acceptedFiles);

    setImage(imageFileWithPreview);
    if (isEmptyList(fileRejections)) imageFileToBase64File(acceptedFiles);
  };

  const imageFileToBase64File = (acceptedFiles) => {
    const reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const base64 = reader.result;

      setBase64ImageFile(base64);
    };
  };

  const addImagePreviewtoImageFile = (acceptedFiles) => {
    return acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
  };

  const handleCKeditorChange = (e, editor) => {
    const data = editor.getData();

    setTestimonialDescription(data);
  };

  const isEditingMode = () => id !== undefined;
  const updateTestimonialswithCurrentData = () => {
    getTestimonialById().then((resp) => {
      formik.values.name = resp.data.data.name;
      setTestimonialDescription(resp.data.data.description);
    });
  };

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  useEffect(() => {
    if (isEditingMode()) updateTestimonialswithCurrentData();
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'El nombre es requerido';
    } else if (values.name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!testimonialDescription) {
      errors.description = 'La descripción es requerida';
    }
    if (!base64ImageFile) {
      errors.image = 'La imagen es requerida';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
    },
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: multipleFiles,
    maxFiles,
    accept: validImages,
    onDrop: (acceptedFiles, fileRejections) =>
      handleDrop(acceptedFiles, fileRejections),
  });

  const imageValidation = () => {
    if (listHasValues(fileRejections)) {
      setImageError(true);

      return;
    }
    setImageError(false);
  };

  useEffect(() => {
    imageValidation();
  }, [fileRejections]);

  const handleSubmit = async () => {
    const body = {
      name: formik.values.name,
      description: testimonialDescription,
      image: base64ImageFile,
    };

    setIsLoading(true);
    createOrEditTestimonial(id, body).then((data) => {
      setIsLoading(false);
      history.push('/backoffice/testimonials');
    });
  };

  return (
    <div className="bckg">
      <LoadingBackdrop isLoading={isLoading} />
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
            {id ? 'Editar' : 'Añadir'} testimonio
          </Typography>
          <Typography component="div" variant="h5">
            Nombre del autor
          </Typography>

          <TextField
            autoComplete="off"
            label="Titulo"
            name="name"
            type="text"
            value={formik.values.name}
            variant="outlined"
            onChange={formik.handleChange}
          />

          {formik.errors.name && showErrorMessage(formik.errors.name)}

          <Typography component="div" variant="h5">
            Detalle de testimonio
          </Typography>

          <CKEditor
            data={testimonialDescription}
            editor={ClassicEditor}
            onChange={(e, editor) => handleCKeditorChange(e, editor)}
          />

          {formik.errors.description &&
            showErrorMessage(formik.errors.description)}

          <Typography component="div" variant="h5">
            Imagen
          </Typography>

          <Box
            className="dropzone-container"
            component="div"
            {...getRootProps()}>
            <input {...getInputProps()} />
            <p>
              Arrastra una imagen o haz click aqui para agregarla ( .png o .jpg
              )
            </p>
            <div className="thumbs-container">
              <div className="thumb">
                <div className="thumbInner">
                  {listHasValues(image) && (
                    <img
                      className="thumb-image"
                      src={id ? base64ImageFile : image[0].preview}
                    />
                  )}
                </div>
              </div>
            </div>
          </Box>

          {formik.errors.image && showErrorMessage(formik.errors.image)}
          {imageError && showErrorMessage('Solo una imagen .jpg / .png')}

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

export default TestimonialForm;
