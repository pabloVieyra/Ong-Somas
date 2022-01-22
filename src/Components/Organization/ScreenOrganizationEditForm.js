import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import {
  Button,
  Typography,
  Alert,
  TextField,
  Paper,
  Container,
} from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import validationSchema from './validationSchema';
import { getOrganization } from '../../Services/organizationService';
import LoaderSpinner from '../CommonComponents/LoaderSpinner';
import Swal from 'sweetalert2';

function ScreenOrganizationEditForm() {
  const [organizationData, setOrganizationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrganization().then((res) => {
      formik.values.name = res.data.name;
      // formik.values.logo = res.data.logo;
      formik.values.welcome_text = res.data.welcome_text;
      formik.values.short_description = res.data.short_description;
      formik.values.long_description = res.data.long_description;
      formik.values.facebook_url = res.data.facebook_url;
      formik.values.instagram_url = res.data.instagram_url;
      formik.values.linkedin_url = res.data.linkedin_url;
      setOrganizationData(res.data);
      setIsLoading(false);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const handleChange = (e, editor) => {
    const data = editor.getData();

    formik.setFieldValue('short_description', data);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      logo: '',
      welcome_text: '',
      long_description: '',
      short_description: '',
      facebook_url: '',
      instagram_url: '',
      linkedin_url: '',
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <div className="bckg">
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          marginBlock: '4rem',
          marginInline: 'auto',
          width: {
            xs: '400px',
            sm: '600px',
          },
          justifySelf: 'center',
          alignSelf: 'center',
        }}>
        <Typography
          align="center"
          component="div"
          style={{ marginBottom: '3rem' }}
          variant="h4">
          Actualizar datos de la organización
        </Typography>

        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={formik.handleSubmit}>
          <Typography component="div" variant="h5">
            Nombre de la ONG
          </Typography>
          <TextField
            error={formik.touched.name && Boolean(formik.errors.name)}
            id="name"
            placeholder="Somos más"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name &&
            formik.errors.name &&
            showErrorMessage(formik.errors.name)}

          <Typography component="div" variant="h5">
            Logo
          </Typography>
          <div {...getRootProps()}>
            <input
              id="logo"
              name="logo"
              value={formik.values.logo}
              onChange={formik.handleChange}
              {...getInputProps()}
              onBlur={formik.handleBlur}
            />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>

          <Typography component="div" variant="h5">
            Texto de bienvenida
          </Typography>
          <TextField
            error={
              formik.touched.welcome_text && Boolean(formik.errors.welcome_text)
            }
            id="welcome_text"
            placeholder="Texto de bienvenida"
            value={formik.values.welcome_text}
            onChange={formik.handleChange}
          />
          {formik.touched.welcome_text &&
            formik.errors.welcome_text &&
            showErrorMessage(formik.errors.welcome_text)}

          <Typography component="div" variant="h5">
            Descripción corta
          </Typography>
          <Container>
            <CKEditor
              required
              data={formik.values.short_description}
              editor={ClassicEditor}
              id="short_description"
              name="short_description"
              type="text"
              onChange={handleChange}
            />
          </Container>
          {formik.touched.short_description &&
            formik.errors.short_description &&
            showErrorMessage(formik.errors.short_description)}

          <Typography component="div" variant="h5">
            Descripción larga
          </Typography>
          <TextField
            multiline
            error={
              formik.touched.long_description &&
              Boolean(formik.errors.long_description)
            }
            id="long_description"
            placeholder="Texto de bienvenida"
            value={formik.values.long_description}
            onChange={formik.handleChange}
          />
          {formik.touched.long_description &&
            formik.errors.long_description &&
            showErrorMessage(formik.errors.long_description)}

          <Typography component="div" variant="h5">
            Links a redes sociales
          </Typography>
          <TextField
            error={
              formik.touched.facebook_url && Boolean(formik.errors.facebook_url)
            }
            id="facebook_url"
            placeholder="Facebook"
            value={formik.values.facebook_url}
            onChange={formik.handleChange}
          />
          {formik.touched.facebook_url &&
            formik.errors.facebook_url &&
            showErrorMessage(formik.errors.facebook_url)}

          <TextField
            error={
              formik.touched.instagram_url &&
              Boolean(formik.errors.instagram_url)
            }
            id="instagram_url"
            placeholder="Instagram"
            value={formik.values.instagram_url}
            onChange={formik.handleChange}
          />
          {formik.touched.instagram_url &&
            formik.errors.instagram_url &&
            showErrorMessage(formik.errors.instagram_url)}

          <TextField
            error={
              formik.touched.linkedin_url && Boolean(formik.errors.linkedin_url)
            }
            id="linkedin_url"
            placeholder="Linkedin"
            value={formik.values.linkedin_url}
            onChange={formik.handleChange}
          />
          {formik.touched.linkedin_url &&
            formik.errors.linkedin_url &&
            showErrorMessage(formik.errors.linkedin_url)}

          <Button
            className="submit-btn"
            sx={{
              width: { xs: '100%', sm: '200px' },
            }}
            type="submit"
            variant="contained">
            Enviar
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default ScreenOrganizationEditForm;
