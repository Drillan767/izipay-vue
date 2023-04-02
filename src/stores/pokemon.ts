import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getMany, get, entries, setMany, set, update, clear } from 'idb-keyval'
import type { Pokemon } from '../types'

const pokemonURL = 'https://pokeapi.co/api/v2'

/*
Sur la page /generation, query onCreated sur les pokemons dont la gen correspond à la page
Si resulats vide, on query l'api, puis renseigne les infos manquantes
On stocke alors les infos en set ou setMany suivant plus opti
*/

export const usePokemonStore = defineStore('pokemon', () => {
    // ... the db.
    const pokemons = ref<Pokemon[]>([])

    const pokemonByGen = computed(() => {
        const result = {} as {[key: string]: Pokemon[]}
        for (let i: number = 1; i <= 9; i++) {
            result[`gen_${i}`] = pokemons.value.filter((p) => p.generation === i)
        }

        return result
    })

    const globalProgress = computed(() => {
        // Doit retourner le pourcentage de "obtained = false sur total de la gen, pour toutes les gens
        // Si array vide, retourne 0
    })

    async function addPokemons (params: {limit: number, offset: number}) {

    }

    async function pokemonObtained (id: number) {

    }

    return {
        pokemons,
        pokemonByGen,
        globalProgress,
        addPokemons,
        pokemonObtained,
    }
})