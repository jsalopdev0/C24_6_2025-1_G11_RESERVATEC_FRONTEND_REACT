import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
} from 'react-admin';
import UserSearchToolbar from './components/UserSearchToolbar';

export const UserList = () => (
  <List
    filters={null}
    actions={<UserSearchToolbar />}
    filterMode="server"
    disableSyncWithLocation
    exporter={false}
  >
    <Datagrid bulkActionButtons={false} rowClick={false}>
      <TextField source="code" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="carrera" />
    </Datagrid>
  </List>
);
