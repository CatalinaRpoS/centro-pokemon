import React, { useState } from "react";
import { pokeball, account } from "@assets/variety";
import "@styles/styles.scss";
import { LoginForm } from "@components/loginform";

const NavBar: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
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

        <button className="btn" onClick={toggleLoginForm}>
          <img
            src={account}
            alt="Logo de la página"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
        </button>
      </div>
      {showLoginForm && <LoginForm onClose={toggleLoginForm} />}{" "}
      {/* Mostrar el formulario de inicio de sesión si showLoginForm es true */}
    </nav>
  );
};

export default NavBar;
