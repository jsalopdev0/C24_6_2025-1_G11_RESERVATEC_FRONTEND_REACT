import React from 'react';
import { Switch } from '@mui/material';
import { useRecordContext, useUpdate } from 'react-admin';

const EditableBooleanField = ({ source }) => {
  const record = useRecordContext();
  const [update] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update(
      'fechas-bloqueadas',
      { id: record.id, data: { ...record, [source]: !record[source] } },
      {
        onError: (error) => console.error('Error al actualizar:', error),
      }
    );
  };

  return (
    <Switch
      checked={!!record[source]}
      onChange={handleToggle}
      color="primary"
      size="small"
    />
  );
};

export default EditableBooleanField;
