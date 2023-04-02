<template>
    <div>
        <div class="home grid grid-cols-3 gap-3">

            <div v-for="(g, i) in generations" :key="i" class="col-span-1 h-20 bg-gray-100">
                <p>{{ g.title }}</p>
                <p>Progression : 0 / {{ g.limit }}</p>
                <RouterLink :to="`/generation/${g.nbGeneration}`">Voir plus</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import generations from '../assets/generations.json'
import { usePokemonStore } from '../stores/pokemon'

const store = usePokemonStore()


</script>