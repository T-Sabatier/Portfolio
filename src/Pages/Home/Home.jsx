import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Home.scss"
import projectsData from '../../Data/Projects.json';
import { useGallery } from '../../Context/GalleryContext';

function Home() {
  const { isOpen, setIsOpen, closeGallery, selectedIndex, setSelectedIndex } = useGallery();
  const navigate = useNavigate();

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

  const handleExplore = (projectId) => {
    navigate(`/project/${projectId}/details`);
  };

  const calculateOffset = () => {
    // Détection de la taille d'écran
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

    // Largeurs des items selon l'écran
    const itemWidth = isMobile ? 60 : 80;
    const selectedWidth = isMobile ? 60 : isTablet ? 90 : 100;
    const adjacentWidth = isMobile ? 70 : isTablet ? 80 : 90;

    if (!isOpen) {
      return `calc(50vw - ${selectedWidth / 2}px - ${selectedIndex * itemWidth}px)`;
    } else {
      if (isMobile) {
        // En mobile, on centre l'élément sélectionné
        return `calc(50vw - 45vw - ${selectedIndex * itemWidth}px)`;
      }

      let offset = 0;
      for (let i = 0; i < selectedIndex; i++) {
        if (i === selectedIndex - 1) {
          offset += isTablet ? 240 : 310;
        } else {
          offset += itemWidth;
        }
      }
      const centerOffset = isTablet ? 250 : 300;
      return `calc(50vw - ${centerOffset}px - ${offset}px)`;
    }
  };

  return (
    <motion.div
      className="home__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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

            // Largeurs responsive
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

            const selectedWidthValue = isMobile ? '90vw' : isTablet ? 500 : 600;
            const adjacentWidthValue = isMobile ? 70 : isTablet ? 80 : 300;
            const defaultWidthValue = isMobile ? 60 : 80;

            return (
              <motion.div
                key={project.id}
                className={`gallery__item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleProjectClick(index)}
                animate={{
                  width: isSelected ? selectedWidthValue : isAdjacent ? adjacentWidthValue : defaultWidthValue,
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
                      className={`gallery__title ${window.innerWidth <= 768 ? 'gallery__title--selected-mobile' : ''}`}
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
                        <button
                          className="gallery__explore"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExplore(project.id);
                          }}
                        >
                          Explore
                        </button>
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
    </motion.div>
  );
}

export default Home;