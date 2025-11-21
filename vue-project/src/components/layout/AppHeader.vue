<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <h2>Vue App</h2>
      </div>
      <nav class="navigation">
        <ul>
          <li><a href="#" @click="$emit('navigate', 'home')">Accueil</a></li>
          <li><a href="#" @click="$emit('navigate', 'table')">Tableaux</a></li>
          <li><a href="#" @click="$emit('navigate', 'actions')">Actions</a></li>
          <li><a href="#" @click="$emit('navigate', 'demo')">Composants</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  emits: ['navigate'],
  setup() {
    return {}
  }
}
</script>

<style scoped>
.app-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: var(--box-shadow);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h2 {
  margin: 0;
  font-size: 1.5rem;
}

.navigation ul {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navigation a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.navigation a:hover {
  opacity: 0.8;
}
</style>
