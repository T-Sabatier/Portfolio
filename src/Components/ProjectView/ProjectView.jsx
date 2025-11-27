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
    <div className="projectView" data-theme={projectFind.theme} >
      <button onClick={() => navigate(`/`)} > X </button>
      <img src={projectFind.images.main} />
      <div className="projectView__content">
        <h2>{projectFind.title}</h2>
        <p>{projectFind.description}</p>
        <button onClick={() => navigate(`/project/${id}/details`)} > Explore </button>
      </div>
    </div>
  )
}
export default ProjectView