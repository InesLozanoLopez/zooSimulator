import { IAnimal } from './interfaces';

let idCounter = 0;

export const decreaseHealth = (animals: IAnimal[]) => {
  const updateAnimalsHealth = animals.map((animal: IAnimal) => {
    if (animal.condition !== 'death') {
      if (animal.type === 'elephant') {
        animal.elephantPassCondition = animal.condition;
      }
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

export const updateAnimalsCondition = (animals: IAnimal[]) => {
  const updateAlive = animals.map((animal) => {
    if (animal.type === 'giraffe') {
      if (animal.health < 50) {
        animal.condition = 'death'
      } else {
        animal.condition = 'healthy'
      }
    }
    else if (animal.type === 'monkey') {
      if (animal.health < 30) {
        animal.condition = 'death'
      } else {
        animal.condition = 'healthy'
      }
    }
    else if (animal.type === 'elephant') {
      if (animal.health < 70) {
        if (animal.elephantPassCondition === 'ill') {
          animal.condition = 'death';
        } else if (animal.elephantPassCondition === 'healthy') {
          animal.condition = 'ill';
        }
      } else {
        animal.condition = 'healthy';
      }
  }
    return animal
})
return updateAlive;
}

export const increasingId = () => {
  idCounter += 1;
  return idCounter
}