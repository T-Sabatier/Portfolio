import { NavLink } from "react-router-dom";
import "./Error.scss"

function Error() {
  return (
    <div className="Erreur">
      <h2 className="Erreur__title">404</h2>
      <NavLink to="/">Retourner sur la page d'accueil</NavLink>
    </div>
  );
}
export default Error;