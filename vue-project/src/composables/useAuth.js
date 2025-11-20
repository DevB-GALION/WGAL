import { ref, computed } from 'vue'
import { authService, userService } from '@/services'

/**
 * Composable pour la gestion de l'authentification
 */
export function useAuth() {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // État de connexion
  const isAuthenticated = computed(() => authService.isAuthenticated())

  /**
   * Connexion utilisateur
   */
  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      user.value = response.user
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Déconnexion utilisateur
   */
  const logout = async () => {
    loading.value = true
    
    try {
      await authService.logout()
      user.value = null
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Inscription utilisateur
   */
  const register = async (userData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.register(userData)
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Récupérer le profil utilisateur
   */
  const fetchUserProfile = async () => {
    if (!isAuthenticated.value) return

    loading.value = true
    error.value = null
    
    try {
      const profile = await userService.getProfile()
      user.value = profile
      return profile
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    fetchUserProfile
  }
}
