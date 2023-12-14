import { IAnimal } from './interfaces';

export const decreaseHealth = (animals: IAnimal[]) => {
    const updateAnimalsHealth = animals.map((animal: IAnimal) => {
        if (animal.health >= 30) {
        const animalHealth = animal.health;
        const decrease = Math.floor(Math.random() * 21);
        animal.health = Number(animalHealth) - decrease;
        }
        return animal;
    })
    return updateAnimalsHealth;
}


export const increaseHealth = () => {
    const increase = Math.floor(Math.random() * 16) + 10;
    return increase;
}