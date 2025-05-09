import axios from 'axios';

const authProvider = {
  login: async ({ email, name, photo }) => {
    // const response = await axios.post('http://reservatec-tesis-backend-8asuen-298379-31-220-104-112.traefik.me/api/admin/validar', {
    const response = await axios.post('http://localhost:8080/api/admin/validar', {

      email,
      name,
      photo,
    });

    const data = response.data;

    // Verifica el token
    if (!data.token) {
      throw new Error("Token no recibido del backend");
    }

    localStorage.setItem('auth', JSON.stringify(data));
    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem('auth');
    sessionStorage.setItem('logout_done', '1'); 
    return Promise.resolve();
  },

  getAuthHeaders: () => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  if (!auth.token) return {};
  return {
    Authorization: `Bearer ${auth.token}`,
  };
},


checkAuth: () => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const token = auth?.token;
  
    if (!token) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
  
    try {
      const [, payloadBase64] = token.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
  
      if (exp && exp < now) {
        localStorage.removeItem('auth');
        return Promise.reject(); // Token expirado
      }
  
      return Promise.resolve();
    } catch (e) {
      localStorage.removeItem('auth');
      return Promise.reject(); // Token inválido
    }
  },
  

  checkError: (error) => {
    const status = error.status || error.response?.status;
    const url = error.url || error.response?.config?.url || '';
  
    const isProtected = url.includes('/api') && !url.includes('/admin/validar');
  
    if ((status === 401 || status === 403) && isProtected) {
      localStorage.removeItem('auth');
  
      // Llama a la notificación si está definida
      if (window && typeof window.notifySessionExpired === 'function') {
        window.notifySessionExpired();
      }
  
      return Promise.reject();
    }
  
    return Promise.resolve();
  },
  
  getIdentity: () => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    return Promise.resolve({
      id: auth.code,
      fullName: auth.name,
      avatar: auth.foto,
    });
  },

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
