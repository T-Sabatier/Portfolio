// Import de motion depuis framer-motion pour créer des animations fluides
import { motion } from "framer-motion";
// Import des hooks React : useState pour gérer l'état, useEffect pour les effets de bord
import { useState, useEffect } from "react";
// Import des données des projets depuis le fichier JSON
import Projects from "../../Data/Projects.json";
// Import du composant ProjectView qui affiche les détails d'un projet
import ProjectView from "../ProjectView/ProjectView";
// Import du fichier de styles SCSS pour le carousel
import "./Carousel.scss";

// Déclaration du composant Carousel
function Carousel() {
  // État qui stocke l'index du projet actuellement affiché (0 = premier projet, 1 = deuxième, etc.)
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect s'exécute à chaque fois que currentIndex change
  useEffect(() => {
    // Récupère le projet actuel dans le tableau Projects selon l'index
    const currentProject = Projects[currentIndex];

    // Si le projet existe
    if (currentProject) {
      // Applique le thème du projet au body (change les couleurs CSS via data-theme)
      document.body.dataset.theme = currentProject.theme;
    }

    // Fonction de nettoyage : s'exécute quand le composant se démonte ou avant le prochain useEffect
    return () => {
      // Supprime l'attribut data-theme du body pour réinitialiser le thème
      delete document.body.dataset.theme;
    };
  }, [currentIndex]); // Le useEffect se relance uniquement quand currentIndex change

  // Fonction pour aller au projet précédent
  const goToPrevious = () => {
    // Vérifie qu'on n'est pas déjà sur le premier projet (index 0)
    if (currentIndex > 0) {
      // Diminue l'index de 1 pour afficher le projet précédent
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Fonction pour aller au projet suivant
  const goToNext = () => {
    // Vérifie qu'on n'est pas déjà sur le dernier projet
    if (currentIndex < Projects.length - 1) {
      // Augmente l'index de 1 pour afficher le projet suivant
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Retourne le JSX du composant (ce qui sera affiché à l'écran)
  return (
    // Conteneur principal du carousel
    <div className="carousel">
      {/* Conteneur qui masque le débordement (overflow hidden) */}
      <div className="carousel__container">
        {/* motion.div : div animable avec Framer Motion - c'est la piste qui glisse horizontalement */}
        <motion.div
          className="carousel__track"
          // animate : définit l'état d'arrivée de l'animation
          animate={{
            // x : déplacement horizontal (translateX)
            // Calcul : -60vw par projet + 20vw de décalage pour centrer
            // Exemple : index 0 → 20vw, index 1 → -40vw, index 2 → -100vw
            x: `calc(-${currentIndex * 60}vw + 20vw)`
          }}
          // transition : définit comment l'animation se déroule
          transition={{
            type: "tween",     // Type d'animation linéaire lissée (pas de rebond)
            duration: 0.6,     // Durée de l'animation en secondes
            ease: "easeInOut"  // Courbe d'accélération : lent au début, rapide au milieu, lent à la fin
          }}
        >
          {/* Boucle sur tous les projets pour créer une slide par projet */}
          {Projects.map((project, index) => (
            // Conteneur d'une slide individuelle
            <div
              // key unique obligatoire pour React lors du map
              key={project.id}
              // Classe CSS dynamique : ajoute --active si c'est le projet actuel
              className={`carousel__slide ${index === currentIndex ? 'carousel__slide--active' : ''}`}
              // Gestion du clic sur la slide
              onClick={() => {
                // Si on clique sur la slide à gauche (projet précédent), on recule
                if (index === currentIndex - 1) goToPrevious();
                // Si on clique sur la slide à droite (projet suivant), on avance
                if (index === currentIndex + 1) goToNext();
              }}
            >
              {/* Affiche le composant ProjectView avec les données du projet */}
              {/* hideCloseButton={true} cache le bouton X par défaut du ProjectView */}
              <ProjectView project={project} hideCloseButton={true} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// Export du composant pour pouvoir l'utiliser ailleurs
export default Carousel;