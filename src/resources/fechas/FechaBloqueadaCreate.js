import React from 'react';
import {
  Create,
  SimpleForm,
  DateInput,
  TextInput,
  SelectInput,
  BooleanInput,
  useDataProvider,
  useNotify,
  useRedirect,
  required,
  useGetList,
  CheckboxGroupInput,
  FormDataConsumer,
} from 'react-admin';

const opcionesTipo = [
  { id: 'FERIADO', name: 'FERIADO' },
  { id: 'VACACIONES', name: 'VACACIONES' },
  { id: 'EVENTO', name: 'EVENTO' },
  { id: 'MANTENIMIENTO', name: 'MANTENIMIENTO' },
  { id: 'OTRO', name: 'OTRO' },
];

export const FechaBloqueadaCreate = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();
  const { data: espacios = [] } = useGetList('espacios');

  const handleSubmit = async (values) => {
    const { bloquearTodos, espaciosSeleccionados, ...rest } = values;

    try {
      if (bloquearTodos) {
        const { data: todos } = await dataProvider.getList('espacios', {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'ASC' },
          filter: {},
        });

        await Promise.all(
          todos.map((esp) =>
            dataProvider.create('fechas-bloqueadas', {
              data: { ...rest, espacio: { id: esp.id } },
            })
          )
        );

        notify('Fechas bloqueadas para todos los espacios', { type: 'success' });
      } else if (espaciosSeleccionados?.length) {
        await Promise.all(
          espaciosSeleccionados.map((id) =>
            dataProvider.create('fechas-bloqueadas', {
              data: { ...rest, espacio: { id } },
            })
          )
        );
        notify('Fechas bloqueadas para espacios seleccionados', { type: 'success' });
      } else {
        notify('Selecciona al menos un espacio o marca "todos"', { type: 'warning' });
        return;
      }

      redirect('/fechas-bloqueadas');
    } catch (error) {
      notify('Error al crear fechas', { type: 'error' });
    }
  };

  return (
    <Create title="Crear Fecha Bloqueada">
      <SimpleForm onSubmit={handleSubmit}>
        <DateInput
          source="fechaInicio"
          label="Inicio"
          fullWidth
          required
          min={new Date().toISOString().split('T')[0]}
        />
        <DateInput
          source="fechaFin"
          label="Fin"
          fullWidth
          required
          min={new Date().toISOString().split('T')[0]}
        />
        <TextInput source="motivo" label="Motivo" fullWidth validate={required()} />
        <SelectInput
          source="tipoBloqueo"
          label="Tipo de Bloqueo"
          choices={opcionesTipo}
          validate={required()}
        />

        <FormDataConsumer>
          {({ formData }) =>
            !formData.bloquearTodos && (
              <CheckboxGroupInput
                source="espaciosSeleccionados"
                choices={espacios.map((e) => ({ id: e.id, name: e.nombre }))}
                label="Seleccionar Espacios"
                optionText="name"
                optionValue="id"
                sx={{
                  '& .MuiFormGroup-root': {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  },
                }}
              />
            )
          }
        </FormDataConsumer>

        <BooleanInput source="bloquearTodos" label="Aplicar a todos los espacios" />
      </SimpleForm>
    </Create>
  );
};
