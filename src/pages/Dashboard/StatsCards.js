import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const cards = [
  { label: 'Usuarios', value: 0 },
  { label: 'Reservas', value: 0 },
  { label: 'Espacios', value: 0 },
];

const StatsCards = () => (
  <Grid container spacing={2}>
    {cards.map((card, i) => (
      <Grid item xs={12} md={4} key={i}>
        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6">{card.label}</Typography>
            <Typography variant="h4" fontWeight="bold">{card.value}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default StatsCards;
