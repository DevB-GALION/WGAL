import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL 

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

let _token = localStorage.getItem('auth_token') || null

const setToken = (token) => {
  _token = token
  if (token) {
    localStorage.setItem('auth_token', token)
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('auth_token')
    delete instance.defaults.headers.common['Authorization']
  }
}

const clearToken = () => setToken(null)

// Request interceptor: ensure Authorization header present when token available
instance.interceptors.request.use(
  (config) => {
    if (_token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${_token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: if 401, broadcast logout event and clear token
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      // Notify rest of the app that the user must be logged out
      try {
        window.dispatchEvent(new CustomEvent('user-logged-out'))
      } catch (e) {
        // ignore
      }
      clearToken()
    }
    return Promise.reject(error)
  }
)

// Simple wrapper helpers
const get = (url, config) => instance.get(url, config)
const post = (url, data, config) => instance.post(url, data, config)
const put = (url, data, config) => instance.put(url, data, config)
const del = (url, config) => instance.delete(url, config)

export default {
  instance,
  setToken,
  clearToken,
  get,
  post,
  put,
  delete: del,
  getToken: () => _token,
  API_BASE
}
