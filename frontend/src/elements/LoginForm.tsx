import "../styles/loginform.scss";

import React from "react";

interface Props {
  onClose: () => void;
}

const LoginForm: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="modal-bg">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
        <h2 className="text-center mb-4">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", display: "block", margin: "0 auto" }}
        >
          Ingresar
        </button>
        <div className="mt-3 text-center">
          <button type="button" className="btn btn-link">
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
