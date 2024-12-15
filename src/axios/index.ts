import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  config.url = config.url + '&appid=' + process.env.REACT_APP_API_KEY;
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    console.error('Error:', error);
    return Promise.reject(error);
  },
);

export default api;
