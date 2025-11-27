import { useNavigate } from "react-router-dom"
import "./Gallery.scss"

function Gallery({ projects }) {
  const navigate = useNavigate()

  return (
    <div className="gallery">
      {projects.map(project => (  /*map les projet*/
        <div key={project.id} onClick={() => navigate(`/project/${project.id}`)} > {/*gestion du click*/}
          <img className="gallery__img" src={project.images.thumbnail} alt={project.title} /> {/*affiche l'image*/}
        </div>
      ))}
    </div>
  )
}
export default Gallery