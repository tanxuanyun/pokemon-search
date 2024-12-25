'use client'; // Client-side component

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/app/queries/pokemons"; // Adjust the import path
import Searchbar from "@/app/components/searchbar";
import Image from 'next/image';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: { first: 10 }, // Fetch the first 10 Pokémon
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="w-full flex-center flex-col">
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Search Pokemon
          <br className="max-md:hidden" />
        </h1>
        <Searchbar />
        <div className="pokemon-list">
          {data?.pokemons.map((pokemon: any) => (
            <div key={pokemon.id} className="pokemon-card">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={150} // Provide appropriate width
                height={150} // Provide appropriate height
                className="pokemon-image"
              />
              <h3>{pokemon.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;
