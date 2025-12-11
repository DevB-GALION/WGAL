import axios from 'axios'
import config from '@/config'

const API_BASE = config.apiUrl || import.meta.env.VITE_API_BASE_URL

const instance = axios.create({
  baseURL: API_BASE,
  timeout: config.apiTimeout || 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

let _token = localStorage.getItem(config.auth.tokenKey) || null

const setToken = (token) => {
  _token = token
  if (token) {
    localStorage.setItem(config.auth.tokenKey, token)
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem(config.auth.tokenKey)
    delete instance.defaults.headers.common['Authorization']
  }
}

const clearToken = () => setToken(null)

// Request interceptor: ensure Authorization header present when token available
instance.interceptors.request.use(
  (cfg) => {
    if (_token) {
      cfg.headers = cfg.headers || {}
      cfg.headers.Authorization = `Bearer ${_token}`
    }
    return cfg
  },
  (error) => Promise.reject(error)
)

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token))
  refreshSubscribers = []
}

// Response interceptor: try refresh token on 401 and retry original request once
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const status = error?.response?.status

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem(config.auth.refreshTokenKey)

      if (!refreshToken) {
        // No refresh token -> force logout
        try { window.dispatchEvent(new CustomEvent('user-logged-out')) } catch (e) {}
        clearToken()
        return Promise.reject(error)
      }

      if (isRefreshing) {
        // Queue requests while refreshing
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            if (!token) return reject(error)
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(instance(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        // Use plain axios to avoid interceptor loop
        const refreshUrl = `${config.apiUrl.replace(/\/$/, '')}/auth/refresh`
        const resp = await axios.post(refreshUrl, { refreshToken })
        const data = resp.data || {}
        const newToken = data.accessToken || data.token || data.access_token

        if (newToken) {
          setToken(newToken)
          onRefreshed(newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return instance(originalRequest)
        }

        // Refresh failed -> logout
        try { window.dispatchEvent(new CustomEvent('user-logged-out')) } catch (e) {}
        clearToken()
        return Promise.reject(error)
      } catch (e) {
        // Refresh request failed -> logout
        try { window.dispatchEvent(new CustomEvent('user-logged-out')) } catch (err) {}
        clearToken()
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// Simple wrapper helpers
const get = (url, cfg) => instance.get(url, cfg)
const post = (url, data, cfg) => instance.post(url, data, cfg)
const put = (url, data, cfg) => instance.put(url, data, cfg)
const del = (url, cfg) => instance.delete(url, cfg)

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
