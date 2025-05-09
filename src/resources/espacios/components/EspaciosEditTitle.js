import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRedirect, useRecordContext } from 'react-admin';

const EspaciosEditTitle = () => {
  const redirect = useRedirect();
  const record = useRecordContext();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      padding={2}
    >
      <IconButton onClick={() => redirect('/espacios')} size="small">
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6">
        Editar espacio: {record?.nombre || ''}
      </Typography>
    </Box>
  );
};

export default EspaciosEditTitle;
