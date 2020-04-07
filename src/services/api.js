import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // Physical device
  // baseURL: 'http://10.0.3.2:3333', // Emulator
});

export default api;
