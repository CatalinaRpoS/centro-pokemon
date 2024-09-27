import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "@styles/loginform.scss";
import {routes} from "@config/api"
import { LoginFormProps } from "./types";
import paths from '@config/paths';

const LoginForm: React.FC<LoginFormProps> = ({ onClose }: LoginFormProps) => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate(paths.register);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(routes.login, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
          const { rol, email } = data;

          if (rol === 'trainer') {
              navigate(paths.trainer);
          } else if (rol === 'nurse') {
              navigate(paths.nurse);
          }

          localStorage.setItem('role', rol);
          localStorage.setItem('email', email);
          onClose();
      } else {
          setError(data.message || 'Email o contraseña incorrectos.');
      }
  } catch (error) {
      console.error('Error during login:', error);
      setError('Error en el servidor. Por favor, inténtalo de nuevo más tarde.');
  }
  };

  return (
    <div className="modal-bg">
      <div className="modal-content px-5">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h1 className="text-center mt-4 mb-3">Bienvenido al Centro Pokémon</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control rounded-pill"
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
              className="form-control rounded-pill"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center same-font-size mb-3">
          <p className="mb-0">¿No tienes una cuenta?</p>
          <button
            type="button"
            className="btn btn-link same-font-size link-style"
            onClick={handleRegisterClick}
          >
            Registrate aquí
          </button>
        </div>
          <button
            type="submit"
            className="btn btn-primary rounded-pill"
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
