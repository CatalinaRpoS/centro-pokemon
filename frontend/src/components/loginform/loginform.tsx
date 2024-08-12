import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "@styles/loginform.scss";
import users from "@mocks/users"; // Lista de usuarios para maquetado.
import { LoginFormProps } from "./types";
import paths from '@config/paths';

const LoginForm: React.FC<LoginFormProps> = ({ onClose }: LoginFormProps) => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate(paths.register);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      if (user.role === "trainer") {
        navigate(paths.trainer);
      } else if (user.role === "nurse") {
        navigate(paths.nurse);
      }
      onClose();
    } else {
      setError("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h1 className="text-center mt-4 mb-3">Bienvenido al centro Pokémon</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <div className="d-flex align-items-center same-font-size mb-2">
          <p className="mb-0">¿No tienes una cuenta?</p>
          <button
            type="button"
            className="btn btn-link same-font-size"
            onClick={handleRegisterClick}
          >
            Registrate aquí
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end mb-3 same-font-size">
            <button type="button" className="btn btn-link">
              Olvidé mi contraseña
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", display: "block", margin: "0 auto" }}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;