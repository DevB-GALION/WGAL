<template>
  <button 
    :class="['btn', `btn-${variant}`, sizeClasses, { 'btn-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <img v-if="icon" :src="iconUrl" :alt="icon" class="btn-icon" />
    <span v-if="loading" class="spinner"></span>
    <slot />
  </button>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'warning'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    action: {
      type: [String, Function, Object],
      default: null
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const iconUrl = computed(() => {
      if (!props.icon) return null
      return new URL(`../../assets/icons/${props.icon}.svg`, import.meta.url).href
    })

    const sizeClasses = computed(() => {
      return `btn-${props.size}`
    })

    const handleClick = (event) => {
      // Émettre l'événement click par défaut
      emit('click', event)

      // Traiter l'action si elle existe
      if (props.action) {
        handleAction(props.action)
      }
    }

    const handleAction = (action) => {
      // Si c'est une fonction, l'exécuter
      if (typeof action === 'function') {
        action()
        return
      }

      // Si c'est une chaîne, traiter comme une URL ou une route
      if (typeof action === 'string') {
        // Si ça commence par http ou https, ouvrir dans un nouvel onglet
        if (action.startsWith('http://') || action.startsWith('https://')) {
          window.open(action, '_blank')
          return
        }

        // Si ça commence par mailto: ou tel:, utiliser window.location
        if (action.startsWith('mailto:') || action.startsWith('tel:')) {
          window.location.href = action
          return
        }

        // Sinon, traiter comme une navigation interne
        if (action.startsWith('/') || action.startsWith('#')) {
          window.location.href = action
          return
        }

        // Route relative (pour Vue Router si disponible)
        if (window.$router) {
          window.$router.push(action)
        } else {
          window.location.href = action
        }
        return
      }

      // Si c'est un objet avec des propriétés spécifiques
      if (typeof action === 'object') {
        // Navigation avec Vue Router
        if (action.route && window.$router) {
          window.$router.push(action.route)
          return
        }

        // URL externe
        if (action.url) {
          const target = action.newTab ? '_blank' : '_self'
          window.open(action.url, target)
          return
        }

        // Méthode à exécuter
        if (action.method && typeof action.method === 'function') {
          action.method(action.params || [])
          return
        }

        // Émission d'événement personnalisé
        if (action.emit) {
          emit(action.emit, action.data || null)
          return
        }
      }
    }

    return {
      iconUrl,
      sizeClasses,
      handleClick
    }
  }
}
</script>

<style scoped>
.btn {
  border: none;
  border-radius: 0.5vh;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3vw;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Tailles du bouton */
.btn-small {
  padding: 1vh 2vw;
  font-size: 1.8vh;
  height: 4vh;
}

.btn-medium {
  padding: 1.5vh 3vw;
  font-size: 2.2vh;
  height: 5vh;
}

.btn-large {
  padding: 2vh 4vw;
  font-size: 2.6vh;
  height: 6vh;
}

.btn-xlarge {
  padding: 2.5vh 5vw;
  font-size: 3vh;
  height: 7vh;
}

/* Couleurs des variantes */
.btn-primary {
  background-color: var(--primary-color);
  color: var(--background-color);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--tertiary-color);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: var(--background-color);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--tertiary-color);
}

.btn-danger {
  background-color: var(--danger-color);
  color: var(--background-color);
}

.btn-danger:hover:not(:disabled) {
  background-color: #c0392b;
}

.btn-warning {
  background-color: var(--warning-color);
  color: var(--background-color);
}

.btn-warning:hover:not(:disabled) {
  background-color: #e67e22;
}

.btn-navigation {
  background-color: transparent;
  color: #4A65C4;
  border: none;
}

.btn-iconButton {
  background-color: transparent;
  color: transparent;
  border: none;
}

.btn-navigation:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--tertiary-color);
}

/* Icône - prend la hauteur du bouton */
.btn-icon {
  height: 250%;
  width: auto;
  aspect-ratio: 1;
  object-fit: contain;
}

/* Spinner */
.spinner {
  height: 80%;
  width: auto;
  aspect-ratio: 1;
  border: 0.2vh solid transparent;
  border-top: 0.2vh solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive pour très petits écrans */
@media (max-width: 480px) {
  .btn-small {
    padding: 0.8vh 1.5vw;
    font-size: 1.6vh;
    height: 3.5vh;
  }
  
  .btn-medium {
    padding: 1.2vh 2.5vw;
    font-size: 2vh;
    height: 4.5vh;
  }
  
  .btn-large {
    padding: 1.8vh 3.5vw;
    font-size: 2.4vh;
    height: 5.5vh;
  }
  
  .btn-xlarge {
    padding: 2.2vh 4.5vw;
    font-size: 2.8vh;
    height: 6.5vh;
  }
}
</style>
