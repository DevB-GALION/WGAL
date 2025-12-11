<template>
  <div class="input-demo">
    <h1>Démonstration des Composants Input</h1>

    <!-- Inputs de base -->
    <section class="demo-section">
      <h2>Inputs de Base</h2>
      <div class="inputs-grid">
        
        <!-- Input Text -->
        <div class="input-example">
          <h3>Input Text</h3>
          <BaseInput
            v-model="formData.name"
            type="text"
            label="Nom complet"
            placeholder="Entrez votre nom"
            help-text="Saisissez votre nom et prénom"
            required
          />
          <div class="value-display">Valeur: {{ formData.name }}</div>
        </div>

        <!-- Input Email -->
        <div class="input-example">
          <h3>Input Email</h3>
          <BaseInput
            v-model="formData.email"
            type="email"
            label="Adresse email"
            placeholder="exemple@email.com"
            :error-message="emailError"
            required
          />
          <div class="value-display">Valeur: {{ formData.email }}</div>
        </div>

        <!-- Input Password -->
        <div class="input-example">
          <h3>Input Password</h3>
          <BaseInput
            v-model="formData.password"
            type="password"
            label="Mot de passe"
            placeholder="••••••••"
            help-text="Minimum 8 caractères"
            required
          />
          <div class="value-display">Longueur: {{ formData.password.length }}</div>
        </div>

        <!-- Input Number -->
        <div class="input-example">
          <h3>Input Number</h3>
          <BaseInput
            v-model="formData.age"
            type="number"
            label="Âge"
            placeholder="25"
            help-text="Entre 18 et 99 ans"
          />
          <div class="value-display">Valeur: {{ formData.age }}</div>
        </div>

      </div>
    </section>

    <!-- Textarea et Select -->
    <section class="demo-section">
      <h2>Textarea et Select</h2>
      <div class="inputs-grid">
        
        <!-- Textarea -->
        <div class="input-example">
          <h3>Textarea</h3>
          <BaseInput
            v-model="formData.message"
            type="textarea"
            label="Message"
            placeholder="Votre message..."
            :rows="5"
            help-text="Maximum 500 caractères"
          />
          <div class="value-display">
            Caractères: {{ formData.message.length }}/500
          </div>
        </div>

        <!-- Select simple -->
        <div class="input-example">
          <h3>Select Simple</h3>
          <BaseInput
            v-model="formData.country"
            type="select"
            label="Pays"
            placeholder="Choisissez un pays"
            :options="countries"
            required
          />
          <div class="value-display">Valeur: {{ formData.country }}</div>
        </div>

        <!-- Select avec objets -->
        <div class="input-example">
          <h3>Select avec Objets</h3>
          <BaseInput
            v-model="formData.categoryId"
            type="select"
            label="Catégorie"
            placeholder="Sélectionnez une catégorie"
            :options="categories"
            option-value="id"
            option-label="name"
          />
          <div class="value-display">Valeur: {{ formData.categoryId }}</div>
        </div>

      </div>
    </section>

    <!-- Checkbox et Radio -->
    <section class="demo-section">
      <h2>Checkbox et Radio</h2>
      <div class="inputs-grid">
        
        <!-- Checkbox -->
        <div class="input-example">
          <h3>Checkbox</h3>
          <BaseInput
            v-model="formData.newsletter"
            type="checkbox"
            label="Newsletter"
            checkbox-label="Je souhaite recevoir la newsletter"
            help-text="Vous pouvez vous désabonner à tout moment"
          />
          <div class="value-display">Valeur: {{ formData.newsletter }}</div>
        </div>

        <!-- Radio Group -->
        <div class="input-example">
          <h3>Radio Group</h3>
          <BaseInput
            v-model="formData.gender"
            type="radio"
            label="Genre"
            :options="genderOptions"
            required
          />
          <div class="value-display">Valeur: {{ formData.gender }}</div>
        </div>

        <!-- Radio avec objets -->
        <div class="input-example">
          <h3>Radio avec Objets</h3>
          <BaseInput
            v-model="formData.planId"
            type="radio"
            label="Plan d'abonnement"
            :options="plans"
            option-value="id"
            option-label="name"
          />
          <div class="value-display">Valeur: {{ formData.planId }}</div>
        </div>

      </div>
    </section>

    <!-- Dates et File -->
    <section class="demo-section">
      <h2>Dates et Fichiers</h2>
      <div class="inputs-grid">
        
        <!-- Date -->
        <div class="input-example">
          <h3>Date</h3>
          <BaseInput
            v-model="formData.birthDate"
            type="date"
            label="Date de naissance"
            required
          />
          <div class="value-display">Valeur: {{ formData.birthDate }}</div>
        </div>

        <!-- DateTime -->
        <div class="input-example">
          <h3>Date et Heure</h3>
          <BaseInput
            v-model="formData.appointment"
            type="datetime-local"
            label="Rendez-vous"
          />
          <div class="value-display">Valeur: {{ formData.appointment }}</div>
        </div>

        <!-- File -->
        <div class="input-example">
          <h3>Fichier</h3>
          <BaseInput
            v-model="formData.avatar"
            type="file"
            label="Photo de profil"
            accept="image/*"
            help-text="JPG, PNG ou GIF (max 5MB)"
          />
          <div class="value-display">
            Fichier: {{ formData.avatar?.name || 'Aucun' }}
          </div>
        </div>

        <!-- Multiple Files -->
        <div class="input-example">
          <h3>Fichiers Multiples</h3>
          <BaseInput
            v-model="formData.documents"
            type="file"
            label="Documents"
            accept=".pdf,.doc,.docx"
            :multiple="true"
            help-text="PDF ou Word"
          />
          <div class="value-display">
            Fichiers: {{ formData.documents?.length || 0 }}
          </div>
        </div>

      </div>
    </section>

    <!-- Différentes tailles -->
    <section class="demo-section">
      <h2>Différentes Tailles</h2>
      <div class="sizes-demo">
        
        <BaseInput
          v-model="sampleText"
          type="text"
          size="small"
          label="Petit (Small)"
          placeholder="Taille small"
        />
        
        <BaseInput
          v-model="sampleText"
          type="text"
          size="medium"
          label="Moyen (Medium)"
          placeholder="Taille medium"
        />
        
        <BaseInput
          v-model="sampleText"
          type="text"
          size="large"
          label="Grand (Large)"
          placeholder="Taille large"
        />
        
        <BaseInput
          v-model="sampleText"
          type="text"
          size="xlarge"
          label="Très Grand (XLarge)"
          placeholder="Taille xlarge"
        />

      </div>
    </section>

    <!-- Récapitulatif des données -->
    <section class="demo-section">
      <h2>Données du Formulaire</h2>
      <div class="form-data">
        <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BaseInput } from '@/components/ui'

// Données du formulaire
const formData = ref({
  name: '',
  email: '',
  password: '',
  age: null,
  message: '',
  country: '',
  categoryId: '',
  newsletter: false,
  gender: '',
  planId: '',
  birthDate: '',
  appointment: '',
  avatar: null,
  documents: []
})

const sampleText = ref('Exemple de texte')

// Validation email
const emailError = computed(() => {
  if (formData.value.email && !formData.value.email.includes('@')) {
    return 'Adresse email invalide'
  }
  return ''
})

// Options pour les selects et radios
const countries = ref([
  'France',
  'Belgique',
  'Suisse',
  'Canada',
  'Maroc',
  'Tunisie'
])

const categories = ref([
  { id: '1', name: 'Informatique' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Marketing' },
  { id: '4', name: 'Ventes' }
])

const genderOptions = ref([
  'Homme',
  'Femme',
  'Non précisé'
])

const plans = ref([
  { id: 'free', name: 'Gratuit - 0€/mois' },
  { id: 'pro', name: 'Pro - 9€/mois' },
  { id: 'enterprise', name: 'Enterprise - 29€/mois' }
])
</script>

<style scoped>
.input-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3vh 2vw;
}

.input-demo h1 {
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

.inputs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3vh 2vw;
}

.input-example {
  background: var(--background-color);
  padding: 2vh;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.input-example h3 {
  color: var(--secondary-color);
  margin-bottom: 1.5vh;
  font-size: 2.2vh;
}

.value-display {
  margin-top: 1vh;
  padding: 0.5vh 1vw;
  background: #f8f9fa;
  border-radius: 0.3vh;
  font-size: 1.6vh;
  color: #495057;
  font-family: 'Courier New', monospace;
}

.sizes-demo {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  max-width: 600px;
}

.form-data {
  background: #2c3e50;
  color: white;
  padding: 2vh;
  border-radius: 1vh;
  overflow-x: auto;
}

.form-data pre {
  font-family: 'Courier New', monospace;
  font-size: 1.6vh;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .inputs-grid {
    grid-template-columns: 1fr;
  }
}
</style>
