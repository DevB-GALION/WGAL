import axios from 'axios'
import config from '@/config'

// Créer une instance Axios avec la configuration de base
const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Intercepteur de requête pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(config.auth?.tokenKey || 'auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Log de la requête en mode debug
    if (config.debug?.enabled) {
      console.log('🚀 Requête API:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data
      })
    }
    
    return config
  },
  (error) => {
    console.error('❌ Erreur dans la requête:', error)
    return Promise.reject(error)
  }
)

// Intercepteur de réponse pour gérer les erreurs globalement
apiClient.interceptors.response.use(
  (response) => {
    // Log de la réponse en mode debug
    if (config.debug.enabled) {
      console.log('✅ Réponse API:', {
        status: response.status,
        data: response.data
      })
    }
    
    return response
  },
  (error) => {
    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem(config.auth.tokenKey)
      localStorage.removeItem(config.auth.refreshTokenKey)
      
      // Rediriger vers la page de connexion (à adapter selon votre routing)
      window.location.href = '/login'
    }
    
    // Gestion des autres erreurs
    const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue'
    
    console.error('❌ Erreur API:', {
      status: error.response?.status,
      message: errorMessage,
      url: error.config?.url
    })
    
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data
    })
  }
)

export default apiClient
