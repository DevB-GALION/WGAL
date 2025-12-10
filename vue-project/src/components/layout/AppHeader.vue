<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <h2>Vue App</h2>
      </div>
      
      <!-- Navigation pour utilisateurs connectés -->
      <nav v-if="isConnected" class="navigation">
        <div class="nav-buttons">
          <BaseButton 
            variant="secondary" 
            size="small" 
            @click="navigateToHome">
            Accueil
          </BaseButton>
          <BaseButton 
            variant="secondary" 
            size="small" 
            @click="navigateToDemo">
            Composants Demo
          </BaseButton>
        </div>
        <div class="logout-section">
          <BaseButton 
            variant="danger" 
            size="small" 
            icon="Logout_Rounded_red"
            @click="logout">
          </BaseButton>
        </div>
      </nav>
      
      <!-- Titre centré pour utilisateurs non connectés -->
      <div v-else class="center-title">
        <h1>GALION</h1>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import BaseButton from '../ui/BaseButton.vue'

export default {
  name: 'AppHeader',
  components: {
    BaseButton
  },
  emits: ['navigate'],
  setup(props, { emit }) {
    // Variable de session pour l'état de connexion
    const sessionConnected = ref(false)

    // Computed pour vérifier si l'utilisateur est connecté
    const isConnected = computed(() => {
      // Vérifier localStorage, sessionStorage ou variable globale
      return sessionConnected.value || 
             localStorage.getItem('isConnected') === 'true' ||
             sessionStorage.getItem('isConnected') === 'true'
    })

    // Méthodes de navigation
    const navigateToHome = () => {
      emit('navigate', 'home')
    }

    const navigateToDemo = () => {
      emit('navigate', 'demo')
    }

    // Méthode pour gérer la navigation (pour les cas complexes si nécessaire)
    const handleNavigation = (action) => {
      emit('navigate', action.payload)
    }

    // Méthode pour se déconnecter
    const logout = () => {
      sessionConnected.value = false
      localStorage.setItem('isConnected', 'false')
      sessionStorage.removeItem('isConnected')
      
      // Émettre un événement de déconnexion
      window.dispatchEvent(new CustomEvent('user-logged-out'))
      
      // Rediriger vers la page de connexion si nécessaire
      emit('navigate', 'login')
    }

    // Méthode pour changer l'état de connexion (utile pour tester)
    const toggleConnection = () => {
      sessionConnected.value = !sessionConnected.value
      localStorage.setItem('isConnected', sessionConnected.value.toString())
    }

    // Méthode pour vérifier l'état de connexion
    const checkConnectionStatus = () => {
      const stored = localStorage.getItem('isConnected')
      sessionConnected.value = stored === 'true'
    }

    // Initialiser l'état de connexion au montage du composant
    onMounted(() => {
      checkConnectionStatus()
      
      // Écouter les événements de connexion/déconnexion
      window.addEventListener('user-logged-in', checkConnectionStatus)
      window.addEventListener('user-logged-out', checkConnectionStatus)
      window.addEventListener('storage', checkConnectionStatus)
    })

    return {
      isConnected,
      navigateToHome,
      navigateToDemo,
      handleNavigation,
      logout,
      toggleConnection
    }
  }
}
</script>

<style scoped>
.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: var(--box-shadow);
  width: 90vw;
  height: 10vh;
  margin: 2.5vh auto;
  border-radius: var(--border-radius);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logout-section {
  display: flex;
  align-items: center;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Styles personnalisés pour tous les boutons du header */
.navigation .btn {
  background-color: transparent !important;
  color: white !important;
  border: none !important;
}

.navigation .btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

/* Style spécifique pour le bouton de déconnexion */
.logout-section .btn {
  background-color: transparent !important;
  color: #ff6b6b !important;
  border: none !important;
}

.logout-section .btn:hover:not(:disabled) {
  background-color: rgba(255, 107, 107, 0.1) !important;
  color: #ff6b6b !important;
}

.center-title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-title h1 {
  font-family: 'LazyDog', 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin: 0;
  letter-spacing: 0.1em;
}
</style>
