<script setup>
// Import des composants UI individuellement
import BaseButton from '@/components/ui/BaseButton.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import HomePage from '@/pages/HomePage.vue'
import TableDemo from '@/pages/TableDemo.vue'
import ButtonActionsDemo from '@/pages/ButtonActionsDemo.vue'
import InputDemo from '@/pages/InputDemo.vue'
import TitleDemo from '@/pages/TitleDemo.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

// Import du CSS global
import '@/assets/styles/main.css'

// État pour la navigation et la connexion
import { ref, computed, onMounted } from 'vue'

const currentPage = ref('home')
const isConnected = ref(false)

// Computed pour déterminer si l'utilisateur est connecté
const userConnected = computed(() => {
  return isConnected.value || 
         localStorage.getItem('isConnected') === 'true' ||
         sessionStorage.getItem('isConnected') === 'true'
})

// Vérifier l'état de connexion
const checkConnectionStatus = () => {
  const stored = localStorage.getItem('isConnected')
  isConnected.value = stored === 'true'
}

const handleNavigate = (page) => {
  currentPage.value = page
}

// Initialiser l'état de connexion au montage
onMounted(() => {
  checkConnectionStatus()
  
  // Écouter les événements de connexion/déconnexion
  window.addEventListener('user-logged-in', () => {
    checkConnectionStatus()
    // Rediriger vers la page d'accueil après connexion
    currentPage.value = 'home'
  })
  window.addEventListener('user-logged-out', checkConnectionStatus)
  window.addEventListener('storage', checkConnectionStatus)
})
</script>

<template >
  <div id="app">
    <AppHeader @navigate="handleNavigate" />
    
    <main class="main-content">
      <!-- Page de connexion pour utilisateurs non connectés -->
      <div v-if="!userConnected" class="login-page">
        <LoginForm />
      </div>
      
      <!-- Pages de l'application pour utilisateurs connectés -->
      <template v-else>
        <HomePage v-if="currentPage === 'home'" />
        
        <!-- Page Demo regroupant toutes les démonstrations de composants -->
        <div v-if="currentPage === 'demo'" class="demo-page">
          <div class="demo-container">
            <h1 class="demo-title">Démonstration des Composants Génériques</h1>
            
            <!-- Section Boutons -->
            <div class="demo-section">
              <h2>Composant BaseButton</h2>
              <ButtonActionsDemo />
            </div>
            
            <!-- Section Tableaux -->
            <div class="demo-section">
              <h2>Composant DataTable</h2>
              <TableDemo />
            </div>
            
            <!-- Section Inputs -->
            <div class="demo-section">
              <h2>Composant BaseInput</h2>
              <InputDemo />
            </div>
            
            <!-- Section Titres -->
            <div class="demo-section">
              <h2>Composant BaseTitle</h2>
              <TitleDemo />
            </div>
            
            <!-- Section Exemples rapides -->
            <div class="demo-section">
              <h2>Exemples rapides</h2>
              <div class="quick-examples">
                <BaseButton variant="primary" icon="Groupes_orange">Bouton Principal</BaseButton>
                <BaseButton variant="secondary">Bouton Secondaire</BaseButton>
                <BaseButton variant="danger">Bouton Danger</BaseButton>
                <BaseButton variant="warning">Bouton Warning</BaseButton>
                <BaseButton variant="navigation">Navigation</BaseButton>
                <BaseButton :loading="true">Chargement...</BaseButton>
                <BaseButton :disabled="true">Désactivé</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.demo-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.demo-page {
  padding: 2rem 0;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.demo-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
  font-family: 'LazyDog', 'Poppins', sans-serif;
  font-size: 2.5rem;
}

.demo-section {
  margin-bottom: 4rem;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.demo-section h2 {
  margin-bottom: 2rem;
  color: var(--primary-color);
  font-family: 'LazyDog', 'Poppins', sans-serif;
  font-size: 1.8rem;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.quick-examples {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}
</style>
