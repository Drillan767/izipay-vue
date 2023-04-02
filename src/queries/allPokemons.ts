import gql from 'graphql-tag'

const ALL_POKEMONS = gql`
query allPokemons {
  pokemon_v2_pokemonspecies(
    where: {
      pokemon_v2_pokemonspeciesnames: {
        pokemon_v2_language: { name: { _eq: "fr" } }
			}
    }
  ) {
    pokemon_v2_pokemonspeciesnames(where: { pokemon_v2_language: { name: { _eq: "fr" }}}) {
      name
    }

    pokemon_v2_generation {
        name
    }

    pokemon_v2_pokemons {
        pokemon_v2_pokemonabilities {
            is_hidden
            pokemon_v2_ability {
                pokemon_v2_abilitynames(where: {pokemon_v2_language: { name: { _eq: "fr" }}}) {
                    name
                }
            }
        }
        pokemon_v2_pokemontypes {
            pokemon_v2_type {
                name
            }
        }
    }

    id
    is_legendary
  }
}
`

export default ALL_POKEMONS
