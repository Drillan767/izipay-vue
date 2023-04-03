<template>
    <div>
        <div class="home grid grid-cols-1 md:grid-cols-3 gap-3">

            <template v-for="(game, i) in list" :key="i">
                <RouterLink :to="{name: 'Generation', params: {generation: game.gen}}">
                    <div class="col-span-1 h-20 bg-gray-100">
                        <p>{{ game.name }}</p>
                        <p>Progression : {{ game.obtained }} / {{ game.nbPokemons }}</p>
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

const list = ref<List>([])

const store = usePokemonStore()

onMounted(async () => {
    list.value = await store.globalProgress()
})

const generations = [{}]
</script>