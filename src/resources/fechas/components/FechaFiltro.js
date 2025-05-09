import React from 'react';
import { SelectInput } from 'react-admin';

const currentYear = new Date().getFullYear();
const anios = Array.from({ length: 6 }, (_, i) => {
  const year = currentYear - 2 + i;
  return { id: year, name: year.toString() };
});

const meses = [
  { id: 1, name: 'Enero' }, { id: 2, name: 'Febrero' }, { id: 3, name: 'Marzo' },
  { id: 4, name: 'Abril' }, { id: 5, name: 'Mayo' }, { id: 6, name: 'Junio' },
  { id: 7, name: 'Julio' }, { id: 8, name: 'Agosto' }, { id: 9, name: 'Septiembre' },
  { id: 10, name: 'Octubre' }, { id: 11, name: 'Noviembre' }, { id: 12, name: 'Diciembre' }
];

const tiposBloqueo = [
  { id: 'FERIADO', name: 'FERIADO' },
  { id: 'VACACIONES', name: 'VACACIONES' },
  { id: 'EVENTO', name: 'EVENTO' },
  { id: 'MANTENIMIENTO', name: 'MANTENIMIENTO' },
  { id: 'OTRO', name: 'OTRO' },
];

const FechaFiltro = [
  <SelectInput source="anio" choices={anios} alwaysOn label="Año" />,
  <SelectInput source="mes" choices={meses} label="Mes" />,
  <SelectInput source="tipoBloqueo" choices={tiposBloqueo} label="Tipo de Bloqueo" />,
];

export default FechaFiltro;
