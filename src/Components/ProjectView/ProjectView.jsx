import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Projects from "../../Data/Projects.json";
import "./ProjectView.scss";

function ProjectView({ project = false }) {
  const params = useParams();
  const navigate = useNavigate();

  const projectFind = project || Projects.find((p) => p.id === parseInt(params.id));

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
    <div className="projectView">

      <button onClick={() => navigate(`/`)}> X </button>

      <h2>{projectFind.title}</h2>
      <img src={projectFind.images.main} alt={projectFind.title} />
      <div className="projectView__content">
        <div className="projectView__informations">
          <p>{projectFind.date}</p>
          <p>{projectFind.type}</p>
          <p>{projectFind.role}</p>
          <p>{projectFind.technologies}</p>
        </div>
        <div className="projectView__explore">
          <button onClick={() => navigate(`/project/${projectFind.id}/details`)}> Explore </button>
        </div>
        <div className="projectView__description">
          <p>{projectFind.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectView;