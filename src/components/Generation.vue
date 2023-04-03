<template>
    <div class="container mx-auto">
        <p>{{ titles[gen]}}</p>

        <div class="grid-container">
            <div class="item" v-for="(pokemon, i) in store.pokemons" :key="i">
                <p>{{ pokemon.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Generation, GenList } from '../types'
import { usePokemonStore } from '../stores/pokemon'

const route = useRoute()
const { params: { generation } } = route
const store = usePokemonStore()

const gen = generation.toString() as Generation

store.currentGen = gen as Generation

onMounted(() => {
    store.pokemonByGen(gen)

})


const titles: GenList = {
    'generation-i': 'Pokemon Rouge / Bleu / Jaune',
    'generation-ii': 'Pokemon Or / Argent',
    'generation-iii': 'Pokemon Ruby / Saphir',
    'generation-iv': 'Pokemon Diamant / Perle / Platine',
    'generation-v': 'Pokemon Noir / Blanc',
    'generation-vi': 'Pokemon X / Y',
    'generation-vii': 'Pokemon Soleil / Lune',
    'generation-viii': 'Pokemon Épée / Bouclier',
    'generation-ix': 'Pokemon Écarlate / Violet',
}
</script>

<style lang="scss">
.grid-container {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;

    .item {
        @apply flex justify-center text-6xl border-2 border-gray-300 rounded-xl p-6 bg-gray-100
    }
}
</style>