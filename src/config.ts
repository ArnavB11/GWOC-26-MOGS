// API Base URL Configuration
// Automatically uses the correct API URL based on environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://rabuste-backend.onrender.com'  // Will be updated after backend deployment
    : 'http://localhost:5000');

