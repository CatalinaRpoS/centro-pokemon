import React, { useState } from "react";
import "@styles/register.scss";
import { useNavigate } from "react-router-dom";
import paths from "@config/paths";
import NavBar from "@components/navbar";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
    passwordRequirements: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;
    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    let valid = true;

    if (password !== confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        passwordMismatch: true,
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        passwordMismatch: false,
      }));
    }

    if (!passwordRequirements.test(password)) {
      setErrors((prevState) => ({
        ...prevState,
        passwordRequirements: true,
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        passwordRequirements: false,
      }));
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(paths.root);
    }
  };

  return (
    <>
    <NavBar />
    <div className="form">
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              aria-describedby="passwordHelp"
              required
            />
            <small id="passwordHelp" className="form-text text-muted">
              Debe tener mínimo 6 letras, incluir mayúsculas, números y caracteres especiales.
            </small>
            {errors.passwordRequirements && (
              <div className="text-danger">
                La contraseña no cumple con los requisitos.
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.passwordMismatch && (
              <div className="text-danger">
                Las contraseñas no coinciden.
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </form>
      </div>
      </>
  );
};

export default RegisterForm;
