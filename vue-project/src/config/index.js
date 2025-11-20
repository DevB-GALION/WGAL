// Configuration de l'API
const config = {
  // URL de base de l'API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  
  // Version de l'API
  apiVersion: import.meta.env.VITE_API_VERSION || 'v1',
  
  // Timeout des requêtes (en millisecondes)
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  
  // Configuration d'authentification
  auth: {
    tokenKey: import.meta.env.VITE_AUTH_TOKEN_KEY || 'auth_token',
    refreshTokenKey: import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || 'refresh_token'
  },
  
  // Configuration de l'application
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Vue App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    env: import.meta.env.VITE_APP_ENV || 'development'
  },
  
  // Configuration de debug
  debug: {
    enabled: import.meta.env.VITE_DEBUG_MODE === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info'
  }
}

// URL complète de l'API
config.apiUrl = `${config.apiBaseUrl}/${config.apiVersion}`

export default config
