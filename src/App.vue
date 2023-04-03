<template>
    <div class="app">
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <router-link to="/" class="flex items-center">
                    <img src="./assets/pokedex.png" class="h-8 mr-3" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IZIPAY POKEDEX</span>
                </router-link>

                <div class="block md:w-auto" id="navbar-default">
                    <ul
                        class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <a href="https://github.com/Drillan767/izipay-vue"
                                class="block py-2 pl-3 pr-4 text-white dark:text-white"
                                target="_blank">
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <main class="px-2 mt-10">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePokemonStore } from './stores/pokemon'

const store = usePokemonStore()

onMounted(async () => {
    const filled = await store.dbFilled()
    if (!filled) {
        store.loadPokemons()
    }
})

</script>

<style scoped>
h1 {
    @apply text-4xl text-white font-bold text-center mb-4;
}

main {
    @apply container mx-auto;
}
</style>