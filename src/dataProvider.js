import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const API_URL = 'http://localhost:8080/api';

const httpClient = (url, options = {}) => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  options.headers = options.headers || new Headers({ Accept: 'application/json' });

  if (auth?.token) {
    options.headers.set('Authorization', `Bearer ${auth.token}`); // ✅ IMPORTANTE
  }

  return fetchUtils.fetchJson(url, options);
};

export default simpleRestProvider(API_URL, httpClient);
