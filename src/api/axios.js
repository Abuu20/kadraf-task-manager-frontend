// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://your-backend.vercel.app/api/tasks', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
