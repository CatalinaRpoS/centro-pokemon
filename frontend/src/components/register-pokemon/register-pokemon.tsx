import React from "react";
import "@styles/styles.scss";
import CheckStatus from "@elements/check-status";
import CheckType from "@elements/check-type/check-type";

const RegisterPokemon: React.FC = () => {
  return (
    <form>
      <div className="mt-5 mb-4">
        <label htmlFor="pokemonName" className="form-label">
          Nombre Pokémon
        </label>
        <input
          type="text"
          className="form-control rounded-pill"
          id="pokemonName"
          maxLength={50}
          required
        ></input>
      </div>
      <div className="mb-4">
        <label htmlFor="hp" className="form-label">
          Puntos de vida (PV)
        </label>
        <input
          type="number"
          id="hp"
          min="0"
          max="255"
          className="form-control rounded-pill"
        ></input>
      </div>
      <div className="mb-4">
        <label htmlFor="level" className="form-label">
          Nivel
        </label>
        <input
          type="number"
          className="form-control rounded-pill"
          id="level"
          min="0"
          max="100"
        ></input>
      </div>
      <label htmlFor="level" className="form-label">
        Tipo Pokémon
      </label>
      <CheckType />
      <label htmlFor="level" className="form-label">
        Estado actual
      </label>
      <CheckStatus />
      <div className="dv-btn">
        <button type="submit" className="btn btn-primary rounded-pill">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default RegisterPokemon;
