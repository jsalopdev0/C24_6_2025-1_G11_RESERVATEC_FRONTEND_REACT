import React, { useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  useNotify,
  useCreate
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const EspaciosCreate = () => {
  const notify = useNotify();
  const navigate = useNavigate();
  const [create] = useCreate();

  const [fotoUrl, setFotoUrl] = useState('');

  const handleSubmit = async (data) => {
    try {
      await create(
        'espacios',
        { data },
        {
          onSuccess: () => {
            notify('Espacio creado correctamente', { type: 'success' });
            navigate('/espacios');
          },
          onError: () => {
            notify('Error al crear espacio', { type: 'error' });
          }
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  };

  return (
    <Create title="Crear Espacio">
      <SimpleForm onSubmit={handleSubmit}>
        <TextInput source="nombre" label="Nombre del espacio" fullWidth />
        <NumberInput source="aforo" label="Aforo máximo" fullWidth />
        <TextInput
          source="foto"
          label="URL de la foto"
          fullWidth
          onChange={(e) => setFotoUrl(e.target.value)}
        />

        {/* Preview de imagen si hay URL */}
        {fotoUrl && (
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Vista previa:
            </Typography>
            <Box
              component="img"
              src={fotoUrl}
              alt="Vista previa"
              sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 2 }}
            />
          </Box>
        )}

        <BooleanInput source="activo" label="Activo" defaultValue={true} />
      </SimpleForm>
    </Create>
  );
};

export default EspaciosCreate;
