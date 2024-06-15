import "../styles/loginform.scss";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users"; // Lista de usuarios para maquetado.

interface Props {
  onClose: () => void;
}

const LoginForm: React.FC<Props> = ({ onClose }) => {
  //Navegacion
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/registro");
  };

  //Verificación de datos ingresados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Buscar el usuario en la lista de usuarios
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Si se encuentra el usuario, redirigir basado en el rol
      if (user.role === "entrenador") {
        navigate("/entrenador");
      } else if (user.role === "enfermera") {
        navigate("/enfermera");
      }
      onClose(); // Cerrar el popup del login
    } else {
      // Si no se encuentra el usuario, mostrar un mensaje de error
      setError("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
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
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", display: "block", margin: "0 auto" }}
          >
            Ingresar
          </button>
        </form>
        <div className="mt-3 text-center">
          <button
            type="button"
            className="btn btn-link"
            onClick={handleRegisterClick}
          >
            Registro
          </button>
          <button type="button" className="btn btn-link">
            Olvidé mi contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
