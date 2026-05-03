import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Since this is for a mobile device, localhost from the emulator might need to be your machine's IP
// Using 10.0.2.2 for Android emulator default to localhost of the host machine
const API_URL = 'http://192.168.8.113:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
