import React from 'react';
import {
  List,
  useListContext,
} from 'react-admin';
import { Box, Card, CardContent, Typography, Grid, Switch, FormControlLabel } from '@mui/material';
import FechaFiltro from './components/FechaFiltro';

const TarjetaFeriado = ({ item }) => (
  <Card sx={{ m: 1, width: 300 }}>
    <CardContent>
      <Typography variant="h6">{item.espacio.nombre}</Typography>
      <Typography variant="body2">{item.tipoBloqueo} — {item.motivo}</Typography>
      <Typography variant="body2">Desde: {item.fechaInicio}</Typography>
      <Typography variant="body2">Hasta: {item.fechaFin}</Typography>
      <Box display="flex" gap={2} mt={2}>
        <FormControlLabel control={<Switch checked={item.activo} disabled />} label="Activo" />
        <FormControlLabel control={<Switch checked={item.ignorar} disabled />} label="Ignorar" />
      </Box>
    </CardContent>
  </Card>
);

const FeriadoGrid = () => {
  const { data, filterValues } = useListContext();

  const filtrado = data?.filter((item) => {
    const fecha = new Date(item.fechaInicio + 'T00:00:00');
    const anioOk = filterValues.anio ? fecha.getFullYear() === Number(filterValues.anio) : true; 
    const mesOk = filterValues.mes ? fecha.getMonth() + 1 === Number(filterValues.mes) : true;
    const tipoOk = filterValues.tipoBloqueo ? item.tipoBloqueo === filterValues.tipoBloqueo : true;
    return anioOk && mesOk && tipoOk;
  }) || [];
  

  return (
    <Grid container spacing={2}>
      {filtrado.map((item) => (
        <Grid item key={item.id}>
          <TarjetaFeriado item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export const FechaBloqueadaList = () => (
  <List title="Fechas Bloqueadas" filters={FechaFiltro} exporter={false}>
    <FeriadoGrid />
  </List>
);
