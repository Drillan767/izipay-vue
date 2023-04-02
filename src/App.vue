<template>
  <div>
    <nav class="flex">
        <p>TODO: Lien vers Github</p>
    </nav>

    <h1 class="">IZIPAY POKEDEX</h1>

    <main>
        
        <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>

h1 {
    @apply text-4xl text-white font-bold text-center mb-4;
}

main {
    @apply container mx-auto;
}

</style>