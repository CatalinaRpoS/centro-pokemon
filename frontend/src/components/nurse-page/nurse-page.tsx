import React, { useEffect, useState } from "react";
import NavBar from "@components/navbar";
import { TableRow } from "@elements/table-row";
import { Pokemon } from "src/types";

const NursePage: React.FC = () => {
  const [pokemones, setPokemones] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemones = async () => {
      try {
        const response = await fetch('http://localhost:3000/nurse/');
        if (!response.ok) {
          throw new Error('Failed to fetch pokemones');
        }
        const data: Pokemon[] = await response.json();
        const sortedPokemons = data.sort((a, b) => a.turn - b.turn);
        setPokemones(sortedPokemons);
      } catch (error) {
        console.error('Error fetching pokemones:', error);
      }
    };

    fetchPokemones();
  }, []);

  return (
    <>
      <NavBar />
      <TableRow pokemones={pokemones} />
    </>
  );
};

export default NursePage;