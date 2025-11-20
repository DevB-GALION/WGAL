<template>
  <div class="home-page">
    <h1>Page d'accueil</h1>
    <p>Bienvenue sur votre application Vue.js !</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  setup() {
    return {}
  }
}
</script>

<style scoped>
.home-page {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: var(--dark-color);
}
</style>
