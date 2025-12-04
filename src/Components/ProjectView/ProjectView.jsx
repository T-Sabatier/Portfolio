import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Projects from "../../Data/Projects.json";
import "./ProjectView.scss";


function ProjectView() {

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
    <div className="projectView" >
      <button onClick={() => navigate(`/`)} > X </button>
      <h2>{projectFind.title}</h2>
      <img src={projectFind.images.main} />
      <div className="projectView__content">
        <div className="projectView__informations">
          <p>{projectFind.date}</p>
          <p>{projectFind.type}</p>
          <p>{projectFind.role}</p>
          <p>{projectFind.technologies}</p>
        </div>
        <div className="projectView__explore">
          <button onClick={() => navigate(`/project/${id}/details`)} > Explore </button>
        </div>
        <div className="projectView__description">
          <p>{projectFind.description}</p>
        </div>
      </div>
    </div>
  )
}
export default ProjectView