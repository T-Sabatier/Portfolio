import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Projects from "../../Data/Projects.json";
import "./DetailsView.scss"

function DetailsView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectFind = Projects.find((project) => project.id === parseInt(id));

  useEffect(() => {
    if (projectFind) {
      document.body.dataset.theme = projectFind.theme;
    }

    return () => {
      delete document.body.dataset.theme;
    };
  }, [projectFind]);

  if (!projectFind) {
    return <Navigate to="/error" replace />;
  }

  return (
    <motion.div
      className="detailsView"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Titre à gauche de l'écran */}
      <motion.h2
        className="detailsView__title"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {projectFind.title}
      </motion.h2>

      {/* Container centré avec image et contenu */}
      <motion.div
        className="detailsView__container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <button
          className="detailsView__close"
          onClick={() => navigate("/")}
        >
          ↑
        </button>

        <div className="detailsView__image-wrapper">
          <img
            className="detailsView__img"
            src={projectFind.images.detail}
            alt={projectFind.title}
          />
        </div>

        <motion.div
          className="detailsView__content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="detailsView__content-grid">
            <div className="detailsView__informations">
              <p>{projectFind.date}</p>
              <p>{projectFind.type}</p>
              <p>{projectFind.role}</p>
              <p>{projectFind.technologies}</p>
            </div>

            <div className="detailsView__visit-wrapper">
              <button
                className="detailsView__visit"
                onClick={() => window.open(projectFind.link, '_blank')}
              >
                Visiter le site
              </button>
              <a href={projectFind.github}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery__github"
              >
                Repo Github
              </a>
            </div>

            <div className="detailsView__description-wrapper">
              <p className="detailsView__description">{projectFind.details}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default DetailsView;