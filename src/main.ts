import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './styles/main.scss'
import App from './App.vue'

const pinia = createPinia()

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('./components/Home.vue')
        },
        {
            // Limiting to numbers 1 to 9, to avoid api errors.
            path: '/:generation(generation-[i|ii|iii|iv|v|vi|vii|viii|ix])',
            name: 'Generation',
            component: () => import('./components/Generation.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('./components/404.vue')
        }
    ]
})

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
