<template>
  <div class="about-page">
    <h1>À propos</h1>
    <p>Cette page contient des informations sur l'application.</p>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  setup() {
    return {}
  }
}
</script>

<style scoped>
.about-page {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: var(--dark-color);
}
</style>
