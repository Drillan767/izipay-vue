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
            path: '/generation/:nbGeneration',
            name: 'Generation',
            component: () => import('./components/Generation.vue')
        }
    ]
})

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
