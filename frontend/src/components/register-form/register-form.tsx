import React, { useState } from "react";
import "@styles/register.scss";
import { useNavigate } from "react-router-dom";
import paths from "@config/paths";
import {routes} from "@config/api";
import NavBar from "@components/navbar";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
    passwordRequirements: false,
    serverError: false,
    formError: false
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const trainer = { name: formData.name, last_name: formData.last_name, email: formData.email, password: formData.password }; 
      try {
        const response = await fetch(routes.trainer.signup, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trainer),
        });
        await response.json();
        if (response.ok) {
          localStorage.setItem('role', 'trainer');
          localStorage.setItem('email', trainer.email);
          navigate(paths.trainer);
        } else {
          setErrors((prevState) => ({
            ...prevState,
            formError: true,
          }));
        }
      }
      catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          serverError: true,
        }));
      }
    }
  };

  return (
    <>
    <NavBar />
    <div className="form mx-4">
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="last_name"
              name="last_name"
              value={formData.last_name}
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
              className="form-control rounded-pill"
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
              className="form-control rounded-pill"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              aria-describedby="passwordHelp"
              required
            />
            <small id="passwordHelp" className="form-text text-muted">
              Debe tener mínimo 6 caracteres, incluir mayúsculas, números y caracteres especiales.
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
              className="form-control rounded-pill"
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
          {errors.serverError && (
              <div className="text-danger">
                Ha sucedido un error, por favor intenta de nuevo.
              </div>
          )}
          {errors.formError && (
              <div className="text-danger">
                El correo electrónico ya está registrado.
              </div>
          )}
          <button type="submit" className="btn btn-primary rounded-pill mb-5">
            Registrarse
          </button>
        </form>
      </div>
      </>
  );
};

export default RegisterForm;
