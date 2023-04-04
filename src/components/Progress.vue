<template>
    <div class="flex justify-end mb-24 mr-5 md:mr-0 sticky top-10">
        <div class="flex shrink-0 items-center flex-wrap max-w-md px-10 bg-white shadow-xl rounded-2xl h-20">
            <div class="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full">
                <svg class="w-32 h-32 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
                    <circle class="text-gray-300" stroke-width="10" stroke="currentColor" fill="transparent" r="50" cx="60"
                        cy="60" />
                    <circle 
                        :class="{'text-amber-400': total === obtained, 'text-blue-400': total !== obtained}"
                        stroke-width="10"
                        :stroke-dasharray="circumference"
                        :stroke-dashoffset="progress"
                        stroke-linecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="50" cx="60" cy="60"
                    />
                </svg>
                <span class="absolute text-2xl text-blue-700">{{ percentage }}%</span>
            </div>
            <p class="ml-10 font-medium text-gray-600 sm:text-xl">Complétion</p>

            <span class="ml-5 text-xl font-medium text-blue-600 hidden sm:block">
                {{ obtained }} / {{ total }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type ProgressProps = {
    obtained: number,
    total: number,
    percentage: number,
    circumference: number,
    progress: number,
}

const { obtained, total, percentage, circumference, progress } = defineProps<ProgressProps>()
</script>