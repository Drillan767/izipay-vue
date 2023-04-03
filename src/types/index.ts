export type Pokemon = {
    id: string,
    name: string,
    abilities: {
        name: string,
        hidden: boolean
    }[],
    types: string[],
    legendary: boolean,
    imgUrl: string,
    generation: string,
    obtained: boolean,
}

export type List = {
    gen: string,
    name: string,
    obtained: boolean,
    nbPokemons: number,
}[]

export type PokemonSpeciesResponse = {
    is_legendary: boolean,
    names: {
        language: {
            name: string,
            url: string
        },
        name: string,
    }[]
}

export type PokemonResponse = {
    data: {
        pokemon_v2_pokemonspecies: {
            pokemon_v2_pokemonspeciesnames: {
                name: string
            }[],
            pokemon_v2_generation: {
                name: string
            },
            pokemon_v2_pokemons: {
                pokemon_v2_pokemonabilities: {
                    is_hidden: boolean,
                    pokemon_v2_ability: {
                        pokemon_v2_abilitynames: {
                            name: string
                        }[]
                    }
                }[],
                pokemon_v2_pokemontypes: {
                    pokemon_v2_type: {
                        name: string
                    }
                }[]
            }[],
            id: number,
            is_legendary: boolean,
        }[],
    }
}

export type Generation = 'generation-i' |
    'generation-ii' |
    'generation-iii' |
    'generation-iv' |
    'generation-v' |
    'generation-vi' |
    'generation-vii' |
    'generation-viii' |
    'generation-ix'

export type GenList = {
    [key in Generation]: string
}