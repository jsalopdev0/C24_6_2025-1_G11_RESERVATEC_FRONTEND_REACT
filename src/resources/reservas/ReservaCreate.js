import React, { useState, useEffect } from 'react';
import {
  Create,
  SimpleForm,
  DateInput,
  ReferenceInput,
  AutocompleteInput,
  SelectInput,
  useNotify,
  useRedirect,
  required,
  useDataProvider,
  TextField,
  Labeled,
} from 'react-admin';

const ReservaCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();

  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [usuarioCode, setUsuarioCode] = useState('');

  const handleSubmit = async (values) => {
    try {
      const payload = {
        fecha: values.fecha,
        espacioId: values.espacioId,
        horarioId: values.horarioId,
        usuarioCode: usuarioCode,
      };

      const response = await fetch('http://localhost:8080/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Error al crear reserva');

      notify('Reserva creada exitosamente', { type: 'success' });
      redirect('/reservas');
    } catch (error) {
      notify('Error: ' + error.message, { type: 'error' });
    }
  };

  const handleUsuarioChange = (value) => {
    setUsuarioCode(value);
  };

  useEffect(() => {
    if (usuarioCode) {
      dataProvider
        .getOne('usuarios', { id: usuarioCode }) 
        .then(({ data }) => setSelectedUsuario(data))
        .catch(() => setSelectedUsuario(null));
    } else {
      setSelectedUsuario(null);
    }
  }, [usuarioCode, dataProvider]);

  return (
    <Create title="Crear Reserva para Usuario">
      <SimpleForm onSubmit={handleSubmit}>
        <ReferenceInput
          source="usuarioCode"
          reference="usuarios"
          label="Código del Estudiante"
          perPage={10}
        >
          <AutocompleteInput
            optionText="code"
            optionValue="code"
            onChange={handleUsuarioChange}
            validate={required()}
            fullWidth
          />
        </ReferenceInput>

        {selectedUsuario && (
          <>
            <Labeled label="Nombre">
              <TextField record={selectedUsuario} source="name" />
            </Labeled>
            <Labeled label="Carrera">
              <TextField record={selectedUsuario} source="carrera" />
            </Labeled>
           
          </>
        )}

        <DateInput source="fecha" label="Fecha" validate={required()} fullWidth />
        
        <ReferenceInput source="espacioId" reference="espacios" label="Espacio">
          <SelectInput optionText="nombre" validate={required()} fullWidth />
        </ReferenceInput>
        
        <ReferenceInput source="horarioId" reference="horarios" label="Horario">
          <SelectInput
            optionText={(record) => `${record.horaInicio} - ${record.horaFin}`}
            validate={required()}
            fullWidth
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export default ReservaCreate;
