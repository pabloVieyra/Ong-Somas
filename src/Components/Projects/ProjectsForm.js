import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { dropzoneConfig, isEmptyList } from '../../Utils/index';
import { createOrUpdateProject } from '../../Services/projectService';
import { CustomDropzone } from '../Users/CustomDropzone';
import { useDropzone } from 'react-dropzone';
import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import '../../Styles/CategoriesFormStyles.css';
import '../../Styles/FormStyles.css';
// import '../../Styles/ProjectsForm.css';

const ProjectsForm = ({ id }) => {
  const [projectDueDate, setProjectDueDate] = useState('');

  const [projectFormValues, setProjectFormValues] = useState({
    name: id ? id.data.name : '',
    description: id ? id.data.description : '',
    dueDate: id ? id.data.dueDate : '',
    image: id ? id.data.name : null,
  });
  const [filesImages, setFilesImages] = useState([]);
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const [projectsDescription, setProjectsDescription] = useState('');
  const handleDrop = (acceptedFiles, fileRejections) => {
    const imageFileWithPreview = addImagePreviewtoImageFile(acceptedFiles);

    setFilesImages(imageFileWithPreview);
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

  const { getRootProps, getInputProps } = useDropzone({
    multiple: multipleFiles,
    maxFiles: maxFiles,
    accept: validImages,
    onDrop: (acceptedFiles, fileRejections) =>
      handleDrop(acceptedFiles, fileRejections),
  });

  const imagePreview = filesImages.map((file) => (
    <div key={file.name} className="image">
      <div className="image-inner">
        <img className="preview-image" src={file.preview} />
      </div>
    </div>
  ));

  const avoidMemoryLeaks = () =>
    filesImages.forEach((file) => URL.revokeObjectURL(file.preview));

  const showError = (errors, attribute, type) => (
    <ErrorMessage
      component={() => <Alert severity="warning">{errors[attribute]}</Alert>}
      name={attribute}
    />
  );

  useEffect(
    () => () => {
      avoidMemoryLeaks();
    },
    [filesImages],
  );

  const handleCKeditorChange = (e, editor) => {
    let dataDescription = editor.getData();

    setProjectsDescription(dataDescription);

    console.log(dataDescription);
  };

  const handleDueDateChange = (e, value) => {
    setProjectDueDate(e.target.value);
    console.log(projectDueDate);
  };

  const handleClick = (values) => {
    let newFormValues = {
      name: values.name,
      description: projectsDescription,
      dueDate: JSON.stringify(projectDueDate),
      image: base64ImageFile,
    };

    createOrUpdateProject(id, newFormValues);
  };

  return (
    <div className="bckg">
      <Formik
        initialValues={projectFormValues}
        validate={(values) => {
          let errors = {};

          if (!values.name) {
            errors.name = 'These camps are required';
          }
          if (!values.image) {
            errors.image = 'Please submit a image';
          }
          if (!projectsDescription) {
            errors.description = 'These camps are required';
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleClick(values);
        }}>
        {({ values, handleChange, errors, handleSubmit }) => {
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
                <CardHeader title={id ? 'Edit Projects' : 'Create Projects'} />

                <Typography component="div" variant="h5">
                  Title
                </Typography>
                <TextField
                  fullWidth
                  component={TextField}
                  error={errors.name}
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="Activity Title"
                  type="text"
                  value={values.name}
                  variant="outlined"
                  onChange={handleChange}
                />
                {errors.name && showError(errors, 'name')}
                <Typography component="div" variant="h5">
                  Descripcion
                </Typography>
                <CKEditor
                  data={values.description}
                  editor={ClassicEditor}
                  errors={errors.description}
                  id="description"
                  label="description"
                  name="description"
                  onChange={(e, editor) => {
                    handleCKeditorChange(e, editor);
                  }}
                />
                {errors.description && showError(errors, 'description')}
                <Typography component="div" variant="h5">
                  Due date
                </Typography>

                <TextField
                  component={TextField}
                  data={values.dueDate}
                  type="date"
                  onChange={(e, data) => {
                    handleDueDateChange(e, data);
                  }}
                />
                <Typography component="div" variant="h5">
                  Image
                </Typography>

                <CustomDropzone />

                {errors.image && showError(errors, 'image')}
                <Button
                  className="submit-btn"
                  sx={{
                    width: { xs: '100%', sm: '200px' },
                  }}
                  type="submit"
                  variant="contained">
                  Send
                </Button>
              </Paper>
            </Box>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProjectsForm;
