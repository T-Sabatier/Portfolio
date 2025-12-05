import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./Home.scss"
import projectsData from '../../Data/Projects.json';
import Gallery from '../../Components/Gallery/Gallery';
import Carousel from '../../Components/Carousel/Carousel';

function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleClose = () => {
    setSelectedProjectId(null);
  };

  return (
    <div className="home__container">
      {/* Gallery toujours présente quand aucun projet sélectionné */}
      {selectedProjectId === null && (
        <Gallery
          projects={projectsData}
          onProjectClick={handleProjectClick}
        />
      )}

      {/* Carousel par-dessus quand un projet est sélectionné */}
      <AnimatePresence>
        {selectedProjectId !== null && (
          <Carousel
            key="carousel"
            initialProjectId={selectedProjectId}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;