import React, { useState, useEffect } from 'react';
import { dropzoneConfig, isEmptyList, listHasValues } from '../../Utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';

import {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
} from '../../Services/CategoriesService';
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

const CategoriesForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [categoryDescription, setCategoryDescription] = useState('');
  const [image, setImage] = useState('');
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;

  const getCategory = async () => {
    const resp = await getCategories(id);

    URLImageToBlob(resp.image).then((res) => {
      const data = res;

      setImage(data);
      setBase64ImageFile(data);
    });

    return resp;
  };

  const handleDrop = (acceptedFiles, fileRejections) => {
    const imageFileWithPreview = addImagePreviewtoImageFile(acceptedFiles);

    console.log(imageFileWithPreview);
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
    if (!categoryDescription) {
      errors.description = 'La descripción es requerida';
    }
    if (!base64ImageFile) {
      errors.image = 'La imagen es requerida';
    }

    return errors;
  };

  const isEditingMode = () => id !== undefined;

  const updateCategorieswithCurrentData = () => {
    getCategory().then((res) => {
      const currentCategories = res;

      formik.values.name = currentCategories.name;
      setCategoryDescription(currentCategories.description);
    });
  };

  const handleCKeditorChange = (e, editor) =>
    setCategoryDescription(editor.getData());

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      categoryDescription: '',
      image: '',
    },
    validate,
    onSubmit: (values) => handleSubmitbecategory(values),
  });

  useEffect(() => {
    imageValidation();
  }, [fileRejections]);

  useEffect(() => {
    if (isEditingMode()) updateCategorieswithCurrentData();
  }, []);

  const handleSubmitbecategory = async () => {
    const body = {
      name: formik.values.name,
      description: categoryDescription,
      image: base64ImageFile,
    };

    if (id) {
      setIsLoading(true);
      editCategory(id, body).then((resp) => {
        setIsLoading(false);
        setApiResponse(resp.data);
        history.push('/backoffice/categories');
      });
    } else {
      setIsLoading(true);
      createCategory(body).then((resp) => {
        setIsLoading(false);
        setApiResponse(resp.data);
        history.push('/backoffice/categories');
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
            Formulario de {id ? 'edición' : 'creación'} de categoría
          </Typography>
          <Typography component="div" variant="h5">
            Nombre de categoría
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
            data={categoryDescription}
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

export default CategoriesForm;
