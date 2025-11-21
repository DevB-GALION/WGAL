<template>
  <div class="title-demo">
    <BaseTitle tag="h1" size="xxlarge" icon="Groupes_orange" align="center" color="primary">
      Démonstration des Titres
    </BaseTitle>

    <!-- Différentes tailles -->
    <section class="demo-section">
      <BaseTitle tag="h2" size="large" color="secondary" spacing="large">
        Différentes Tailles
      </BaseTitle>
      
      <div class="titles-showcase">
        <BaseTitle size="small" icon="Groupes_orange" spacing="small">
          Titre Small (2.5vh)
        </BaseTitle>
        
        <BaseTitle size="medium" icon="Groupes_orange" spacing="small">
          Titre Medium (3.5vh)
        </BaseTitle>
        
        <BaseTitle size="large" icon="Groupes_orange" spacing="small">
          Titre Large (4.5vh)
        </BaseTitle>
        
        <BaseTitle size="xlarge" icon="Groupes_orange" spacing="small">
          Titre XLarge (5.5vh)
        </BaseTitle>
        
        <BaseTitle size="xxlarge" icon="Groupes_orange" spacing="normal">
          Titre XXLarge (6.5vh)
        </BaseTitle>
      </div>
    </section>

    <!-- Positions des icônes -->
    <section class="demo-section">
      <BaseTitle tag="h2" size="large" color="secondary" spacing="large">
        Positions des Icônes
      </BaseTitle>
      
      <div class="positions-grid">
        <div class="title-example">
          <h3>Icône à Gauche (défaut)</h3>
          <BaseTitle icon="Groupes_orange" icon-position="left">
            Texte avec icône à gauche
          </BaseTitle>
        </div>

        <div class="title-example">
          <h3>Icône à Droite</h3>
          <BaseTitle icon="Groupes_orange" icon-position="right">
            Texte avec icône à droite
          </BaseTitle>
        </div>

        <div class="title-example">
          <h3>Icône en Haut</h3>
          <BaseTitle icon="Groupes_orange" icon-position="top" align="center">
            Texte avec icône en haut
          </BaseTitle>
        </div>

        <div class="title-example">
          <h3>Icône en Bas</h3>
          <BaseTitle icon="Groupes_orange" icon-position="bottom" align="center">
            Texte avec icône en bas
          </BaseTitle>
        </div>
      </div>
    </section>

    <!-- Alignements -->
    <section class="demo-section">
      <BaseTitle tag="h2" size="large" color="secondary" spacing="large">
        Alignements
      </BaseTitle>
      
      <div class="alignments-showcase">
        <BaseTitle icon="home" align="left" spacing="small">
          Aligné à gauche (défaut)
        </BaseTitle>
        
        <BaseTitle icon="check" align="center" spacing="small">
          Aligné au centre
        </BaseTitle>
        
        <BaseTitle icon="smile" align="right" spacing="normal">
          Aligné à droite
        </BaseTitle>
      </div>
    </section>

    <!-- Couleurs -->
    <section class="demo-section">
      <BaseTitle tag="h2" size="large" color="secondary" spacing="large">
        Couleurs Disponibles
      </BaseTitle>
      
      <div class="colors-grid">
        <BaseTitle color="primary" icon="home" spacing="small">
          Couleur Primary
        </BaseTitle>
        
        <BaseTitle color="secondary" icon="check" spacing="small">
          Couleur Secondary
        </BaseTitle>
        
        <BaseTitle color="dark" icon="smile" spacing="small">
          Couleur Dark
        </BaseTitle>
        
        <BaseTitle color="danger" icon="home" spacing="small">
          Couleur Danger
        </BaseTitle>
        
        <BaseTitle color="warning" icon="check" spacing="small">
          Couleur Warning
        </BaseTitle>
        
        <BaseTitle color="success" icon="smile" spacing="normal">
          Couleur Success
        </BaseTitle>
      </div>
    </section>

    <!-- Tags HTML différents -->
    <section class="demo-section">
      <BaseTitle tag="h2" size="large" color="secondary" spacing="large">
        Tags HTML Différents
      </BaseTitle>
      
      <div class="tags-showcase">
        <BaseTitle tag="h1" size="large" icon="home" spacing="small">
          Tag H1 - Titre principal
        </BaseTitle>
        
        <BaseTitle tag="h2" size="medium" icon="check" spacing="small">
          Tag H2 - Sous-titre
        </BaseTitle>
        
        <BaseTitle tag="h3" size="medium" icon="smile" spacing="small">
          Tag H3 - Titre de section
        </BaseTitle>
        
        <BaseTitle tag="p" size="small" icon="home" spacing="small">
          Tag P - Paragraphe avec style de titre
        </BaseTitle>
        
        <BaseTitle tag="span" size="small" icon="check" spacing="normal">
          Tag SPAN - Texte inline stylisé
        </BaseTitle>
      </div>
    </section>

    <!-- Espacement -->
    <section class="demo-section">
      <BaseTitle tag="h2" size="large" color="secondary" spacing="large">
        Espacement Sous le Titre
      </BaseTitle>
      
      <div class="spacing-showcase">
        <BaseTitle spacing="none" icon="home">
          Espacement: None
        </BaseTitle>
        <p>Ce paragraphe suit immédiatement le titre sans espacement.</p>
        
        <BaseTitle spacing="small" icon="check">
          Espacement: Small
        </BaseTitle>
        <p>Ce paragraphe a un petit espacement avec le titre.</p>
        
        <BaseTitle spacing="normal" icon="smile">
          Espacement: Normal (défaut)
        </BaseTitle>
        <p>Ce paragraphe a un espacement normal avec le titre.</p>
        
        <BaseTitle spacing="large" icon="home">
          Espacement: Large
        </BaseTitle>
        <p>Ce paragraphe a un grand espacement avec le titre.</p>
      </div>
    </section>

    <!-- Cas d'usage pratiques -->
    <section class="demo-section">
      <BaseTitle tag="h2" size="large" color="secondary" spacing="large">
        Cas d'Usage Pratiques
      </BaseTitle>
      
      <div class="use-cases">
        <!-- Titre de page -->
        <div class="use-case">
          <h3>Titre de Page</h3>
          <div class="example-container">
            <BaseTitle 
              tag="h1" 
              size="xxlarge" 
              icon="home" 
              align="center" 
              color="primary" 
              spacing="large"
            >
              Dashboard Principal
            </BaseTitle>
            <p>Contenu de la page ici...</p>
          </div>
        </div>

        <!-- Titre de section -->
        <div class="use-case">
          <h3>Titre de Section</h3>
          <div class="example-container">
            <BaseTitle 
              tag="h2" 
              size="large" 
              icon="check" 
              color="secondary"
              spacing="normal"
            >
              Liste des Tâches
            </BaseTitle>
            <p>Liste des éléments de cette section...</p>
          </div>
        </div>

        <!-- Titre d'article -->
        <div class="use-case">
          <h3>Titre d'Article</h3>
          <div class="example-container">
            <BaseTitle 
              tag="h3" 
              size="medium" 
              icon="smile" 
              color="dark"
              spacing="small"
            >
              Comment utiliser les composants
            </BaseTitle>
            <p>Contenu de l'article explicatif...</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { BaseTitle } from '@/components/ui'
</script>

<style scoped>
.title-demo {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3vh 2vw;
}

.demo-section {
  margin-bottom: 6vh;
}

.titles-showcase {
  background: white;
  padding: 3vh 2vw;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3vh 2vw;
}

.title-example {
  background: white;
  padding: 2vh;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.title-example h3 {
  color: var(--secondary-color);
  margin-bottom: 1.5vh;
  font-size: 2vh;
  text-align: center;
}

.alignments-showcase {
  background: white;
  padding: 3vh 2vw;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.colors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2vh 1vw;
  background: white;
  padding: 3vh 2vw;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
}

.tags-showcase {
  background: white;
  padding: 3vh 2vw;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
}

.spacing-showcase {
  background: white;
  padding: 3vh 2vw;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
}

.spacing-showcase p {
  margin: 0 0 3vh 0;
  padding: 1vh 2vw;
  background: #f8f9fa;
  border-left: 3px solid var(--primary-color);
  font-size: 1.8vh;
  color: #6c757d;
}

.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3vh 2vw;
}

.use-case {
  background: white;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.use-case h3 {
  background: var(--primary-color);
  color: white;
  margin: 0;
  padding: 1.5vh 2vw;
  font-size: 2vh;
}

.example-container {
  padding: 2vh;
}

.example-container p {
  font-size: 1.8vh;
  color: #6c757d;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .positions-grid {
    grid-template-columns: 1fr;
  }
  
  .colors-grid {
    grid-template-columns: 1fr;
  }
  
  .use-cases {
    grid-template-columns: 1fr;
  }
}
</style>
