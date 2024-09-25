import React, { useState } from "react";
import "@styles/styles.scss";
import { types, status } from "@config/images";
import { RegisterPokemonProps, ErrorType } from "./types";
import { Status } from "src/types";

const RegisterPokemon: React.FC<RegisterPokemonProps> = ({
  pokemonTypes,
  pokemonStatus,
  onRegister,
}) => {
  const email = localStorage.getItem("email");
  const [errors, setErrors] = useState<ErrorType>({});

  const defaultPokemon = {
    name: "",
    life_points: "",
    level: "",
    first_type: "",
    second_type: "",
    status: [],
    types: [],
  };

  const [formData, setFormData] = useState<{
    name: string;
    life_points: number | string;
    level: number | string;
    first_type: string;
    second_type: string;
    status: Status[];
    types: string[];
  }>(defaultPokemon);

  const [checkedStatus, setCheckedStatus] = useState<boolean[]>(
    pokemonStatus.map(() => false)
  );
  const [checkedTypes, setCheckedTypes] = useState<boolean[]>(
    pokemonTypes.map(() => false)
  );

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
      const newTypes = [...prevState.types];

      if (checked) {
        newTypes.push(pokemonTypes[index].name);
      } else {
        const typeIndex = newTypes.indexOf(pokemonTypes[index].name);
        if (typeIndex > -1) {
          newTypes.splice(typeIndex, 1);
        }
      }

      return {
        ...prevState,
        types: newTypes,
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
        newStatus.push(pokemonStatus[index]);
      } else {
        const statusIndex = newStatus.indexOf(pokemonStatus[index]);
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
    setCheckedStatus(pokemonStatus.map(() => false));
    setCheckedTypes(pokemonTypes.map(() => false));
    setFormData(defaultPokemon);
    setErrors({});
  };

  const fetchPokemonImage = async (name: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error(`No se ha encontrado la imagen del Pokémon ${name}`);
      }
      const data = await response.json();
      return (
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default
      );
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = {};

    const image = await fetchPokemonImage(formData.name);
    if (!image) {
      newErrors = {
        ...newErrors,
        pokemon: "¡Ups! Revisa el nombre de tu Pokémon.",
      };
      setErrors(newErrors);
      return;
    }

    if (formData.types.length > 2) {
      newErrors = {
        ...newErrors,
        type: "Solo puedes seleccionar un máximo de 2 tipos.",
      };
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      image,
    }));

    const newPokemon = {
      trainer_email: email || "",
      name: formData.name,
      life_points: Number(formData.life_points),
      level: Number(formData.level),
      first_type: formData.types[0],
      second_type: formData.types[1] || null,
      pokemon_status: formData.status,
    };
    onRegister(newPokemon);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="form-register-pokemon">
      <div className="mt-5 mb-4">
        <label htmlFor="pokemonName" className="form-label-pokemon">
          Nombre Pokémon
        </label>
        <p>Mínimo 3 carácteres</p>
        <input
          type="text"
          className="form-control rounded-pill"
          id="name"
          name="name"
          minLength={3}
          maxLength={10}
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.pokemon && <p className="error-text">{errors.pokemon}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="hp" className="form-label-pokemon">
          Puntos de vida (PV)
        </label>
        <input
          type="number"
          id="life_points"
          name="life_points"
          min="0"
          max="255"
          className="form-control rounded-pill"
          value={formData.life_points}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="level" className="form-label-pokemon">
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
      <label htmlFor="level" className="form-label-pokemon">
        Tipo Pokémon
      </label>
      <p>Selecciona máximo 2 tipos</p>
      <div className="flex-container">
        {pokemonTypes.map((type, index) => (
          <div className="form-check flex-items" key={index}>
            <input
              className="form-check-input rounded-pill"
              type="checkbox"
              id={`type${index}`}
              checked={checkedTypes[index]}
              onChange={(e) => handleTypeChange(index, e.target.checked)}
            />
            <img
              className="pokemon-type"
              src={types[type.image]}
              alt={type.name}
            />
          </div>
        ))}
      </div>
      {errors.type && <p className="error-text">{errors.type}</p>}
      <label htmlFor="level" className="form-label-pokemon">
        Estado actual
      </label>
      <div className="flex-container">
        {pokemonStatus.map((path, index) => (
          <div className="form-check flex-items" key={index}>
            <input
              className="form-check-input rounded-pill"
              type="checkbox"
              value=""
              id={`status${index}`}
              checked={checkedStatus[index]}
              onChange={(e) => handleStatusChange(index, e.target.checked)}
            />
            <img
              className="pokemon-status"
              src={status[path.image]}
              alt={path.name}
            />
          </div>
        ))}
      </div>
      {errors.status && <p className="error-text">{errors.status}</p>}
      <div className="dv-btn mb-3">
        <button type="submit" className="btn btn-primary rounded-pill">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default RegisterPokemon;
