<template>
    <div class="container mx-auto">

        <h1>{{ titles[gen] }}</h1>

        <Progress
            :obtained="progress.obtained"
            :total="progress.total" 
            :percentage="progress.percent"
            :circumference="progress.circumference"
            :progress="progress.progress"
        />

        <div class="grid-container">
            <div v-for="(pokemon, i) in store.pokemons" :key="i" class="item" :class="{ 'obtained': pokemon.obtained }"
                @click="clicked(pokemon)">
                <img :src="pokemon.imgUrl" :alt="pokemon.name" class="block mx-auto">
                <p class="id">#{{ pokemon.id }}</p>
                <p class="text-center font-bold flex justify-center gap-x-2 items-center">
                    {{ pokemon.name }}

                    <Crown v-if="pokemon.legendary" class="w-6 h-6 text-yellow-400" title="Légendaire" />
                </p>

                <div class="flex justify-evenly py-2 mb-4">
                    <img v-for="(type, i) in pokemon.types" :src="`/affinity/${type}.png`" class="w-24" :alt="type"
                        :key="i" />
                </div>

                <div class="border rounded-md border-black text-center">
                    <div class="font-semibold border-b-2 border-b-black">
                        Talents
                    </div>
                    <div v-for="(ability, i) in pokemon.abilities" :key="i">
                        <span>{{ ability.name }}</span> <span v-if="ability.hidden" class="text-sm">(talent caché)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { createToast } from 'mosha-vue-toastify';
import Crown from './svg/crown.vue'
import Progress from './Progress.vue'
import type { Generation, GenList, Pokemon } from '../types'
import { usePokemonStore } from '../stores/pokemon'
import 'mosha-vue-toastify/dist/style.css'

const route = useRoute()
const { params: { generation } } = route
const store = usePokemonStore()

const gen = generation.toString() as Generation

store.currentGen = gen as Generation

const progress = computed(() => {
    const circumference = 50 * 2 * Math.PI
    const obtained = store.pokemons.filter((p) => p.obtained).length
    const total = store.pokemons.length
    const percent = Math.round((total / 100) * obtained)
    
    return {
        circumference,
        total,
        obtained ,
        percent,
        progress: circumference - percent / 100 * circumference
    }
    
})

onMounted(() => store.pokemonByGen(gen))

const toastConfig = {
    hideProgressBar: true,
    type: 'warning',
    timeout: 2000,
    showIcon: true,
}

const clicked = async (pokemon: Pokemon) => {
    const newStatus = !pokemon.obtained
    // true: capturé, false: relâché
    await store.pokemonObtained(pokemon.id, newStatus)

    const term = newStatus ? 'capturé' : 'relâché'
    const toastMessage = `${pokemon.name} a été ${term} !`
    const toastType = newStatus ? 'success' : 'warning'
    createToast(toastMessage, { ...toastConfig, type: toastType, position: 'bottom-right' })
}

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
    @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6;

    .item {
        .id {
            @apply text-center text-sm font-extralight leading-none;
        }

        &.obtained {
            @apply bg-green-100 border-green-300 hover:border-green-500;
        }
    }
}
</style>