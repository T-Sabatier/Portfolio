import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
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
    <div className="detailsView">
      <button onClick={() => navigate(`/project/${id}`)} > Project </button>
      <h2>{projectFind.title}</h2>
      <img src={projectFind.images.detail} />
      <div className="detailsView__content">
        <div className="detailsView__informations">
          <p>{projectFind.date}</p>
          <p>{projectFind.type}</p>
          <p>{projectFind.role}</p>
          <p>{projectFind.technologies}</p>
        </div>
        <div className="detailsView__visit">
          <button onClick={() => navigate(`/project/${id}/details`)} > Visiter le site </button>
        </div>
        <div className="detailsView__description">
          <p>Repo Github</p>
        </div>
      </div>
    </div>

  )
}
export default DetailsView 