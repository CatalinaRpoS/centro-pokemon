import React, { useState } from "react";
import { pokeball, account } from "@assets/variety";
import { useNavigate } from "react-router-dom";
import "@styles/styles.scss";
import { LoginForm } from "@components/loginform";
import paths from "@config/paths";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userRole = localStorage.getItem('role');
  const isLoggedIn = userRole !== null;

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateToRegister = () => {
    navigate(paths.register);
  };

  const handleLogout = () => {
      localStorage.removeItem('role');
      navigate(paths.root);
  };

  const navigateToRoleSection = () => {
    if (userRole === 'nurse') {
      navigate(paths.nurse);
    } else if (userRole === 'trainer') {
      navigate(paths.trainer);
    }
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="container-fluid">
        <a className="navbar-brand" href={paths.root}>
          <img
            src={pokeball}
            alt="Logo de la página"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
        </a>
        <p
          className="navbar-title"
          style={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          CENTRO POKÉMON
        </p>

        <div className={`dropdown ${dropdownOpen ? "show" : ""}`}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            <img
              src={account}
              alt="Logo de la página"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
          </button>
          <ul className="dropdown-menu">
          {isLoggedIn ? (
              <>
                <li>
                  <button className="dropdown-item" onClick={navigateToRoleSection}>
                    {userRole === 'nurse' ? 'Sección de enfermera' : 'Sección de entrenador'}
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="dropdown-item" onClick={toggleLoginForm}>
                    Iniciar sesión
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={navigateToRegister}>
                    Registrarse
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {showLoginForm && <LoginForm onClose={toggleLoginForm} />}{" "}
      {/* Mostrar el formulario de inicio de sesión si showLoginForm es true */}
    </nav>
  );
};

export default NavBar;
