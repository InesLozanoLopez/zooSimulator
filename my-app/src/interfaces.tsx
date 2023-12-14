export interface IAnimal {
    type: string,
    health: number,
    condition: string,
    elephantPassCondition?: string,
}

export interface INewZoo {
    zooName: string,
    zooAge: number,
    animals: IAnimal[],
}