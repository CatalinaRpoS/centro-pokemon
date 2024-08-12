import React, { useState } from "react";
import "@styles/styles.scss";
import { RegisterPokemonProps } from "./types";
import { Status } from "src/types";

const RegisterPokemon: React.FC<RegisterPokemonProps> = ({ types, status }) => {
  const [formData, setFormData] = useState<{
    name: string;
    lifePoints: number | string;
    level: number | string;
    type: string[];
    status: Status[];
  }>({
    name: "",
    lifePoints: "",
    level: "",
    type: [],
    status: []
  });

  const [checkedStatus, setCheckedStatus] = useState(status.map(() => false));
  const [checkedTypes, setCheckedTypes] = useState(types.map(() => false));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "level" || name === "lifePoints" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (index: number, checked: boolean) => {
    setCheckedTypes((prevState) => {
      const newCheckedTypes = [...prevState];
      newCheckedTypes[index] = checked;
      return newCheckedTypes;
    });
    setFormData((prevState) => {
      const newTypes = [...prevState.type];
      if (checked) {
        newTypes.push(types[index]);
      } else {
        const typeIndex = newTypes.indexOf(types[index]);
        if (typeIndex > -1) {
          newTypes.splice(typeIndex, 1);
        }
      }
      return {
        ...prevState,
        type: newTypes,
      };
    });
  };
  
  const handleStatusChange = (index: number, checked: boolean) => {
    setCheckedStatus((prevState) => {
      const newCheckedStatus = [...prevState];
      newCheckedStatus[index] = checked;
      return newCheckedStatus;
    });
    setFormData((prevState) => {
      const newStatus = [...prevState.status];
      if (checked) {
        newStatus.push(status[index]);
      } else {
        const statusIndex = newStatus.indexOf(status[index]);
        if (statusIndex > -1) {
          newStatus.splice(statusIndex, 1);
        }
      }
      return {
        ...prevState,
        status: newStatus,
      };
    });
  };

  const resetForm = () => {
    setCheckedStatus(status.map(() => false));
    setCheckedTypes(types.map(() => false));
    setFormData({
      name: "",
      lifePoints: "",
      level: "",
      type: [],
      status: []
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5 mb-4">
        <label htmlFor="pokemonName" className="form-label">
          Nombre Pokémon
        </label>
        <input
          type="text"
          className="form-control rounded-pill"
          id="name"
          name="name"
          maxLength={50}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="hp" className="form-label">
          Puntos de vida (PV)
        </label>
        <input
          type="number"
          id="lifePoints"
          name="lifePoints"
          min="0"
          max="255"
          className="form-control rounded-pill"
          value={formData.lifePoints}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="level" className="form-label">
          Nivel
        </label>
        <input
          type="number"
          className="form-control rounded-pill"
          id="level"
          name="level"
          min="0"
          max="100"
          value={formData.level}
          onChange={handleChange}
          required
        />
      </div>
      <label htmlFor="level" className="form-label">
        Tipo Pokémon
      </label>
      <div className="flex-container">
        {types.map((path, index) => (
          <div className="form-check flex-items" key={index}>
            <input
              className="form-check-input rounded-pill"
              type="checkbox"
              value=""
              id={`type${index}`}
              checked={checkedTypes[index]}
              onChange={(e) => handleTypeChange(index, e.target.checked)}
            />
            <img className="pokemon-type" src={path} alt={`type${index}`} />
          </div>
        ))}
      </div>
      <label htmlFor="level" className="form-label">
        Estado actual
      </label>
      <div className="flex-container">
        {status.map((path, index) => (
          <div className="form-check flex-items" key={index}>
            <input
              className="form-check-input rounded-pill"
              type="checkbox"
              value=""
              id={`status${index}`}
              checked={checkedStatus[index]}
              onChange={(e) => handleStatusChange(index, e.target.checked)}
            />
            <img className="pokemon-status" src={path.image} alt={path.name} />
          </div>
        ))}
      </div>
      <div className="dv-btn">
        <button type="submit" className="btn btn-primary rounded-pill">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default RegisterPokemon;
