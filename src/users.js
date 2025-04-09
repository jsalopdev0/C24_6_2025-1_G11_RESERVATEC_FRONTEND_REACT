import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="code" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="rol" />
      <TextField source="carrera" />
    </Datagrid>
  </List>
);
