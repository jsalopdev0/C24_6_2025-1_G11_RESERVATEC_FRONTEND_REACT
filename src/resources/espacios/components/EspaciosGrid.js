import React from 'react';
import { Grid, Box } from '@mui/material';
import { useListContext, TopToolbar, CreateButton } from 'react-admin';
import EspacioCard from './EspacioCard';

const EspaciosGrid = () => {
  const { data, isLoading } = useListContext();

  if (isLoading || !data) return <>Cargando...</>;

  return (
    <Box p={2}>
      {/* Botón de Crear */}
      <Box mb={2}>
        <TopToolbar>
          <CreateButton />
        </TopToolbar>
      </Box>

      {/* Grilla de tarjetas */}
      <Grid container spacing={2}>
        {data.map(record => (
          <Grid item xs={12} sm={6} md={3} key={record.id}>
            <EspacioCard record={record} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EspaciosGrid;
