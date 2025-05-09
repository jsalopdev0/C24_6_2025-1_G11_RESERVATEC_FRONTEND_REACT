import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const ReservationsChart = () => {
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
      {
        label: 'Reservas',
        data: [3, 7, 4, 9, 6],
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Reservas por Mes
        </Typography>
        <Line data={data} />
      </CardContent>
    </Card>
  );
};

export default ReservationsChart;
