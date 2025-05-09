import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { cardStyle, mediaStyle } from './espacioCardStyles';

const EspacioCard = ({ record }) => {
  if (!record) return null;

  return (
    <Card component={Link} to={`/espacios/${record.id}`} sx={cardStyle}>
      {record.foto && (
        <CardMedia
          component="img"
          image={record.foto}
          alt={record.nombre}
          sx={mediaStyle}
        />
      )}
      <CardContent>
        <Typography variant="h6">{record.nombre}</Typography>
        <Typography variant="body2" color="text.secondary">
          Aforo: {record.aforo}
        </Typography>
        <Chip
          label={record.activo ? 'Activo' : 'Inactivo'}
          color={record.activo ? 'success' : 'default'}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};

export default EspacioCard;
