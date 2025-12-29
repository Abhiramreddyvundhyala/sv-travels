import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.response?.data?.message || error.message
    });
    if (error.response?.status === 401) {
      console.warn('Unauthorized - Token may be invalid or expired');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

// Vehicle APIs
export const vehicleAPI = {
  getAll: () => api.get('/vehicles'),
  getById: (id) => api.get(`/vehicles/${id}`),
  create: (formData) => api.post('/vehicles', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/vehicles/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/vehicles/${id}`),
  deleteImage: (id, imagePath) => api.delete(`/vehicles/${id}/images`, {
    data: { imagePath }
  })
};

// Enquiry APIs
export const enquiryAPI = {
  create: (data) => api.post('/enquiries', data),
  getAll: (status) => api.get('/enquiries', { params: { status } }),
  getById: (id) => api.get(`/enquiries/${id}`),
  update: (id, data) => api.put(`/enquiries/${id}`, data),
  delete: (id) => api.delete(`/enquiries/${id}`),
  getStats: () => api.get('/enquiries/stats/dashboard'),
  getDeleted: () => api.get('/enquiries/deleted/all'),
  restore: (id) => api.put(`/enquiries/${id}/restore`),
  permanentDelete: (id) => api.delete(`/enquiries/${id}/permanent`)
};

// Admin APIs
export const adminAPI = {
  login: (data) => api.post('/admin/login', data),
  register: (data) => api.post('/admin/register', data),
  getMe: () => api.get('/admin/me'),
  changePassword: (data) => api.put('/admin/change-password', data)
};

// Settings APIs
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data)
};

export default api;
