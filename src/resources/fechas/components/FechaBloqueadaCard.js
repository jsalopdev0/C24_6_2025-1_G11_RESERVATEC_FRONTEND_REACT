import React from 'react';
import { useListContext } from 'react-admin';
import { Card, CardContent, Typography, Grid, Box, Switch, FormControlLabel } from '@mui/material';

const FechaBloqueadaCardList = () => {
  const { data, isLoading } = useListContext();

  if (isLoading) return <p>Cargando...</p>;

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{item.espacio?.nombre}</Typography>
                <Typography variant="body2">
                  {item.tipoBloqueo} — {item.motivo}
                </Typography>
                <Typography variant="body2">
                  Desde: {item.fechaInicio} <br />
                  Hasta: {item.fechaFin}
                </Typography>
                <Box mt={1}>
                  <FormControlLabel
                    control={<Switch checked={item.activo} disabled />}
                    label="Activo"
                  />
                  <FormControlLabel
                    control={<Switch checked={item.ignorar} disabled />}
                    label="Ignorar"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FechaBloqueadaCardList;
