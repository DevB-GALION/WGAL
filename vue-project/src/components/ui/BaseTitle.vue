<template>
  <div :class="['title-container', sizeClasses, alignmentClass]">
    <img v-if="icon" :src="iconUrl" :alt="icon" class="title-icon" />
    <component :is="tag" :class="['title-text', colorClass]">
      <slot />
    </component>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BaseTitle',
  props: {
    // Niveau du titre (h1, h2, h3, etc.)
    tag: {
      type: String,
      default: 'h2',
      validator: (value) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'].includes(value)
    },
    // Taille du titre
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'xlarge', 'xxlarge'].includes(value)
    },
    // Icône à afficher
    icon: {
      type: String,
      default: null
    },
    // Position de l'icône
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
    },
    // Alignement du titre
    align: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'center', 'right'].includes(value)
    },
    // Couleur du titre
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'dark', 'light', 'danger', 'warning', 'success'].includes(value)
    },
    // Espacement sous le titre
    spacing: {
      type: String,
      default: 'normal',
      validator: (value) => ['none',"xsmall", 'small', 'normal', 'large'].includes(value)
    }
  },
  setup(props) {
    const iconUrl = computed(() => {
      if (!props.icon) return null
      return new URL(`../../assets/icons/${props.icon}.svg`, import.meta.url).href
    })

    const sizeClasses = computed(() => {
      const classes = [`title-${props.size}`, `title-spacing-${props.spacing}`]
      
      // Ajouter la classe de position d'icône
      if (props.icon) {
        classes.push(`icon-${props.iconPosition}`)
      }
      
      return classes.join(' ')
    })

    const alignmentClass = computed(() => `title-${props.align}`)
    
    const colorClass = computed(() => `title-color-${props.color}`)

    return {
      iconUrl,
      sizeClasses,
      alignmentClass,
      colorClass
    }
  }
}
</script>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
  width: 100%;
}

/* Alignements */
.title-left {
  justify-content: flex-start;
  text-align: left;
}

.title-center {
  justify-content: center;
  text-align: center;
}

.title-right {
  justify-content: flex-end;
  text-align: right;
}

/* Positions des icônes */
.icon-left {
  flex-direction: row;
}

.icon-right {
  flex-direction: row-reverse;
}

.icon-top {
  flex-direction: column;
}

.icon-bottom {
  flex-direction: column-reverse;
}

/* Icône */
.title-icon {
  flex-shrink: 0;
  object-fit: contain;
}

/* Tailles des icônes et titres */

.title-xsmall .title-icon {
  width: 1.5vh;
  height: 1.5vh;
}
.title-small .title-icon {
  width: 2.5vh;
  height: 2.5vh;
}

.title-medium .title-icon {
  width: 3vh;
  height: 3vh;
}

.title-large .title-icon {
  width: 4vh;
  height: 4vh;
}

.title-xlarge .title-icon {
  width: 5vh;
  height: 5vh;
}

.title-xxlarge .title-icon {
  width: 6vh;
  height: 6vh;
}

/* Espacement entre icône et texte */
.icon-left .title-icon,
.icon-right .title-text {
  margin-right: 1vw;
}

.icon-right .title-icon,
.icon-left .title-text {
  margin-left: 1vw;
}

.icon-top .title-icon,
.icon-bottom .title-text {
  margin-bottom: 1vh;
}

.icon-bottom .title-icon,
.icon-top .title-text {
  margin-top: 1vh;
}

/* Styles du texte */
.title-text {
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
}

/* Tailles de police */
.title-small .title-text {
  font-size: 2.5vh;
}
.title-xsmall .title-text {
  font-size: 1.5vh;
}

.title-medium .title-text {
  font-size: 3.5vh;
}

.title-large .title-text {
  font-size: 4.5vh;
}

.title-xlarge .title-text {
  font-size: 5.5vh;
}

.title-xxlarge .title-text {
  font-size: 6.5vh;
}

/* Couleurs */
.title-color-primary {
  color: var(--primary-color);
}

.title-color-secondary {
  color: var(--secondary-color);
}

.title-color-dark {
  color: var(--dark-color);
}

.title-color-light {
  color: var(--light-color);
}

.title-color-danger {
  color: var(--danger-color);
}

.title-color-warning {
  color: var(--warning-color);
}

.title-color-success {
  color: #28a745;
}

/* Espacement sous le titre */
.title-spacing-none {
  margin-bottom: 0;
}

.title-spacing-small {
  margin-bottom: 1vh;
}
.title-spacing-xsmall {
  margin-bottom: 0.5vh;
}
.title-spacing-normal {
  margin-bottom: 2vh;
}

.title-spacing-large {
  margin-bottom: 4vh;
}

/* Effets spéciaux */
.title-container:hover .title-icon {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.title-container:hover .title-text {
  transition: color 0.3s ease;
}

/* Styles pour les colonnes (icône top/bottom) */
.icon-top, .icon-bottom {
  align-items: center;
}

.icon-top .title-text,
.icon-bottom .title-text {
  margin-left: 0;
  margin-right: 0;
}

/* Responsive */
@media (max-width: 768px) {
  
  .title-xsmall .title-text {
    font-size: 1.5vh;
  }
  
  .title-small .title-text {
    font-size: 2vh;
  }

  .title-medium .title-text {
    font-size: 3vh;
  }

  .title-large .title-text {
    font-size: 4vh;
  }

  .title-xlarge .title-text {
    font-size: 5vh;
  }

  .title-xxlarge .title-text {
    font-size: 6vh;
  }
  
   .title-xsmall .title-icon {
    width: 1.5vh;
    height: 1.5vh;
  }
  .title-small .title-icon {
    width: 2vh;
    height: 2vh;
  }

  .title-medium .title-icon {
    width: 2.5vh;
    height: 2.5vh;
  }

  .title-large .title-icon {
    width: 3.5vh;
    height: 3.5vh;
  }

  .title-xlarge .title-icon {
    width: 4.5vh;
    height: 4.5vh;
  }

  .title-xxlarge .title-icon {
    width: 5.5vh;
    height: 5.5vh;
  }
}

/* Animation d'apparition */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(1vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-container {
  animation: fadeInUp 0.5s ease-out;
}
</style>
