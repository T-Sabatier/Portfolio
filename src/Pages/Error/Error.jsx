import { NavLink } from "react-router-dom";

function Error() {
  return (
    <div className="Erreur">
      <h2 className="Erreur__title">404</h2>
      <h3 className="Erreur__Subtitle">
        Oups ! La page que vous demandez n'existe pas
      </h3>
      <NavLink to="/">Retourner sur la page d'accueil</NavLink>
    </div>
  );
}
export default Error;