<template>
  <div class="login-form">
    <BaseTitle 
      size="large" 
      color="secondary" 
      alignment="center"
      class="login-title">
      Connexion
    </BaseTitle>
    
    <form @submit.prevent="handleLogin" class="login-form-container">
      <div class="form-group">
        <BaseInput
          v-model="credentials.email"
          type="email"
          label="Email"
          placeholder="Votre adresse email"
          :required="true"
          :disabled="loading"
        />
      </div>
      
      <div class="form-group">
        <BaseInput
          v-model="credentials.password"
          type="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          :required="true"
          :disabled="loading"
        />
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <BaseButton 
        variant="primary"
        size="medium"
        type="submit" 
        :loading="loading" 
        :disabled="loading"
        class="login-button">
        Se connecter
      </BaseButton>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseTitle from '@/components/ui/BaseTitle.vue'

export default {
  name: 'LoginForm',
  components: {
    BaseButton,
    BaseInput,
    BaseTitle
  },
  setup() {
    const { login, loading, error } = useAuth()
    
    const credentials = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        // Pour les tests, on simule une connexion réussie
        localStorage.setItem('isConnected', 'true')
        sessionStorage.setItem('isConnected', 'true')
        
        // Optionnel : utiliser le système d'auth existant
        // await login(credentials.value)
        
        console.log('Connexion réussie!')
        
        // Émettre un événement pour indiquer la connexion réussie
        window.dispatchEvent(new CustomEvent('user-logged-in'))
        
      } catch (err) {
        console.error('Erreur de connexion:', err)
      }
    }

    return {
      credentials,
      loading,
      error,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 450px;
  margin: 2rem auto;
  padding: 3rem 2.5rem;
  background: var(--background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  position: relative;
}

.login-title {
  margin-bottom: 2.5rem;
}

.login-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  width: 100%;
}

.error-message {
  color: var(--danger-color);
  font-size: 0.9rem;
  padding: 1rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: var(--border-radius);
  border-left: 4px solid var(--danger-color);
  font-weight: 500;
}

.login-button {
  margin-top: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Style pour les labels des inputs */
.form-group :deep(label) {
  color: var(--secondary-color) !important;
  font-weight: 600;
}
</style>
