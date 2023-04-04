<template>
    <div class="home">
        <h1>Progression</h1>
        <div class="list">
            <template v-for="(game, i) in list" :key="i">
                <RouterLink :to="{ name: 'Generation', params: { generation: game.gen } }">
                    <div class="item">
                        <div class="progress" :style="`width: ${percentage(game.obtained, game.nbPokemons)}%`"></div>
                        <div class="content">
                            <h2>{{ game.name }}</h2>
                            <p>{{ game.obtained }} / {{ game.nbPokemons }}</p>
                        </div>
                    </div>
                </RouterLink>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { usePokemonStore } from '../stores/pokemon'
import type { List } from '../types'

const store = usePokemonStore()

const list = ref<List>([])
const percentage = (obtained: number, total: number) => (obtained / total) * 100
onMounted(async () => {
    list.value = await store.globalProgress()
})
</script>

<style scoped lang="scss">
.list {
    @apply grid grid-cols-1 md:grid-cols-3 gap-3 mb-6;

    .item {
        @apply relative;

        .progress {
            @apply bg-green-200 absolute z-0 top-0 bottom-0 left-0 rounded-lg;
        }

        .content {
            @apply relative z-10 text-center;


            h2 {
                @apply text-xl font-bold;
            }
        }
    }
}
</style>