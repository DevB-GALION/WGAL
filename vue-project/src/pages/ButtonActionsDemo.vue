<template>
  <div class="button-actions-demo">
    <h1>Démonstration des Actions de Boutons</h1>

    <!-- Actions basiques -->
    <section class="demo-section">
      <h2>Actions de Navigation</h2>
      <div class="buttons-grid">
        
        <!-- URL externe -->
        <div class="button-example">
          <h3>URL Externe</h3>
          <BaseButton 
            variant="primary" 
            icon="home"
            :action="'https://vuejs.org'"
          >
            Visiter Vue.js
          </BaseButton>
          <code>:action="'https://vuejs.org'"</code>
        </div>

        <!-- Email -->
        <div class="button-example">
          <h3>Email</h3>
          <BaseButton 
            variant="secondary" 
            :action="'mailto:contact@example.com?subject=Hello'"
          >
            Envoyer Email
          </BaseButton>
          <code>:action="'mailto:contact@example.com'"</code>
        </div>

        <!-- Téléphone -->
        <div class="button-example">
          <h3>Téléphone</h3>
          <BaseButton 
            variant="warning" 
            :action="'tel:+33123456789'"
          >
            Appeler
          </BaseButton>
          <code>:action="'tel:+33123456789'"</code>
        </div>

      </div>
    </section>

    <!-- Actions avec méthodes -->
    <section class="demo-section">
      <h2>Actions avec Méthodes</h2>
      <div class="buttons-grid">
        
        <!-- Fonction simple -->
        <div class="button-example">
          <h3>Fonction Simple</h3>
          <BaseButton 
            variant="primary" 
            icon="check"
            :action="showAlert"
          >
            Afficher Alerte
          </BaseButton>
          <code>:action="showAlert"</code>
        </div>

        <!-- Fonction avec paramètres via objet -->
        <div class="button-example">
          <h3>Fonction avec Paramètres</h3>
          <BaseButton 
            variant="secondary" 
            :action="{ method: showMessage, params: ['Bonjour depuis le bouton!'] }"
          >
            Message Personnalisé
          </BaseButton>
          <code>:action="{ method: showMessage, params: ['...'] }"</code>
        </div>

        <!-- Émission d'événement -->
        <div class="button-example">
          <h3>Événement Personnalisé</h3>
          <BaseButton 
            variant="danger" 
            :action="{ emit: 'custom-event', data: { userId: 123 } }"
            @custom-event="handleCustomEvent"
          >
            Émettre Événement
          </BaseButton>
          <code>:action="{ emit: 'custom-event', data: {...} }"</code>
        </div>

      </div>
    </section>

    <!-- Actions complexes -->
    <section class="demo-section">
      <h2>Actions Complexes</h2>
      <div class="buttons-grid">
        
        <!-- URL avec nouvel onglet -->
        <div class="button-example">
          <h3>Nouvel Onglet</h3>
          <BaseButton 
            variant="primary" 
            :action="{ url: 'https://github.com', newTab: true }"
          >
            GitHub (nouvel onglet)
          </BaseButton>
          <code>:action="{ url: '...', newTab: true }"</code>
        </div>

        <!-- Combinaison avec click event -->
        <div class="button-example">
          <h3>Action + Click Event</h3>
          <BaseButton 
            variant="secondary" 
            :action="incrementCounter"
            @click="logClick"
          >
            Compteur: {{ counter }}
          </BaseButton>
          <code>:action="method" @click="otherMethod"</code>
        </div>

        <!-- Action avec état de chargement -->
        <div class="button-example">
          <h3>Action Asynchrone</h3>
          <BaseButton 
            variant="warning" 
            :loading="isLoading"
            :action="simulateAsync"
          >
            {{ isLoading ? 'Traitement...' : 'Action Async' }}
          </BaseButton>
          <code>:action="asyncMethod" :loading="state"</code>
        </div>

      </div>
    </section>

    <!-- Logs des actions -->
    <section class="demo-section">
      <h2>Journal des Actions</h2>
      <div class="logs">
        <div v-for="(log, index) in actionLogs" :key="index" class="log-entry">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
        <div v-if="actionLogs.length === 0" class="no-logs">
          Aucune action exécutée pour le moment
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BaseButton } from '@/components/ui'

// États réactifs
const counter = ref(0)
const isLoading = ref(false)
const actionLogs = ref([])

// Fonction utilitaire pour logger les actions
const logAction = (message) => {
  actionLogs.value.unshift({
    time: new Date().toLocaleTimeString('fr-FR'),
    message
  })
  
  // Garder seulement les 10 derniers logs
  if (actionLogs.value.length > 10) {
    actionLogs.value = actionLogs.value.slice(0, 10)
  }
}

// Méthodes d'exemple
const showAlert = () => {
  alert('Hello depuis une action de bouton!')
  logAction('Alerte affichée')
}

const showMessage = (message) => {
  alert(message)
  logAction(`Message affiché: ${message}`)
}

const handleCustomEvent = (data) => {
  console.log('Événement personnalisé reçu:', data)
  logAction(`Événement reçu avec userId: ${data.userId}`)
}

const incrementCounter = () => {
  counter.value++
  logAction(`Compteur incrémenté à ${counter.value}`)
}

const logClick = () => {
  logAction('Événement click également déclenché')
}

const simulateAsync = async () => {
  isLoading.value = true
  logAction('Début de l\'action asynchrone')
  
  // Simuler une opération asynchrone
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isLoading.value = false
  logAction('Action asynchrone terminée')
}
</script>

<style scoped>
.button-actions-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3vh 2vw;
}

.button-actions-demo h1 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 4vh;
  font-size: 4vh;
}

.demo-section {
  margin-bottom: 6vh;
}

.demo-section h2 {
  color: var(--dark-color);
  margin-bottom: 3vh;
  font-size: 3vh;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 1vh;
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3vh 2vw;
}

.button-example {
  background: var(--background-color);
  padding: 2vh;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.button-example h3 {
  color: var(--secondary-color);
  margin-bottom: 1.5vh;
  font-size: 2.2vh;
}

.button-example code {
  display: block;
  background: #f8f9fa;
  padding: 1vh;
  border-radius: 0.5vh;
  font-size: 1.6vh;
  color: #495057;
  margin-top: 1vh;
  font-family: 'Courier New', monospace;
  overflow-x: auto;
}

.logs {
  background: #2c3e50;
  color: white;
  padding: 2vh;
  border-radius: 1vh;
  max-height: 30vh;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
}

.log-entry {
  display: flex;
  gap: 1vw;
  margin-bottom: 0.5vh;
  padding: 0.5vh 0;
  border-bottom: 1px solid #34495e;
}

.log-time {
  color: #3498db;
  min-width: 80px;
  font-size: 1.6vh;
}

.log-message {
  color: #ecf0f1;
  font-size: 1.6vh;
}

.no-logs {
  text-align: center;
  color: #95a5a6;
  font-style: italic;
  padding: 2vh 0;
}

/* Responsive */
@media (max-width: 768px) {
  .buttons-grid {
    grid-template-columns: 1fr;
  }
  
  .button-example code {
    font-size: 1.4vh;
  }
}
</style>
