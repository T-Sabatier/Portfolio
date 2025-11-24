function ProjectView({ project, onExploreClick, onMenuClick }) {
  return (
    < div className="project_view" >
      <img src={project.images.main} />
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <button onClick={() => onMenuClick()}>Menu</button>
      <button onClick={() => onExploreClick()}>Explore</button>
    </div>
  )
}
export default ProjectView