<template>
    <div>
        <p>Page génération avec comme id: {{ nbGeneration }}</p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'


const route = useRoute()
const { params: { nbGeneration } } = route


</script>