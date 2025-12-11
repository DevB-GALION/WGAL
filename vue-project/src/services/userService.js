import db from './dbConnection'

/**
 * userService
 * - expose login/logout/profile/refresh
 * - persist tokens in localStorage
 * - manage isConnected via localStorage + db.getToken()
 */

const TOKEN_KEY = 'auth_token'
const REFRESH_KEY = 'refresh_token'
const CONNECTED_KEY = 'isConnected'

const login = async (credentials) => {
  // credentials: { email, password }
  const res = await db.post('/auth/login', credentials)
  const data = res.data || {}

  // backend expected to return accessToken and optionally refreshToken
  const accessToken = data.accessToken || data.token || data.access_token
  const refreshToken = data.refreshToken || data.refresh_token

  if (accessToken) {
    db.setToken(accessToken)
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(CONNECTED_KEY, 'true')
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
    // notify
    try { window.dispatchEvent(new CustomEvent('user-logged-in')) } catch (e) {}
  }

  return data
}

const logout = async () => {
  try {
    const refresh = localStorage.getItem(REFRESH_KEY)
    if (refresh) {
      // best-effort call to backend logout endpoint
      await db.post('/auth/logout', { refreshToken: refresh })
    }
  } catch (e) {
    // ignore network errors
  }

  db.clearToken()
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.setItem(CONNECTED_KEY, 'false')
  try { window.dispatchEvent(new CustomEvent('user-logged-out')) } catch (e) {}
}

const refreshToken = async () => {
  const refresh = localStorage.getItem(REFRESH_KEY)
  if (!refresh) throw new Error('No refresh token available')
  const res = await db.post('/auth/refresh', { refreshToken: refresh })
  const data = res.data || {}
  const accessToken = data.accessToken || data.token || data.access_token
  if (accessToken) {
    db.setToken(accessToken)
    localStorage.setItem(TOKEN_KEY, accessToken)
  }
  return data
}

const getProfile = async () => {
  const res = await db.get('/auth/me')
  return res.data
}

const isConnected = () => {
  return (
    localStorage.getItem(CONNECTED_KEY) === 'true' ||
    !!db.getToken() ||
    !!localStorage.getItem(TOKEN_KEY)
  )
}

export default {
  login,
  logout,
  refreshToken,
  getProfile,
  isConnected
}
