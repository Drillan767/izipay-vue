import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import client from '../config/graphql'
// TODO:TEST À SUPPRIMER
import pokemons from '../assets/pokemons.json'
import { getMany, get, setMany, set, update, clear, values, createStore, entries } from 'idb-keyval'
import type { Pokemon, PokemonResponse } from '../types'
import ALL_POKEMONS from '../queries/allPokemons'


type GlobalResponse = {
    results: {
        name: string,
        url: string
    }[]
}

const pokemonURL = 'https://pokeapi.co/api/v2'

/*
Sur la page /generation, query onCreated sur les pokemons dont la gen correspond à la page
Si resulats vide, on query l'api, puis renseigne les infos manquantes
On stocke alors les infos en set
*/

export const usePokemonStore = defineStore('pokemon', () => {
    const pokemons = ref<Pokemon[]>([])
    const totalPokemons = ref(0)

    const dbFilled = computed(() => {
        queryIDB()
        return totalPokemons.value !== 0
    })

    const getResult = (total: number) => totalPokemons.value = total

    const currentGen = ref('')

    const loadPokemons = async () => {
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

    const pokemonByGen = computed(() => {
        /* const result = {} as { [key: string]: Pokemon[] }
        for (let i: number = 1; i <= 9; i++) {
            result[`gen_${i}`] = pokemons.value.filter((p) => p.generation === i)
        }

        return result */
    })

    const globalProgress = computed(() => {
        // Doit retourner le pourcentage de "obtained = false sur total de la gen, pour toutes les gens
        // Si array vide, retourne 0
    })

    async function pokemonObtained(id: number) {

    }

    // Custom code to get how many pokemons are stored.
    const queryIDB = () => {
        const request = indexedDB.open('keyval-store')

        request.onsuccess = (e) => {
            const db = request.result

            // Open a transaction to the "keyval" object store
            const transaction = db.transaction(['keyval'], 'readonly')
            const objectStore = transaction.objectStore('keyval')

            // Get the number of items in the object store
            const countRequest = objectStore.count()

            countRequest.onsuccess = () => getResult(countRequest.result)
        }
    }

    return {
        totalPokemons,
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

// Need to work more on this.
const groupByGeneration = (pokemonArray: Pokemon[]): { [key: number]: Pokemon[] } => {
    return pokemonArray.reduce<{ [key: number]: Pokemon[] }>((result, pokemon) => {
        const generation = pokemon.generation;
        if (!result[generation as any]) {
            result[generation as any] = [];
        }
        result[generation as any].push(pokemon);
        return result;
    }, {} as { [key: number]: Pokemon[] });
}