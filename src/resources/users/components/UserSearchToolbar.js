import React, { useState } from 'react';
import { TopToolbar, useListContext } from 'react-admin';
import { TextField as MuiTextField } from '@mui/material';

const UserSearchToolbar = () => {
  const { setFilters } = useListContext();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    setFilters(val ? { q: val } : {});
  };

  return (
    <TopToolbar sx={{ justifyContent: 'flex-start' }}>
      <MuiTextField
        variant="standard"
        size="small"
        label="Buscar"
        value={value}
        onChange={handleChange}
        placeholder="Nombre, Código o Email"
        sx={{ ml: 1, width: 280 }}
      />
    </TopToolbar>
  );
};

export default UserSearchToolbar;
