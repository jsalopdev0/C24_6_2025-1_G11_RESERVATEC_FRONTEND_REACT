import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
} from 'react-admin';
import EditableAsistenciaSwitch from './components/EditableAsistenciaSwitch';
import ReservaActions from './components/ReservaActions';

export const ReservaList = () => (
  <List
    title="Reservas"
    exporter={false}
    actions={<ReservaActions />}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="usuarioCode" label="Código" />
      <TextField source="usuarioNombre" label="Usuario" />
      <TextField source="espacioNombre" label="Espacio" />
      <DateField source="fecha" label="Fecha" />
      <TextField source="horarioInicio" label="Hora Inicio" />
      <TextField source="horarioFin" label="Hora Fin" />
      <TextField source="estado" label="Estado" />
      <EditableAsistenciaSwitch source="asistenciaConfirmada" />
    </Datagrid>

  </List>
);
