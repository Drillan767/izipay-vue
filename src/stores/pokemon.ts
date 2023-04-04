import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import client from '../config/graphql'
import { getMany, get, setMany, set, update, clear, values, createStore } from 'idb-keyval'
import type { Pokemon, PokemonResponse } from '../types'
import ALL_POKEMONS from '../queries/allPokemons'

/*
Sur la page /generation-xx, query onCreated sur les pokemons dont la gen correspond à la page
Si resulats vide, on query l'api, puis renseigne les infos manquantes
On stocke alors les infos en set
*/

export const usePokemonStore = defineStore('pokemon', () => {
    const pokemons = ref<Pokemon[]>([])

    const dbFilled = async () => {
        const emAll = await values()
        return emAll.length > 0
    }

    const currentGen = ref('')

    const loadPokemons = async () => await parsePokemons()

    const pokemonByGen = async (gen: string) => {
        await values()
            .then((data) => pokemons.value = data.filter((d) => d.generation === gen))
    }

    const globalProgress = async () => {
        const initVal = {} as { [key: string]: number }
        const allPokemons = await values()

        const result = allPokemons.reduce(
            (acc, currentVal: Pokemon) => {
                // Ensure the key is set so it's a least 0.
                if (!acc.hasOwnProperty(currentVal.generation)) {
                    acc[currentVal.generation] = 0
                }

                if (currentVal.obtained) {
                    acc[currentVal.generation] = acc[currentVal.generation] + 1
                }

                return acc
            },
            initVal
        )

        console.log(result)

        return pokemonMeta.map((pkmn) => ({
            ...pkmn,
            obtained: result[pkmn.gen]
        }))

        return []
    }

    async function pokemonObtained(id: number) {

    }

    return {
        currentGen,
        dbFilled,
        pokemons,
        loadPokemons,
        pokemonByGen,
        globalProgress,
        pokemonObtained,
    }
})

const toPokemonId = (id: number) => {
    let numStr = String(id)
    while (numStr.length < 4) {
        numStr = '0' + numStr
    }

    return numStr
}

const parsePokemons = async () => {
    const pokemonList: [string, Pokemon][] = []
    const { data }: PokemonResponse = await client.query({ query: ALL_POKEMONS })

    const parsedPokemons: Pokemon[] = data.pokemon_v2_pokemonspecies.map((result) => {
        const { name } = result.pokemon_v2_pokemonspeciesnames[0]
        const { pokemon_v2_pokemons: [{ pokemon_v2_pokemontypes, pokemon_v2_pokemonabilities }] } = result
        const abilities = pokemon_v2_pokemonabilities.map((ability) => {
            const { pokemon_v2_ability: { pokemon_v2_abilitynames: [{ name }] } } = ability
            return {
                hidden: ability.is_hidden,
                name,
            }
        })

        return {
            id: toPokemonId(result.id),
            legendary: result.is_legendary,
            name,
            generation: result.pokemon_v2_generation.name,
            imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${result.id}.png`,
            types: pokemon_v2_pokemontypes.map((type) => type.pokemon_v2_type.name),
            abilities,
            obtained: false,
        }
    })

    parsedPokemons.forEach((pokemon) => pokemonList.push([pokemon.id, pokemon]))
    await setMany(pokemonList)
}

const pokemonMeta = [
    {
        gen: 'generation-i',
        name: 'Pokemon Rouge / Bleu / Jaune',
        nbPokemons: 151
    },
    {
        gen: 'generation-ii',
        name: 'Pokemon Or / Argent',
        nbPokemons: 100
    },
    {
        gen: 'generation-iii',
        name: 'Pokemon Ruby / Saphir',
        nbPokemons: 135
    },
    {
        gen: 'generation-iv',
        name: 'Pokemon Diamant / Perle / Platine',
        nbPokemons: 107
    },
    {
        gen: 'generation-v',
        name: 'Pokemon Noir / Blanc',
        nbPokemons: 156
    },
    {
        gen: 'generation-vi',
        name: 'Pokemon X / Y',
        nbPokemons: 72
    },
    {
        gen: 'generation-vii',
        name: 'Pokemon Soleil / Lune',
        nbPokemons: 88
    },
    {
        gen: 'generation-viii',
        name: 'Pokemon Épée / Bouclier',
        nbPokemons: 96
    },
    {
        gen: 'generation-ix',
        name: 'Pokemon Écarlate / Violet',
        nbPokemons: 110
    }
]