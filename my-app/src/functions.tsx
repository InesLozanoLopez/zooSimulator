import { IAnimal } from './interfaces';

export const decreaseHealth = (animals: IAnimal[]) => {
    const updateAnimalsHealth = animals.map((animal: IAnimal) => {
        if (animal.alive === true) {
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

export const updateAnimalsAlive = (animals: IAnimal[]) => {
    const updateAlive = animals.map((animal) => {
        if (animal.type === 'giraffe' && animal.health < 50) {
            animal.alive = false
          }
          else if (animal.type === 'monkey' && animal.health < 30) {
            animal.alive = false
          }
          else if (animal.type === 'elephant' && animal.health < 70) {
            animal.alive = false
          }
          return animal
    })
    return updateAlive;
}