import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eel_admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear expired token if attempting admin action
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('eel_admin_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const loginAdmin = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Bookings
export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getBookings = async (params = {}) => {
  const response = await api.get('/bookings', { params });
  return response.data;
};

export const getBooking = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const updateBookingStatus = async (id, statusData) => {
  const response = await api.patch(`/bookings/${id}`, statusData);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await api.delete(`/bookings/${id}`);
  return response.data;
};

// Fleet
export const getFleet = async () => {
  const response = await api.get('/fleet');
  return response.data;
};

export const getAllFleetAdmin = async () => {
  const response = await api.get('/fleet/all');
  return response.data;
};

export const updateFleetVehicle = async (id, data) => {
  const response = await api.put(`/fleet/${id}`, data);
  return response.data;
};

// Services
export const getServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const updateService = async (id, data) => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};

// Airports
export const getAirports = async () => {
  const response = await api.get('/airports');
  return response.data;
};

// Service Areas
export const getServiceAreas = async () => {
  const response = await api.get('/service-areas');
  return response.data;
};

// Contact
export const submitContact = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

export const getContactMessages = async () => {
  const response = await api.get('/contact');
  return response.data;
};

export const markMessageRead = async (id) => {
  const response = await api.patch(`/contact/${id}/read`);
  return response.data;
};

// AI Concierge Chat
export const chatWithConcierge = async (message, history = []) => {
  const response = await api.post('/chat', { message, history });
  return response.data;
};

// Admin Stats
export const getDashboardStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export default api;
