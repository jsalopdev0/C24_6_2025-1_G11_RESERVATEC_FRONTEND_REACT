import React, { useState } from 'react';
import { TopToolbar, useListContext, CreateButton } from 'react-admin';
import { TextField as MuiTextField } from '@mui/material';

const ReservaActions = () => {
  const { setFilters } = useListContext();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setFilters(val ? { q: val } : {});
  };

  return (
    <TopToolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
      <MuiTextField
        variant="standard"
        size="small"
        label="Buscar"
        value={value}
        onChange={handleChange}
        placeholder="Usuario o espacio"
        sx={{ width: 280 }}
      />
      <CreateButton />
    </TopToolbar>
  );
};

export default ReservaActions;
