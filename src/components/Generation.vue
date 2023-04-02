<template>
    <div>
        <p>Page génération avec comme id: {{ generation }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import generations from '../assets/generations.json'
import { usePokemonStore } from '../stores/pokemon'

const route = useRoute()
const { params: { generation } } = route
const store = usePokemonStore()
// const currentGeneration = generations.find((g) => g.nbGeneration === parseInt(generation.toString()))!
// console.log(currentGeneration)

onMounted(() => {
    /* if (store.pokemonByGen[`gen_${nbGeneration}`].length === 0) {
        store.addPokemons({limit: 151, offset: 0, gen: 1})
    } */
    /* if (store.pokemonByGen[`gen_${nbGeneration}`].length === 0) {
        const { offset, limit, nbGeneration } = currentGeneration
        store.addPokemons({offset, limit, gen: nbGeneration})
    } */
    // store.addPokemons({limit: 1, offset: 0, gen: 1})
})


</script>