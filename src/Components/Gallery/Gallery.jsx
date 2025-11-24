function Gallery({ projects, onProjectClick }) {

  return (
    <div className="gallery">
      {projects.map(project => (  /*map les projet*/
        <div key={project.id} onClick={() => onProjectClick(project.id)} > {/*gestion du click*/}
          <img src={project.images.thumbnail} alt={project.title} /> {/*affiche l'image*/}
        </div>
      ))}
    </div>
  )
}
export default Gallery