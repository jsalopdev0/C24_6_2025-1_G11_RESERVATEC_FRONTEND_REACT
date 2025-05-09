import React, { useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  Toolbar,
  SaveButton
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import EspaciosEditTitle from './components/EspaciosEditTitle';

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const EspaciosEdit = () => {
  const [fotoUrl, setFotoUrl] = useState('');

  return (
    <Edit title={<EspaciosEditTitle />}>
      <SimpleForm
        toolbar={<CustomToolbar />}
        redirect="list"
        defaultValues={(record) => {
          // Inicializa la vista previa directamente
          setFotoUrl(record?.foto || '');
          return record;
        }}
      >
        <TextInput source="nombre" label="Nombre" fullWidth />
        <NumberInput source="aforo" label="Aforo" fullWidth />
        <TextInput
          source="foto"
          label="Foto (URL)"
          fullWidth
          onChange={(e) => setFotoUrl(e.target.value)}
        />

        {/* Vista previa de la imagen */}
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

        <BooleanInput source="activo" label="Activo" />
      </SimpleForm>
    </Edit>
  );
};

export default EspaciosEdit;
