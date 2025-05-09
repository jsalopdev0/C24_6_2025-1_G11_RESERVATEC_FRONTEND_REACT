import React from 'react';
import { Switch } from '@mui/material';
import { useRecordContext, useNotify, useRefresh } from 'react-admin';

const EditableAsistenciaSwitch = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const handleToggle = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/reservas/${record.id}/confirmar-asistencia`, {
         // const res = await fetch(`http://reservatec-tesis-backend-8asuen-298379-31-220-104-112.traefik.me/api/reservas/${record.id}/confirmar-asistencia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') || '{}').token}`,
        },
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || 'Error al confirmar asistencia');
      }

      notify('Asistencia confirmada');
      refresh(); // actualiza la lista
    } catch (error) {
      console.error('Error al confirmar asistencia:', error);
      notify(`${error.message}`, { type: 'error' });
    }
  };

  // Solo permite confirmar si está ACTIVA o CURSO
  const estadoValido = record.estado === 'ACTIVA' || record.estado === 'CURSO';
  const disabled = record.asistenciaConfirmada || !estadoValido;

  return (
    <Switch
      checked={!!record.asistenciaConfirmada}
      onChange={handleToggle}
      color="success"
      size="small"
      disabled={disabled}
    />
  );
};

export default EditableAsistenciaSwitch;

