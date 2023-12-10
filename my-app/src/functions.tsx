import {IAnimal} from './interfaces';

export const decreaseHealth = (animals: IAnimal[]) => {
    const updateAnimalsHealth = animals.map((animal: IAnimal) => {
        const animalHealth = animal.health
        if (animalHealth >= 30) {
            const decrease = Math.floor(Math.random() * 21);
            animal.health = Number(animalHealth) - decrease;
        }
        return animal;

    })
   return updateAnimalsHealth;
}


export  const increaseHealth = (animals: IAnimal[]) => {
    const increase = Math.floor(Math.random() * 16) + 10;

    const updateAnimalsHealth = animals.map((animal) => {
        const animalHealth = animal.health
        if (animalHealth >= 30) {
            animal.health = Number(animalHealth) + increase;
            if (animal.health >= 100) {
                animal.health = 100;
            }
        }
        return animal;

    })
    return updateAnimalsHealth;
}