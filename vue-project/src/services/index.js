import apiClient from './api'
import db from './dbConnection'
import config from '@/config'

/**
 * Service d'authentification
 */
export const authService = {
  /**
   * Connexion utilisateur
   * @param {Object} credentials - Email et mot de passe
   * @returns {Promise} - Réponse de l'API
   */
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials)
    
    // Sauvegarder les tokens en utilisant les clés définies dans config
    const tokenKey = config.auth.tokenKey || 'auth_token'
    const refreshKey = config.auth.refreshTokenKey || 'refresh_token'

    const token = response.data?.token || response.data?.accessToken || response.data?.access_token
    const refresh = response.data?.refreshToken || response.data?.refresh_token

    if (token) {
      localStorage.setItem(tokenKey, token)
      // Appliquer le token à l'instance axios centralisée
      try { db.setToken(token) } catch (e) { /* ignore */ }
    }

    if (refresh) {
      localStorage.setItem(refreshKey, refresh)
    }

    return response.data
  },

  /**
   * Déconnexion utilisateur
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      // Supprimer les tokens du localStorage et nettoyer l'instance
      const tokenKey = config.auth.tokenKey || 'auth_token'
      const refreshKey = config.auth.refreshTokenKey || 'refresh_token'
      localStorage.removeItem(tokenKey)
      localStorage.removeItem(refreshKey)
      try { db.clearToken() } catch (e) {}
    }
  },

  /**
   * Inscription utilisateur
   * @param {Object} userData - Données utilisateur
   * @returns {Promise} - Réponse de l'API
   */
  async register(userData) {
    const response = await apiClient.post('/auth/register', userData)
    return response.data
  },

  /**
   * Rafraîchir le token
   * @returns {Promise} - Nouveau token
   */
  async refreshToken() {
    const refreshToken = localStorage.getItem(config.auth.refreshTokenKey)
    if (!refreshToken) {
      throw new Error('Aucun refresh token disponible')
    }

    const response = await apiClient.post('/auth/refresh', { refreshToken })
    const tokenKey = config.auth.tokenKey || 'auth_token'

    const newToken = response.data?.token || response.data?.accessToken || response.data?.access_token
    if (newToken) {
      localStorage.setItem(tokenKey, newToken)
      try { db.setToken(newToken) } catch (e) {}
    }

    return response.data
  },

  /**
   * Vérifier si l'utilisateur est connecté
   * @returns {boolean}
   */
  isAuthenticated() {
    const tokenKey = config.auth.tokenKey || 'auth_token'
    return !!localStorage.getItem(tokenKey)
  }
}

/**
 * Service utilisateur
 */
export const userService = {
  /**
   * Récupérer le profil utilisateur
   * @returns {Promise} - Profil utilisateur
   */
  async getProfile() {
    const response = await apiClient.get('/user/profile')
    return response.data
  },

  /**
   * Mettre à jour le profil utilisateur
   * @param {Object} userData - Nouvelles données utilisateur
   * @returns {Promise} - Profil mis à jour
   */
  async updateProfile(userData) {
    const response = await apiClient.put('/user/profile', userData)
    return response.data
  }
}

/**
 * Service générique pour les opérations CRUD
 */
export const crudService = {
  /**
   * Récupérer tous les éléments
   * @param {string} endpoint - Point de terminaison de l'API
   * @returns {Promise} - Liste des éléments
   */
  async getAll(endpoint) {
    const response = await apiClient.get(endpoint)
    return response.data
  },

  /**
   * Récupérer un élément par ID
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {number|string} id - ID de l'élément
   * @returns {Promise} - Élément trouvé
   */
  async getById(endpoint, id) {
    const response = await apiClient.get(`${endpoint}/${id}`)
    return response.data
  },

  /**
   * Créer un nouvel élément
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à créer
   * @returns {Promise} - Élément créé
   */
  async create(endpoint, data) {
    const response = await apiClient.post(endpoint, data)
    return response.data
  },

  /**
   * Mettre à jour un élément
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {number|string} id - ID de l'élément
   * @param {Object} data - Nouvelles données
   * @returns {Promise} - Élément mis à jour
   */
  async update(endpoint, id, data) {
    const response = await apiClient.put(`${endpoint}/${id}`, data)
    return response.data
  },

  /**
   * Supprimer un élément
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {number|string} id - ID de l'élément
   * @returns {Promise} - Confirmation de suppression
   */
  async delete(endpoint, id) {
    const response = await apiClient.delete(`${endpoint}/${id}`)
    return response.data
  }
}
