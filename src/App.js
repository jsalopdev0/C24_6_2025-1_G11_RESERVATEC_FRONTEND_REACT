import React, { useEffect } from 'react';
import { Admin, Resource, Notification, useNotify } from 'react-admin';
import { BrowserRouter } from 'react-router-dom';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import LoginPage from './LoginPage';
import { UserList } from './users';

// ✅ Componente para interceptar el toast desde authProvider
const NotifierBridge = () => {
  const notify = useNotify();

  useEffect(() => {
    // Función global que se puede llamar desde cualquier lado
    window.notifySessionExpired = () => {
      notify('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', { type: 'warning' });
    };

    // Limpiar al desmontar
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
    >
      {/* ✅ Inyectamos el interceptor de notificaciones */}
      <NotifierBridge />
      {/* ✅ Esto ya muestra el toast en pantalla */}
      <Notification />
      <Resource name="usuarios" list={UserList} />
    </Admin>
  </BrowserRouter>
);

export default App;
