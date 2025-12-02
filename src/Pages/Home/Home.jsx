import "./Home.scss"
import projectsData from '../../Data/Projects.json';
import Gallery from '../../Components/Gallery/Gallery';

function Home() {
  return (
    <div className="home__container">
      <Gallery projects={projectsData} />
    </div>
  );
}

export default Home;