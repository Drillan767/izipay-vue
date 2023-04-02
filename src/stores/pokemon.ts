import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getMany, get, entries, setMany, set, update, clear } from 'idb-keyval'
import type { Pokemon } from '../types'

const pokemonURL = 'https://pokeapi.co/api/v2'

/*
Sur la page /generation, query onCreated sur les pokemons dont la gen correspond à la page
Voir comment gérer résulta
Si res
*/

export const usePokemonStore = defineStore('pokemon', () => {
    const pokemons = ref<Pokemon[]>([])

    const struct = {
        "gen1": [
            {

            }
        ],
        "gen2": {}
    }

    async function test () {
        await set('hello', 'world')

        const result = await entries()
        console.log(result)
        
        /* const result = await get('hello')
        console.log(result) */
    }

    async function addPokemons (params: {limit: number, offset: number}) {

    }

    async function pokemonObtained (id: number) {

    }

    const pokemonByGen = computed(() => {
        const result = {} as {[key: string]: Pokemon[]}
        for (let i: number = 1; i <= 9; i++) {
            result[`gen_${i}`] = pokemons.value.filter((p) => p.generation === i)
        }

        return result
    })

    return {
        test,
        pokemons,
        addPokemons,
        pokemonObtained,
        pokemonByGen
    }
})