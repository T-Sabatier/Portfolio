import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.scss"
import projectsData from '../../Data/Projects.json';
import { useGallery } from '../../Context/GalleryContext';

function Home() {
  const { isOpen, setIsOpen, closeGallery, selectedIndex, setSelectedIndex } = useGallery();

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

  const handleOverlayClick = () => {
    closeGallery();
  };

  const calculateOffset = () => {
    if (!isOpen) {
      return `calc(50vw - 40px - ${selectedIndex * 90}px)`;
    } else {
      let offset = 0;
      for (let i = 0; i < selectedIndex; i++) {
        if (i === selectedIndex - 1) {
          offset += 310;
        } else {
          offset += 90;
        }
      }
      return `calc(50vw - 300px - ${offset}px)`;
    }
  };

  return (
    <div className="home__container">
      {isOpen && (
        <motion.div
          className="overlay"
          onClick={handleOverlayClick}
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
                <div className="gallery__image-wrapper">
                  {isSelected && (
                    <motion.h2
                      className="gallery__title"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      {project.title}
                    </motion.h2>
                  )}

                  <img
                    className="gallery__img"
                    src={project.images.thumbnail}
                    alt={project.title}
                  />
                </div>

                {isSelected && (
                  <motion.div
                    className="gallery__content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="gallery__content-grid">
                      <div className="gallery__infos">
                        <p>{project.date}</p>
                        <p>{project.type}</p>
                        <p>{project.role}</p>
                        <p>{project.technologies}</p>
                      </div>

                      <div className="gallery__explore-wrapper">
                        <button className="gallery__explore">Explore</button>
                      </div>

                      <div className="gallery__description-wrapper">
                        <p className="gallery__description">{project.description}</p>
                      </div>
                    </div>
                  </motion.div>
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