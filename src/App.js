import React, { useEffect } from 'react';
import { Admin, Resource, Notification, useNotify } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';
import authProvider from './auth/authProvider';
import dataProvider from './providers/dataProvider';
import LoginPage from './pages/LoginPage';
import { UserList } from './resources/users/UserList';
import CustomLayout from './layout/CustomLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import EspaciosList from './resources/espacios/EspaciosList';
import EspaciosCreate from './resources/espacios/EspaciosCreate';
import EspaciosEdit from './resources/espacios/EspaciosEdit';
import { FechaBloqueadaList } from './resources/fechas/FechaBloqueadaList';
import { FechaBloqueadaCreate } from './resources/fechas/FechaBloqueadaCreate';
import { ReservaList } from './resources/reservas/ReservaList';
import ReservaCreate from './resources/reservas/ReservaCreate';

const NotifierBridge = () => {
  const notify = useNotify();
  useEffect(() => {
    window.notifySessionExpired = () => {
      notify('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', { type: 'warning' });
    };
    return () => {
      window.notifySessionExpired = null;
    };
  }, [notify]);

  return null;
};

const App = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      loginPage={LoginPage}
      layout={CustomLayout}
      dashboard={Dashboard} 


    >
      <NotifierBridge />
      <Notification />
      <Resource name="usuarios" list={UserList} />
      <Resource
        name="espacios"
        list={EspaciosList}
        create={EspaciosCreate}
        edit={EspaciosEdit}
      />



      <Resource
        name="fechas-bloqueadas"
        list={FechaBloqueadaList}
        create={FechaBloqueadaCreate}
      />

      <Resource
        name="reservas"
        list={ReservaList}
        create={ReservaCreate}
      />


    </Admin>
  </BrowserRouter>
);

export default App;
