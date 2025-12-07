import { NavLink, useLocation } from "react-router-dom"
import "./Header.scss"
import { useGallery } from '../../Context/GalleryContext';

function Header() {
  const location = useLocation();
  const { isOpen, closeGallery } = useGallery();

  const handleTitleClick = (e) => {
    // Si on est sur la page d'accueil et qu'un projet est ouvert, on ferme
    if (location.pathname === "/" && isOpen) {
      e.preventDefault();
      closeGallery();
    }
    // Sinon, on laisse le NavLink faire sa navigation normale
  };

  return (
    <nav className="header">
      <NavLink to="/" onClick={handleTitleClick}>
        <p className="header__title">Sabatier Timothé</p>
      </NavLink>
      <div className="header__nav">
        <NavLink
          to="/About"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link--active" : ""}`
          }
        >
          A Propos
        </NavLink>
        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link--active" : ""}`
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>

  )
}
export default Header