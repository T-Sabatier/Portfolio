import { NavLink } from "react-router-dom"

function Header() {
  return (
    <nav className="header">
      <NavLink to="/">
        <p>Sabatier Timothé</p>
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