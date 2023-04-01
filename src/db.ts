import Dexie, { Table } from 'dexie'

export interface Pokemon {
    id: number,
    name: string,
    generation: number,
    obtained: boolean,
    capacities: {
        name: string
    }[]
}

export class Pokemons extends Dexie {
    pokemons!: Table<Pokemon>

    constructor() {
        super('izipaydb')
        this.version(1).stores({
            pokemons: 'id, name, generation, capacities, obtained'
        })
    }
}

export const db = new Pokemons()