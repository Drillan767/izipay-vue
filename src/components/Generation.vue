<template>
    <div>
        <p>Page génération avec comme id: {{ nbGeneration }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemon'

const route = useRoute()
const { params: { nbGeneration } } = route
const store = usePokemonStore()

onMounted(() => {
    store.addPokemons({limit: 1, offset: 0})
})


</script>