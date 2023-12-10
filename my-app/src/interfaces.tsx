export interface IAnimal {
    type: string,
    health: number,
}

export interface INewZoo {
    zooName: string,
    animals: IAnimal[],
}