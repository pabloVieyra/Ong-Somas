import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Alert } from '@mui/material';
import { blobToBase64 } from '../../Utils/imageToBase64';
import { styleCustomDropzone } from '../../Styles/UsersForm/styleCustomDropzone';

export const CustomDropzone = ({ setImage64 = () => {} }) => {
  const [image, setImage] = useState({
    file: null,
    preview: null,
    error: null,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    multiple: false,
    maxFiles: 1,

    onDrop: (acceptedImage) => {
      if (
        acceptedImage.length > 0 &&
        (acceptedImage[0].type === 'image/png' ||
          acceptedImage[0].type === 'image/jpeg')
      ) {
        setImage({
          file: acceptedImage[0],
          preview: URL.createObjectURL(acceptedImage[0]),
          error: null,
        });
      } else {
        setImage({
          file: null,
          preview: null,
          error: 'El archivo debe ser una imagen .png/.jpg',
        });
      }
    },
    onSubmit: () => {
      setImage({
        ...image,
        preview: null,
      });
    },
  });

  useEffect(() => {
    if (image.file) {
      setDataImage();
    }
  }, [image.file]);

  const setDataImage = async () => {
    const base64 = await blobToBase64(image.file);

    setImage64(base64);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <section className="container">
            <div {...getRootProps({ style: styleCustomDropzone })}>
              <input {...getInputProps()} />
              <h3>Drag and drop some files here, or click to select files *</h3>
              <p>Only png and jpg accepted*</p>
            </div>
          </section>
        </Grid>
        <Grid item md={4} xs={12}>
          <div className="dropzone">
            {image.preview && (
              <img
                alt="preview"
                fit="cover"
                src={image.preview}
                style={{
                  objectFit: 'scale-down',
                  width: '100%',
                  maxHeight: '160px',
                }}
              />
            )}
          </div>
        </Grid>
      </Grid>
      {image.error && <Alert severity="warning">{image.error}</Alert>}
    </>
  );
};
