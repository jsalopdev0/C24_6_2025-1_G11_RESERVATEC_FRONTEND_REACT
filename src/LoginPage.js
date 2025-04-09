import React, { useEffect, useState } from 'react'; // 👈 useState agregado
import { useLogin, useNotify } from 'react-admin';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const notify = useNotify();

  const [loginKey, setLoginKey] = useState(0); // 👈 NUEVO: key para forzar re-render

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      navigate('/usuarios');
    }
  }, [navigate]);

  useEffect(() => {
    // Si vienes del logout, forzamos reinicio del botón
    const logoutFlag = sessionStorage.getItem('logout_done');
    if (logoutFlag) {
      setLoginKey(prev => prev + 1);
      sessionStorage.removeItem('logout_done');
    }
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h2>Reservatec Admin</h2>

      <GoogleLogin
        key={loginKey} // 👈 Usamos key para forzar reinicio del botón
        onSuccess={async (credentialResponse) => {
            try {
              const idToken = credentialResponse.credential;
              const decoded = jwtDecode(idToken);
              await login({
                email: decoded.email,
                name: decoded.name,
                photo: decoded.picture,
              });
            } catch (error) {
              notify("Acceso denegado: no tienes permisos para acceder.", { type: "error" });
            }
          }}
          
        useOneTap={false}
        theme="outline"
        text="signin_with"
        shape="rectangular"
      />
    </div>
  );
};

export default LoginPage;
