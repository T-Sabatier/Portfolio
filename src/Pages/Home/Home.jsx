import { useState } from 'react';
import projectsData from '../../Data/Projects.json';
import Gallery from '../../Components/Gallery/Gallery';
import ProjectView from '../../Components/ProjectView/ProjectView';
import DetailsView from '../../Components/DetailsView/DetailsView';

function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [view, setView] = useState('gallery');

  return (
    <div className="home-container">

      {/* Layer 1 - Galerie toujours présente */}
      {view === 'gallery' && (
        <Gallery
          projects={projectsData}
          onProjectClick={(id) => { /*mémorise le projet cliqué*/
            setSelectedProject(id); /*mémorise le projet */
            setView('project'); /*change l'état pour afficher layer 2*/
          }}
        />
      )}

      {/* Layer 2 - Vue projet */}
      {view === 'project' && (
        <ProjectView
          project={projectsData.find(p => p.id === selectedProject)}
          onMenuClick={() => setView('gallery')}
          onExploreClick={() => setView('details')}
        />
      )}

      {/* Layer 3 - Vue détails */}
      {view === 'details' && (
        <DetailsView
          project={projectsData.find(p => p.id === selectedProject)}
          onBackClick={() => setView('project')}
        />
      )}

    </div>
  );
}

export default Home;