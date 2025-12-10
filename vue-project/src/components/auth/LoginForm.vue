<template>
  <div class="login-form">
    <h2>Connexion</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email :</label>
        <input 
          id="email"
          v-model="credentials.email" 
          type="email" 
          required 
          :disabled="loading"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input 
          id="password"
          v-model="credentials.password" 
          type="password" 
          required 
          :disabled="loading"
        />
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <BaseButton 
        type="submit" 
        :loading="loading" 
        :disabled="loading"
      >
        Se connecter
      </BaseButton>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import BaseButton from '@/components/ui/BaseButton.vue'

export default {
  name: 'LoginForm',
  components: {
    BaseButton
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
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--dark-color);
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: 4px;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
}
</style>
