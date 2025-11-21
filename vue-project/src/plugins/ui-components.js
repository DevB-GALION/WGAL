// Plugin pour enregistrer les composants UI globalement
import BaseButton from '@/components/ui/BaseButton.vue'

export default {
  install(app) {
    // Enregistrer les composants globalement
    app.component('BaseButton', BaseButton)
    
    // Vous pouvez ajouter d'autres composants ici
    // app.component('BaseInput', BaseInput)
    // app.component('BaseModal', BaseModal)
  }
}
