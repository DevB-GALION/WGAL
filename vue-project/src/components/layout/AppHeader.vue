<template>
  <header class="app-header">
    <div class="container">
      <!-- Logo à gauche (toujours visible) -->
      <div class="logo-section">
        <BaseButton 
          variant="iconButton" 
          size="xlarge" 
          @click="navigateToHome"
          icon="logo_transparent">
        </BaseButton>
      </div>
      
      <!-- Navigation pour utilisateurs connectés -->
      <nav v-if="isConnected" class="navigation">
        <div class="nav-buttons">
          <BaseButton 
            variant="navigation" 
            size="small" 
            @click="navigateToHome">
            Accueil
          </BaseButton>
          <BaseButton 
            variant="navigation" 
            size="small" 
            @click="navigateToDemo">
            Composants Demo
          </BaseButton>
        </div>
      </nav>
      
      <!-- Titre centré pour utilisateurs non connectés -->
      <div v-if="!isConnected" class="center-title">
        <BaseTitle 
          size="small" 
          color="white" 
          align="center"  
      >
          GALION
        </BaseTitle>
         <BaseTitle
          size="xsmall" 
          color="white" 
          >Gestionnaire accueil de loisir
        </BaseTitle>
        
      </div>
      
      <!-- Section droite -->
      <div class="right-section">
        <!-- Bouton de déconnexion pour utilisateurs connectés -->
        <BaseButton 
          v-if="isConnected"
          variant="iconButton" 
          size="small" 
          icon="Logout_Rounded_red"
          @click="logout">
        </BaseButton>
        
        <!-- Bouton de connexion pour utilisateurs non connectés -->
        <BaseButton 
          v-else
          variant="iconButton" 
          size="small" 
          icon="Logout_Rounded_green"
          @click="navigateToLogin">
        </BaseButton>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import BaseButton from '../ui/BaseButton.vue'
import BaseTitle from '../ui/BaseTitle.vue'

export default {
  name: 'AppHeader',
  components: {
    BaseButton,
    BaseTitle
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

    const navigateToLogin = () => {
      emit('navigate', 'login')
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
      navigateToLogin,
      handleNavigation,
      logout,
      toggleConnection
    }
  }
}
</script>

<style scoped>
.app-header {
  
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
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
}

.logo-section {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.navigation {
  display: flex;
  align-items: center;
}

.center-title {
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
 
}

.right-section {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
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



.subtitle {
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  text-align: center;
  width: 100%;
}

/* S'assurer que le BaseTitle est bien centré */
.center-title :deep(.base-title) {
  text-align: center;
  width: 100%;
}
</style>
