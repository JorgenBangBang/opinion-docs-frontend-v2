import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login page
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth service functions
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.put('/auth/change-password', { currentPassword, newPassword });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return response.data;
};

// Document service functions
export const getDocuments = async (params) => {
  const response = await api.get('/documents', { params });
  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};

export const createDocument = async (formData) => {
  const response = await api.post('/documents', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updateDocument = async (id, data) => {
  const response = await api.put(`/documents/${id}`, data);
  return response.data;
};

export const uploadNewVersion = async (id, formData) => {
  const response = await api.post(`/documents/${id}/revisions`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getDocumentRevisions = async (id) => {
  const response = await api.get(`/documents/${id}/revisions`);
  return response.data;
};

export const downloadDocument = async (id) => {
  const response = await api.get(`/documents/${id}/download`, {
    responseType: 'blob'
  });
  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};

// Category service functions
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (data) => {
  const response = await api.post('/categories', data);
  return response.data;
};

export const updateCategory = async (id, data) => {
  const response = await api.put(`/categories/${id}`, data);
  return response.data;
};

export const addSubcategory = async (categoryId, data) => {
  const response = await api.post(`/categories/${categoryId}/subcategories`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

export const deleteSubcategory = async (categoryId, subcategoryName) => {
  const response = await api.delete(`/categories/${categoryId}/subcategories/${subcategoryName}`);
  return response.data;
};

export default api;
