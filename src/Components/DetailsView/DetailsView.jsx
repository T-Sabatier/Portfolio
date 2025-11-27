import { useParams, Navigate, useNavigate } from "react-router-dom";
import Projects from "../../Data/Projects.json";
import "./DetailsView.scss"



function DetailsView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const projectFind = Projects.find((project) => project.id === parseInt(id));
  if (!projectFind) {
    return <Navigate to="/error" replace />;
  }
  return (
    <div className="detailsView" data-theme={projectFind.theme}>
      <img src={projectFind.images.detail} />
      <h2>{projectFind.title}</h2>
      <p>{projectFind.description}</p>
      <p>{projectFind.date}</p>
      <p>{projectFind.type}</p>
      <button onClick={() => navigate(`/project/${id}`)} > Project </button>
    </div>

  )
}
export default DetailsView 