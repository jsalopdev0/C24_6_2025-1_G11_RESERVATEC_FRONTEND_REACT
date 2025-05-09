import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

// const API_URL = 'http://reservatec-tesis-backend-8asuen-298379-31-220-104-112.traefik.me/api';

const API_URL = 'http://localhost:8080/api';

const httpClient = (url, options = {}) => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  options.headers = options.headers || new Headers({ Accept: 'application/json' });

  if (auth?.token) {
    options.headers.set('Authorization', `Bearer ${auth.token}`);
  }

  return fetchUtils.fetchJson(url, options);
};

const baseProvider = simpleRestProvider(API_URL, httpClient);

const myDataProvider = {
  ...baseProvider,
  getList: async (resource, params) => {
    const { q, carrera } = params.filter || {};
    const url = new URL(`${API_URL}/${resource}`);
    if (q) url.searchParams.append('q', q);
    if (carrera) url.searchParams.append('carrera', carrera);
  
    const response = await httpClient(url.toString());
    return {
      data: response.json,
      total: response.json.length
    };
  }
  


  
  
};

export default myDataProvider;
