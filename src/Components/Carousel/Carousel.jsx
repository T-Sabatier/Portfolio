import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Projects from "../../Data/Projects.json";
import ProjectView from "../ProjectView/ProjectView";
import "./Carousel.scss";

function Carousel({ initialProjectId, onClose }) {

  const initialIndex = Projects.findIndex(p => p.id === initialProjectId);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    const currentProject = Projects[currentIndex];
    if (currentProject) {
      document.body.dataset.theme = currentProject.theme;
    }

    return () => {
      delete document.body.dataset.theme;
    };
  }, [currentIndex]);

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
    <motion.div
      className="carousel"
      initial={false}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="carousel__close" onClick={onClose}>X</button>

      <div className="carousel__container">
        <motion.div
          className="carousel__track"
          initial={{
            x: `calc(-${currentIndex * 60}vw + 20vw)`
          }}
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
    </motion.div>
  );
}

export default Carousel;