import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  // ← Ajoute ces imports
import Projects from "../../Data/Projects.json";
import ProjectView from "../ProjectView/ProjectView";
import "./Carousel.scss";

function Carousel() {
  const { id } = useParams();  // Récupère l'ID depuis l'URL
  const navigate = useNavigate();  // Pour changer l'URL

  // Trouve l'index du projet depuis l'URL
  const initialIndex = Projects.findIndex(p => p.id === parseInt(id));
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  // Met à jour l'URL quand currentIndex change
  useEffect(() => {
    const currentProject = Projects[currentIndex];
    if (currentProject) {
      navigate(`/project/${currentProject.id}`, { replace: true });  // Change l'URL sans ajouter d'historique
      document.body.dataset.theme = currentProject.theme;
    }

    return () => {
      delete document.body.dataset.theme;
    };
  }, [currentIndex, navigate]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < Projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="carousel">
      <div className="carousel__container">
        <motion.div
          className="carousel__track"
          animate={{
            x: `calc(-${currentIndex * 60}vw + 20vw)`
          }}
          transition={{
            type: "tween",
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          {Projects.map((project, index) => (
            <div
              key={project.id}
              className={`carousel__slide ${index === currentIndex ? 'carousel__slide--active' : ''}`}
              onClick={() => {
                if (index === currentIndex - 1) goToPrevious();
                if (index === currentIndex + 1) goToNext();
              }}
            >
              <ProjectView project={project} hideCloseButton={true} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Carousel;