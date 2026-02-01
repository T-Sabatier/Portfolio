import { motion } from "framer-motion";
import "./About.scss";

function About() {
  return (
    <motion.div
      className="about"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about__container">
        <motion.div
          className="about__content"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="about__title">À Propos</h1>

          <div className="about__text">
            <p>
              Après plusieurs années en tant que responsable pâtissier et formateur,
              j'ai choisi de donner un nouveau souffle à ma carrière en me tournant
              vers un domaine qui m'a toujours passionné : le développement web.
              J'y ai retrouvé ce que j'aimais dans la création pâtissière :
              la précision, la logique et le plaisir de transformer une idée en un
              projet concret et structuré.
            </p>

            <p>
              Durant ma formation intensive de six mois chez OpenClassrooms, j'ai
              acquis des bases solides en front-end (HTML, CSS, JavaScript,
              responsive design, gestion de projet). J'ai également découvert le
              back-end, notamment avec Node.js, Express et MongoDB, ce qui m'a
              permis de comprendre l'ensemble d'un projet web, du serveur jusqu'à
              l'interface utilisateur.
            </p>

            <p>
              Aujourd'hui, je continue à développer des projets pour affiner mes
              compétences et construire ma nouvelle carrière dans la tech.
              Curieux, rigoureux et déterminé, j'aime imaginer et créer des
              interfaces modernes, accessibles et connectées à des services
              fiables côté serveur.
            </p>
          </div>

          <a
            href="/Portfolio/assets/CV_Sabatier_Timothe.pdf"
            download="CV_Sabatier_Timothe.pdf"
            className="about__cv-button"
          >
            Télécharger mon CV
          </a>
        </motion.div>

        <motion.div
          className="about__image-wrapper"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="about__image-placeholder">
            <span>Photo</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default About;