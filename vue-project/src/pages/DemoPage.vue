<template>
  <div class="demo-page">
    <h1>Démonstration des composants UI</h1>
    
    <!-- Utilisation avec l'import * -->
    <section class="section">
      <h2>Boutons avec import *</h2>
      <div class="buttons-row">
        <UI.BaseButton variant="primary" icon="Analytics_green">Primary</UI.BaseButton>
        <UI.BaseButton variant="secondary">Secondary</UI.BaseButton>
        <UI.BaseButton variant="danger">Danger</UI.BaseButton>
        <UI.BaseButton variant="warning">Warning</UI.BaseButton>
      </div>
    </section>
    
    <!-- Utilisation avec import spécifique -->
    <section class="section">
      <h2>Boutons avec import spécifique</h2>
      <div class="buttons-row">
        <BaseButton :loading="loading" @click="toggleLoading">
          {{ loading ? 'Chargement...' : 'Cliquer moi' }}
        </BaseButton>
        <BaseButton :disabled="true">Désactivé</BaseButton>
      </div>
    </section>
  </div>
</template>

<script setup>
// Import de tous les composants UI
import * as UI from '@/components/ui'

// Import spécifique (les deux méthodes sont possibles)
import { BaseButton } from '@/components/ui'

import { ref } from 'vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<style scoped>
.demo-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.buttons-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
