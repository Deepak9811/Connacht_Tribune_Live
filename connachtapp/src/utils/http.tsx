import axios from 'axios';
import { http } from '../actions';
import store from '../store';
import storage from './storage';
declare var process;

const client = axios.create({
  baseURL:
  process.env.NODE_ENV === 'production' ?
  'https://pocketfriendlytowns.com/connachttribune-api/' :
  'https://pocketfriendlytowns.com/connachttribune-api/',
});

client.interceptors.request.use((config) => {
  store.dispatch(http.requestAttempt());
  const interceptedConfig = { ...config };
  // const token = 'TOKENsadasdsadsadsadsadsadasd';
  if (config.url.includes('/auth') && !config.url.includes('/auth/checkToken')) {
    interceptedConfig.headers.Authorization = '';
    return interceptedConfig;
  }
  return storage.getItem('token').then((token) => {
    if (token) {
      interceptedConfig.headers.Authorization = `Bearer ${token}`;
    }
    return interceptedConfig;
  }).catch(() => {
    return interceptedConfig;
  });
  // if (token) {
  //   interceptedConfig.headers.Authorization = `Bearer ${token}`;
  // }
  // return interceptedConfig;
}, (error) => {
  store.dispatch(http.requestFailure(error));
  return Promise.reject(error);
});

client.interceptors.response.use((response) => {
  store.dispatch(http.requestSuccess());
  if (response.headers.authorization) {
    storage.setItem('token', response.headers.authorization);
  }
  if (response.data && response.data.data) {
    response.data = response.data.data;
  }
  return response;
}, (error) => {
  store.dispatch(http.requestFailure(error));
  return Promise.reject(error);
});

export default client;
