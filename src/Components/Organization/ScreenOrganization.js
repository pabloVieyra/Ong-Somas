import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Paper } from '@mui/material';
import { getOrganization } from '../../Services/organizationService';

const OrganizationInfo = () => {
  const [organizationData, setOrganizationData] = useState({});

  useEffect(() => {
    getOrganization(1).then((res) => setOrganizationData(res.data));
  }, []);

  const { name, logo, short_description, long_description, welcome_text } =
    organizationData;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '3rem',
          gap: '2rem',
        }}>
        <Typography variant="subtitle1">Nombre de la ONG</Typography>
        <Typography variant="h4">
          {name || 'No se encuentra el nombre'}
        </Typography>

        <Typography variant="subtitle1">Texto de bienvenida</Typography>
        <Typography variant="h4">
          {welcome_text || 'No se encuentra el texto de bienvenida'}
        </Typography>

        <Typography variant="subtitle1">Logo</Typography>

        {logo ? (
          <div>
            <img
              alt="logo-de-ong"
              src={logo}
              style={{ maxWidth: '100%', height: '200px' }}
            />
          </div>
        ) : (
          <Typography variant="h6">No se encuentra el logo</Typography>
        )}

        <Typography variant="subtitle1">Descripción corta</Typography>
        <Typography variant="body1">
          {short_description || 'No se cargó una descripción corta.'}
        </Typography>

        <Typography variant="subtitle1">Descripción larga</Typography>
        <Typography variant="body1">
          {long_description || 'No se cargó una descripción larga.'}
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            style={{ textDecoration: 'none', color: 'inherit' }}
            to="/backoffice/organization/edit">
            <Button size="large" variant="contained">
              Editar
            </Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default OrganizationInfo;
