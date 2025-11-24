function ProjectView({ project, onExploreClick }) {
  return (
    < div className="project_view" >
      <img src={project.images.main} />
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <button onClick={() => onExploreClick()}>Explore</button>
    </div>
  )
}
export default ProjectView