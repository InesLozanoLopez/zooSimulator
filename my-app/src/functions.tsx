import { toast } from 'react-toastify';
import { IAnimal } from './interfaces';

// Decrease Health
/* To simplify the code, I have decided to create a elephantPassCondition property to meet the goal of the ill condition.
If I stored the previous condition to be used on the  updateAnimalsCondition function.
The alternative was create animalsId, but I thought this solution was easier.
*/
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

// Increase Health -> Feeding

/* To create a randon number between 10 and 25
*/
const increaseHealthNumber = () => {
  const increase = Math.floor(Math.random() * 16) + 10;
  return increase;
}
/* To simplify the code as much as possible, I have decided to generate the three numbers, one for each of the animal
and then map the animals array and update each animal health according to this number.
*/
export const increaseAnimalsHealth = (animals: IAnimal[]) => {

const increaseGiraffeHealth = increaseHealthNumber();
const increaseMonkeyHealth = increaseHealthNumber();
const increaseElephantHealth = increaseHealthNumber();

const updateAnimalsHealthFeeding = animals.map((animal) => {
  if (animal.condition !== 'death') {
    if (animal.type === 'giraffe') {
      const newHealth = animal.health + increaseGiraffeHealth;
      if (newHealth >= 100) {
        animal.health = 100;
      } else {
        animal.health = newHealth;
      }
    }
    else if (animal.type === 'monkey') {
      const newHealth = animal.health + increaseMonkeyHealth;
      if (newHealth >= 100) {
        animal.health = 100;
      } else {
        animal.health = newHealth;
      }
    }
    else if (animal.type === 'elephant') {
      const newHealth = animal.health + increaseElephantHealth;
      if (newHealth >= 100) {
        animal.health = 100;
      } else {
        animal.health = newHealth;
      }
    }
  }
  return animal
})
return updateAnimalsHealthFeeding
}

// Update animals' conditions
/* Every time that the health of a animal changes the updateAnimalsCondition function is triger and update their condition. In this function, I am
using the elephantPassCondition propety which I updated on the decreaseHealth function to know which was the previous condition on the elephants.
If the elephant should be ill (previous condition was healthy) or death (previous condition was ill).
*/
export const updateAnimalsCondition = (animals: IAnimal[]) => {
  let noNewDeath = true;

  const updateAlive = animals
  .filter((animal) => animal.condition !== 'death').map((animal) => {
    if (animal.type === 'giraffe') {
      if (animal.health < 50) {
        animal.condition = 'death';
        noNewDeath = false;
      } else {
        animal.condition = 'healthy'
      }
    }
    else if (animal.type === 'monkey') {
      console.log(animal.health);
      if (animal.health < 30) {
        animal.condition = 'death';
        noNewDeath = false;
      } else {
        animal.condition = 'healthy'
      }
    }
    else if (animal.type === 'elephant') {
      if (animal.health < 70) {
        if (animal.elephantPassCondition === 'ill') {
          animal.condition = 'death';
          noNewDeath = false;
        } else if (animal.elephantPassCondition === 'healthy') {
          animal.condition = 'ill';
          toast.warning('Becareful, one of your elephants cannot walk!')
        }
      } else {
        animal.condition = 'healthy';
      }
    }
    return animal
})
  if (!noNewDeath) {
    toast.error('Oh no, one of your animals passed away')
  }
  return updateAlive;
}

// To capitalise first letter

export const capitaliseFirstLetter = (str : string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}