import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/main.scss'



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
            // Limiting to gens 1 to 9, to avoid errors.
            path: '/:generation(generation-[ivx]{1,4})',
            name: 'Generation',
            component: () => import('./components/Generation.vue'),
            beforeEnter: (to, _, next) =>  {
                const {params: { generation } } = to
                const validRomanChars = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix']
                if (validRomanChars.some((rm) => generation.toString().includes(rm))) {
                    next()
                } else {
                    next({name: 'NotFound'})
                }
            }
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
