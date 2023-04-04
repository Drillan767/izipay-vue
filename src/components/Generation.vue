<template>
    <div class="container mx-auto">
        <h1>{{ titles[gen]}}</h1>

        <div class="grid-container">
            <div class="item" v-for="(pokemon, i) in store.pokemons" :key="i">
                <img :src="pokemon.imgUrl" :alt="pokemon.name" class="block mx-auto">
                <p class="id">#{{ pokemon.id }}</p>
                <p class="text-center font-bold">{{ pokemon.name }}</p>

                <div class="flex justify-evenly">
                    <img
                        v-for="(type, i) in pokemon.types"
                        :src="`/affinity/${type}.png`"
                        class="w-24"
                        :alt="type"
                        :key="i"
                    />
                </div>
                
                <p>{{ pokemon.abilities }}</p>
                <p>{{ pokemon.obtained }}</p>
                <div class="legend" v-if="pokemon.legendary">
                    <Crown  />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Crown from './svg/crown.vue'
import Hidden from './svg/hidden.vue'
import type { Generation, GenList, Pokemon } from '../types'
import { usePokemonStore } from '../stores/pokemon'

const route = useRoute()
const { params: { generation } } = route
const store = usePokemonStore()

const gen = generation.toString() as Generation

store.currentGen = gen as Generation

onMounted(() => store.pokemonByGen(gen))

// TODO: Optimiser avec le store
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

<style scoped lang="scss">
.grid-container {
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;

    .item {
        // flex justify-center
        @apply text-xl border-2 border-gray-300 hover:border-gray-500 rounded-lg p-6 bg-gray-100 transition-all duration-300;

        .id {
            @apply text-center font-extralight leading-none;
        }
    }
}
</style>