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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
        <h1
          className="h1"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: 30,
          }}
        >
          CENTRO POKÉMON
        </h1>

        <div className={`dropdown ${dropdownOpen ? 'show' : ''}`}>
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
            <li>
              <button className="dropdown-item" type="button" onClick={toggleLoginForm}>
                Inicia sesión
              </button>
            </li>
            <hr />
            <li>
              <button className="dropdown-item" type="button" onClick={navigateToRegister}>
                Registrarse
              </button>
            </li>
          </ul>
        </div>
      </div>
      {showLoginForm && <LoginForm onClose={toggleLoginForm} />}{" "}
      {/* Mostrar el formulario de inicio de sesión si showLoginForm es true */}
    </nav>
  );
};

export default NavBar;
