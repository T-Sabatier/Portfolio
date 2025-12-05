import { motion } from "framer-motion"
import "./Gallery.scss"

function Gallery({ projects, onProjectClick }) {

  return (
    <div className="gallery">
      {projects.map(project => (
        <div
          key={project.id}
          onClick={() => onProjectClick(project.id)}
        >
          <motion.img
            layoutId={`project-img-${project.id}`}
            className="gallery__img"
            src={project.images.thumbnail}
            alt={project.title}
          />
        </div>
      ))}
    </div>
  )
}
export default Gallery