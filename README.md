# Pokedex IziPay

Ce projet a pour but de démontrer mes capacités avec VueJS et la consommation d'une API ([PokeApI](https://pokeapi.co/))

## Pour initialiser le projet :

- `git clone`
- `cd izipay-vue`
- `yarn && yarn dev`
- Le projet est alors disponible sur `http://localhost:3000`
- Le projet est également disponible sur [https://izipay-vue.vercel.app/](https://izipay-vue.vercel.app/)

## Technologies utilisées

- Vue 3
- Vite
- Vue Router
- idb-keyval (wrapper IndexedDB)
- GraphQL
- Pinia
- Tailwind

---

Le choix d'utilisation d'IndexedDB vs LocalStorage était pour l'assurance d'une meilleure persistence des données.

Celui de GraphQL est dû à l'utilisation d'une seule requête pour récupérer les pokémons et leurs infos, contre quelques centaines pour une génération en utilisant l'api REST.