import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Adjust this to your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to include access tokens
axiosClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    const decodedToken = jwtDecode<{ exp: number }>(accessToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      // Token expired
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login'; // Redirect to login
      return Promise.reject('Token expired');
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor to refresh tokens on 401
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh_token')
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('/auth/token/refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
