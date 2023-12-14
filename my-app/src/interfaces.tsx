export interface IAnimal {
    type: string,
    health: number,
    alive: boolean,
}

export interface INewZoo {
    zooName: string,
    zooAge: number,
    animals: IAnimal[],
}