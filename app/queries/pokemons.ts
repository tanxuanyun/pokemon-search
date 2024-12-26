import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const GET_POKEMON = gql`
  fragment RecursivePokemonFragment on Pokemon {
    id
    name
    image
  }

  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        ...RecursivePokemonFragment 
      }
    }
  }
`;

