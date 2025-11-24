function DetailsView({ project, onBackClick }) {
  return (
    <div className="details_view">
      <img src={project.images.main} />
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p>{project.date}</p>
      <p>{project.type}</p>
      <button onClick={() => onBackClick()}>Projet</button>
    </div>

  )
}
export default DetailsView 