import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.scss"
import projectsData from '../../Data/Projects.json';

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const selectedProject = projectsData[selectedIndex];
      document.body.dataset.theme = selectedProject.theme;
    } else {
      delete document.body.dataset.theme;
    }

    return () => {
      delete document.body.dataset.theme;
    };
  }, [isOpen, selectedIndex]);

  const handleProjectClick = (index) => {
    if (!isOpen) {
      setSelectedIndex(index);
      setIsOpen(true);
    } else if (index !== selectedIndex) {
      setSelectedIndex(index);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Calculer l'offset pour centrer le projet actif
  const calculateOffset = () => {
    if (!isOpen) {
      // Mode fermé : centrer selon les images 80px
      return `calc(50vw - 40px - ${selectedIndex * 90}px)`;
    } else {
      // Mode ouvert : centrer selon les tailles variables
      let offset = 0;
      for (let i = 0; i < selectedIndex; i++) {
        if (i === selectedIndex - 1) {
          // Image juste avant = adjacent = 300px
          offset += 310; // 300px + 10px gap
        } else {
          // Images lointaines = 80px
          offset += 90; // 80px + 10px gap
        }
      }
      return `calc(50vw - 300px - ${offset}px)`; // Centre l'image de 600px
    }
  };

  return (
    <div className="home__container">
      {isOpen && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      )}

      <div className="gallery">
        <motion.div
          className="gallery__track"
          animate={{
            x: calculateOffset()
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25
          }}
        >
          {projectsData.map((project, index) => {
            const isSelected = index === selectedIndex && isOpen;
            const isAdjacent = isOpen && (index === selectedIndex - 1 || index === selectedIndex + 1);

            return (
              <motion.div
                key={project.id}
                className={`gallery__item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleProjectClick(index)}
                animate={{
                  width: isSelected ? 600 : isAdjacent ? 300 : 80,
                }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  duration: 1.5
                }}
                style={{
                  cursor: !isSelected ? 'pointer' : 'default'
                }}
              >
                <img
                  className="gallery__img"
                  src={project.images.thumbnail}
                  alt={project.title}
                />

                {isSelected && (
                  <>
                    <motion.button
                      className="gallery__close"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      X
                    </motion.button>

                    <motion.div
                      className="gallery__content"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 0.6 }}
                    >
                      <h2>{project.title}</h2>
                      <div className="gallery__infos">
                        <p>{project.date}</p>
                        <p>{project.type}</p>
                        <p>{project.role}</p>
                        <p>{project.technologies}</p>
                      </div>
                      <p className="gallery__description">{project.description}</p>
                      <button className="gallery__explore">Explore</button>
                    </motion.div>
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;