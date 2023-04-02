import { computed, ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { getMany, get, setMany, set, update, clear, values, createStore } from 'idb-keyval'
import type { Pokemon, Name } from '../types'

const pokemonURL = 'https://pokeapi.co/api/v2'

/*
Sur la page /generation, query onCreated sur les pokemons dont la gen correspond à la page
Si resulats vide, on query l'api, puis renseigne les infos manquantes
On stocke alors les infos en set
*/

const pokemonDB = createStore('pokemons', 'pokemons')
const abilitiesDB = createStore('abilities', 'abilities')

export const usePokemonStore = defineStore('pokemon', () => {
    // ... the db.
    const pokemons = ref<Pokemon[]>([])

    const test = async () => {
        await setMany([['test1', 'value1'], ['test2', 'value2'], ['test3', 'value3']])
    }

    const loadPokemons = async () => {
        await get('non-existing-value', pokemonDB)
            .then((data) => {
                console.log(data)
            })
    }

    const pokemonByGen = computed(() => {
        const result = {} as { [key: string]: Pokemon[] }
        for (let i: number = 1; i <= 9; i++) {
            result[`gen_${i}`] = pokemons.value.filter((p) => p.generation === i)
        }

        return result
    })

    const globalProgress = computed(() => {
        // Doit retourner le pourcentage de "obtained = false sur total de la gen, pour toutes les gens
        // Si array vide, retourne 0
    })

    async function addPokemons(params: { limit: number, offset: number }) {
        let fetchedPokemons = []
        const { limit, offset } = params

        const response = await fetch(`${pokemonURL}/pokemon?limit=${limit}&offset=${offset}`)
        const data = await response.json()

        // We need both the pokemon's ingame data and general informations, so both queries are required.
        // However, we store the ability + translation since several pokemons share the sames.
        data.results.forEach(async (d: { name: string, url: string }) => {
            const pokemonId = d.url
                // Removing trailing '/'.
                .slice(0, -1)
                .split(/[\\/]/).pop()

            // Retrieving general informations.
            const specDetails = await fetch(`${pokemonURL}/pokemon-species/${pokemonId}`)
            const specData = await specDetails.json()

            const pkmnDetail = await fetch(`${pokemonURL}/pokemon/${pokemonId}`)
            const pkmnData = await pkmnDetail.json()

            const legendary = specData.is_legendary
            const pkmnName = specData.names.find((n: Name) => n.language.name === 'fr').name
            const imgUrl = pkmnData.sprites.front_default
            const types = pkmnData.types.map((t: { type: { name: string } }) => t.type.name)
            const abilities = await handleAbilities(pkmnData.abilities)

            console.log({abilities})
            console.log({ specData, pkmnData })
        })
    }

    async function pokemonObtained(id: number) {

    }

    return {
        test,
        pokemons,
        loadPokemons,
        pokemonByGen,
        globalProgress,
        addPokemons,
        pokemonObtained,
    }
})

const handleAbilities = async (abilities: { ability: { name: string, url: string } }[]) => {
    let results = [] as {name: string, hidden: boolean}[]

    const abilityUrls = abilities.map((a) => a.ability.url)
    console.log(abilityUrls)
    
    abilities.forEach((a) => {
        const abilityId = a.ability.url
    })

    return results
}
