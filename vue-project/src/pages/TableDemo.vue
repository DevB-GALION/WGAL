<template>
  <div class="table-demo">
    <h1>Démonstration du DataTable</h1>
    
    <!-- Exemple 1: Tableau d'utilisateurs -->
    <section class="demo-section">
      <h2>Liste des utilisateurs</h2>
      <DataTable 
        :data="users" 
        :columns="userColumns"
        :items-per-page="5"
        :default-sort="{ column: 'nom', direction: 'asc' }"
      />
    </section>

    <!-- Exemple 2: Tableau de produits -->
    <section class="demo-section">
      <h2>Liste des produits</h2>
      <DataTable 
        :data="products" 
        :columns="productColumns"
        :items-per-page="8"
      />
    </section>

    <!-- Exemple 3: Tableau de commandes -->
    <section class="demo-section">
      <h2>Liste des commandes</h2>
      <DataTable 
        :data="orders" 
        :columns="orderColumns"
        :items-per-page="6"
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DataTable } from '@/components/ui'

// Données d'exemple - Utilisateurs
const users = ref([
  { id: 1, nom: 'Dupont', prenom: 'Jean', age: 25, email: 'jean.dupont@email.com', actif: true },
  { id: 2, nom: 'Martin', prenom: 'Marie', age: 32, email: 'marie.martin@email.com', actif: false },
  { id: 3, nom: 'Bernard', prenom: 'Pierre', age: 28, email: 'pierre.bernard@email.com', actif: true },
  { id: 4, nom: 'Durand', prenom: 'Sophie', age: 35, email: 'sophie.durand@email.com', actif: true },
  { id: 5, nom: 'Petit', prenom: 'Michel', age: 42, email: 'michel.petit@email.com', actif: false },
  { id: 6, nom: 'Robert', prenom: 'Catherine', age: 29, email: 'catherine.robert@email.com', actif: true },
  { id: 7, nom: 'Richard', prenom: 'Thomas', age: 33, email: 'thomas.richard@email.com', actif: true },
  { id: 8, nom: 'Dubois', prenom: 'Isabelle', age: 27, email: 'isabelle.dubois@email.com', actif: false }
])

// Configuration des colonnes pour les utilisateurs
const userColumns = ref([
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'nom', label: 'Nom', type: 'text' },
  { key: 'prenom', label: 'Prénom', type: 'text' },
  { key: 'age', label: 'Âge', type: 'number' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'actif', label: 'Actif', type: 'boolean' }
])

// Données d'exemple - Produits
const products = ref([
  { id: 1, nom: 'Ordinateur portable', prix: 899.99, stock: 15, categorie: 'Informatique' },
  { id: 2, nom: 'Smartphone', prix: 599.99, stock: 32, categorie: 'Téléphonie' },
  { id: 3, nom: 'Tablette', prix: 349.99, stock: 8, categorie: 'Informatique' },
  { id: 4, nom: 'Casque audio', prix: 129.99, stock: 25, categorie: 'Audio' },
  { id: 5, nom: 'Souris', prix: 29.99, stock: 45, categorie: 'Accessoires' },
  { id: 6, nom: 'Clavier', prix: 79.99, stock: 18, categorie: 'Accessoires' },
  { id: 7, nom: 'Écran', prix: 299.99, stock: 12, categorie: 'Informatique' },
  { id: 8, nom: 'Imprimante', prix: 159.99, stock: 7, categorie: 'Bureautique' },
  { id: 9, nom: 'Webcam', prix: 89.99, stock: 22, categorie: 'Accessoires' },
  { id: 10, nom: 'Enceinte Bluetooth', prix: 79.99, stock: 35, categorie: 'Audio' }
])

// Configuration des colonnes pour les produits
const productColumns = ref([
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'nom', label: 'Nom du produit', type: 'text' },
  { key: 'prix', label: 'Prix', type: 'currency' },
  { key: 'stock', label: 'Stock', type: 'number' },
  { key: 'categorie', label: 'Catégorie', type: 'text' }
])

// Données d'exemple - Commandes
const orders = ref([
  { 
    id: 1001, 
    client: { nom: 'Dupont', prenom: 'Jean' }, 
    montant: 1299.98, 
    date: new Date(2025, 0, 15), 
    statut: 'Livré' 
  },
  { 
    id: 1002, 
    client: { nom: 'Martin', prenom: 'Marie' }, 
    montant: 599.99, 
    date: new Date(2025, 0, 18), 
    statut: 'En cours' 
  },
  { 
    id: 1003, 
    client: { nom: 'Bernard', prenom: 'Pierre' }, 
    montant: 849.97, 
    date: new Date(2025, 0, 20), 
    statut: 'Expédié' 
  },
  { 
    id: 1004, 
    client: { nom: 'Durand', prenom: 'Sophie' }, 
    montant: 129.99, 
    date: new Date(2025, 0, 22), 
    statut: 'En attente' 
  },
  { 
    id: 1005, 
    client: { nom: 'Petit', prenom: 'Michel' }, 
    montant: 379.98, 
    date: new Date(2025, 1, 2), 
    statut: 'Livré' 
  }
])

// Configuration des colonnes pour les commandes
const orderColumns = ref([
  { key: 'id', label: 'N° Commande', type: 'number' },
  { key: 'client.nom', label: 'Nom Client', type: 'text' },
  { key: 'client.prenom', label: 'Prénom Client', type: 'text' },
  { key: 'montant', label: 'Montant', type: 'currency' },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'statut', label: 'Statut', type: 'text' }
])
</script>

<style scoped>
.table-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3vh 2vw;
}

.table-demo h1 {
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
  margin-bottom: 2vh;
  font-size: 3vh;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 1vh;
}
</style>
