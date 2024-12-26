"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "@/app/queries/pokemons";
import Search from "@/app/components/Search";
import Image from "next/image";

interface Attack {
  name: string;
  type: string;
  damage: number;
}

type Attacks = {
    fast: Attack[];
    special: Attack[];
  };


interface PokemonEvolution {
  id: string;
  name: string;
  image: string;
}

interface Pokemon {
  image: string;
  name: string;
  number: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions?: PokemonEvolution[];
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: {
      id: searchTerm && isNaN(Number(searchTerm)) ? null : searchTerm,
      name: searchTerm && !isNaN(Number(searchTerm)) ? null : searchTerm,
    },
    skip: !searchTerm, // Skip the query if the searchTerm is empty
  });

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleEvolutionClick = (name: string) => {
    setSearchTerm(name); // Trigger search for the clicked evolution name
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract the data
  const pokemon = data?.pokemon;

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Search Pokémon</h1>
    <Search onSearch={handleSearch} />
      {/* Show the Pokémon's data if available */}
      {pokemon ? (
        <div className="pokemon-card">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={150}
            height={150}
            className="pokemon-image"
          />
          <h3>{pokemon.name}</h3>
          <p><strong>Number:</strong> {pokemon.number}</p>
          <p><strong>Weight:</strong> {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
          <p><strong>Height:</strong> {pokemon.height.minimum} - {pokemon.height.maximum}</p>
          <p><strong>Classification:</strong> {pokemon.classification}</p>
          <p><strong>Types:</strong> {pokemon.types.join(', ')}</p>
          <p><strong>Resistant:</strong> {pokemon.resistant.join(', ')}</p>
          <p><strong>Weaknesses:</strong> {pokemon.weaknesses.join(', ')}</p>
          <p><strong>Flee Rate:</strong> {pokemon.fleeRate}</p>
          <p><strong>Max CP:</strong> {pokemon.maxCP}</p>
          <p><strong>Max HP:</strong> {pokemon.maxHP}</p>

          {/* Display attacks */}
          {pokemon.attacks && (
            <div>
              <p><strong style={{ textDecoration: "underline" }}>Attacks</strong></p>
              <div>
                <p><strong>Fast Attacks:</strong></p>
                {pokemon.attacks.fast.length > 0 ? (
                  pokemon.attacks.fast.map((attack: Attack, index: number) => (
                    <div key={index}>
                        <strong>{attack.name}</strong>
                        <p>Type: {attack.type} | Damage: {attack.damage}</p>
                    </div>
                  ))
                ) : (
                  <p>No fast attacks available.</p>
                )}
              </div>

              <div>
                <p><strong>Special Attacks:</strong></p>
                {pokemon.attacks.special.length > 0 ? (
                  pokemon.attacks.special.map((attack: Attack, index: number) => (
                    <div key={index}>
                        <strong>{attack.name}</strong>
                        <p>Type: {attack.type} | Damage: {attack.damage}</p>
                    </div>
                  ))
                ) : (
                  <p>No special attacks available.</p>
                )}
              </div>
            </div>
          )}

          {/* Evolutions */}
          {pokemon.evolutions && pokemon.evolutions.length > 0 && (
            <div>
              <p><strong>Evolutions:</strong></p>
              {pokemon.evolutions.map((evolution: PokemonEvolution) => (
                <div key={evolution.id}>
                  <Image
                    src={evolution.image}
                    alt={evolution.name}
                    width={100}
                    height={100}
                  />
                  <h4 onClick={() => handleEvolutionClick(evolution.name)}
                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  >{evolution.name}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p>No Pokémon found.</p>
      )}
    </section>
  );
};

export default Home;
