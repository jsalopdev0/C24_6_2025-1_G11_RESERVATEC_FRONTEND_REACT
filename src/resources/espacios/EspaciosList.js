import React from 'react';
import { List } from 'react-admin';
import EspaciosGrid from './components/EspaciosGrid';

const EspaciosList = () => (
  <List pagination={false} actions={null}>
  <EspaciosGrid />
</List>


);

export default EspaciosList;
