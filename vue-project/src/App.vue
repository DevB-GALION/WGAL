<script setup>
// Import des composants UI individuellement
import BaseButton from '@/components/ui/BaseButton.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import HomePage from '@/pages/HomePage.vue'
import TableDemo from '@/pages/TableDemo.vue'
import ButtonActionsDemo from '@/pages/ButtonActionsDemo.vue'

// Import du CSS global
import '@/assets/styles/main.css'

// État pour la navigation
import { ref } from 'vue'
const currentPage = ref('home')

const handleNavigate = (page) => {
  currentPage.value = page
}
</script>

<template>
  <div id="app">
    <AppHeader @navigate="handleNavigate" />
    
    <main class="main-content">
      <HomePage v-if="currentPage === 'home'" />
      <TableDemo v-if="currentPage === 'table'" />
      <ButtonActionsDemo v-if="currentPage === 'actions'" />
      
      <!-- Exemple d'utilisation des composants UI -->
      <div v-if="currentPage === 'demo'" class="demo-section">
        <h2>Démonstration des composants UI</h2>
        
        <div class="buttons-demo">
          <BaseButton variant="primary" icon="home">Bouton Principal</BaseButton>
          <BaseButton variant="secondary">Bouton Secondaire</BaseButton>
          <BaseButton variant="danger">Bouton Danger</BaseButton>
          <BaseButton variant="warning">Bouton Warning</BaseButton>
          <BaseButton :loading="true">Chargement...</BaseButton>
          <BaseButton :disabled="true">Désactivé</BaseButton>

          <BaseButton size="small" icon="check">Petit</BaseButton>
          <BaseButton size="medium" icon="home">Moyen</BaseButton>
          <BaseButton size="large" icon="smile">Grand</BaseButton>
          <BaseButton size="xlarge" variant="danger">Très Grand</BaseButton>
        </div>
      </div>
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

.demo-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
}

.buttons-demo {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
