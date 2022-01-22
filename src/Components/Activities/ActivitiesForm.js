import React, { useState, useEffect } from 'react';
import { dropzoneConfig, isEmptyList, listHasValues } from '../../Utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';

import {
  getActivities,
  createActivity,
  editActivity,
} from '../../Services/ActivitiesServices';
import { URLImageToBlob } from '../../Services/imageService';
import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import '../../Styles/FormStyles.css';
import '../../Styles/CategoriesFormStyles.css';
import LoadingBackdrop from '../CommonComponents/LoadingBackdrop';

const ActivitiesForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [activitiesDescription, setActivitiesDescription] = useState('');
  const [image, setImage] = useState('');
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const [imageError, setImageError] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;

  const getActivity = async () => {
    const resp = await getActivities(id);

    URLImageToBlob(resp.image).then((res) => {
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

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'El nombre es requerido';
    } else if (values.name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!activitiesDescription) {
      errors.description = 'La descripción es requerida';
    }
    if (!base64ImageFile) {
      errors.image = 'La imagen es requerida';
    }

    return errors;
  };

  const isEditingMode = () => id !== undefined;

  const updateActivitieswithCurrentData = () => {
    getActivity().then((res) => {
      const currentActivities = res;

      formik.values.name = currentActivities.name;
      setActivitiesDescription(currentActivities.description);
    });
  };

  const handleCKeditorChange = (e, editor) =>
    setActivitiesDescription(editor.getData());

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      activitiesDescription: '',
      image: '',
    },
    validate,
    onSubmit: (values) => handleSubmitbecategory(values),
  });

  useEffect(() => {
    imageValidation();
  }, [fileRejections]);

  useEffect(() => {
    if (isEditingMode()) updateActivitieswithCurrentData();
  }, []);

  const handleSubmitbecategory = async () => {
    const body = {
      name: formik.values.name,
      description: activitiesDescription,
      image: base64ImageFile,
    };

    if (id) {
      setIsLoading(true);
      editActivity(id, body).then((resp) => {
        setApiResponse(resp.data);
        setIsLoading(false);
        history.push('/backoffice/activities');
      });
    } else {
      setIsLoading(true);
      createActivity(body).then((resp) => {
        setApiResponse(resp.data);
        setIsLoading(false);
        history.push('/backoffice/activities');
      });
    }
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
            Formulario de {id ? 'edición' : 'creación'} de actividad
          </Typography>
          <Typography component="div" variant="h5">
            Nombre de la actividad
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
            Descripción
          </Typography>

          <CKEditor
            data={activitiesDescription}
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
            <p>Arrastra o haz click aqui para agregar Imagen ( .png o .jpg )</p>

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

          {imageError && (
            <Alert severity="warning"> Solo una imagen .jpg / .png</Alert>
          )}

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

export default ActivitiesForm;
