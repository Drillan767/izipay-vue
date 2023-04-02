export type Pokemon = {
    id: number,
    name: string,
    capacities: {
        name: string,
        hidden: boolean,
    }[],
    type: string[],
    legendary: boolean,
    imgUrl: string,
    generation: number,
    obtained: boolean,
}

export type Name = {
    language: {
        name: string,
        url: string
    },
    name: string
}