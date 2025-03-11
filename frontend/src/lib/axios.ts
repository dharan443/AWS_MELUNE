// File: src/lib/axios.js or src/lib/axios.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://da.admusic.infy.uk:5000/api',  // <-- Set the backend server URL here
  headers: {
    'Content-Type': 'application/json',
  },
});
