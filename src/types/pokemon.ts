export interface PokemonDataUseType {
    name: string,
    image: string
}

export interface PokemonApiType {
    name: string,
    url: string
}

export interface PokemonFormApiType {
    id: number,
    name: string,
    order: number,
    is_default: boolean,
    height: number,
    weight: 75,
    pokemon: PokemonApiType,
    sprites: {
        back_default: string,
        back_female: null,
        back_shiny: string,
        back_shiny_female: null,
        front_default: string,
        front_female: null,
        front_shiny: string,
        front_shiny_female: null,
        other: {
            home: {
                front_default:string,
                front_female:null,
                front_shiny:string,
                front_shiny_female:null
            }
        }
    }
}