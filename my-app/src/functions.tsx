import { toast } from 'react-toastify';
import { IAnimal } from './interfaces';

// Decrease Health
export const decreaseHealth = (animals: IAnimal[]) => {
  const updateAnimalsHealth = animals.map((animal: IAnimal) => {
    if (animal.condition !== 'death') {
      if (animal.type === 'elephant') {
        animal.elephantPassCondition = animal.condition;
      }
      const animalHealth = animal.health;
      const decreasePercentage = Math.floor(Math.random() * 21);
      const decrease = (animalHealth * decreasePercentage) / 100;
      animal.health = Number(animalHealth) - decrease;
    }
    return animal;
  });

  return updateAnimalsHealth;
};

// Increase Health -> Feeding

const increaseHealthNumber = () => {
  const increaseHealthPercentage = Math.floor(Math.random() * 16) + 10;
  return increaseHealthPercentage;
};

export const increaseAnimalsHealth = (animals: IAnimal[]) => {
  const increaseGiraffeHealth = increaseHealthNumber();
  const increaseMonkeyHealth = increaseHealthNumber();
  const increaseElephantHealth = increaseHealthNumber();

  const updateAnimalsHealthFeeding = animals.map((animal) => {
    if (animal.condition !== 'death') {
      if (animal.type === 'giraffe') {
        const newHealth = animal.health + (animal.health * increaseGiraffeHealth)/100;
        if (newHealth >= 100) {
          animal.health = 100;
        } else {
          animal.health = newHealth;
        }
      } else if (animal.type === 'monkey') {
        const newHealth = animal.health + (animal.health * increaseMonkeyHealth)/100;
        if (newHealth >= 100) {
          animal.health = 100;
        } else {
          animal.health = newHealth;
        }
      } else if (animal.type === 'elephant') {
        const newHealth = animal.health + (animal.health * increaseElephantHealth)/100;;
        if (newHealth >= 100) {
          animal.health = 100;
        } else {
          animal.health = newHealth;
        }
      }
    }
    return animal;
  });
  return updateAnimalsHealthFeeding;
};

// Update animals' conditions

let deathToastShown = false;
let elephantIllToastShown = false;

export const updateAnimalsCondition = (animals: IAnimal[]) => {
  deathToastShown = true;
  let noNewDeath = true;
  elephantIllToastShown = true;

  const updateAlive = animals
    .filter((animal) => animal.condition !== 'death')
    .map((animal) => {
      if (animal.type === 'giraffe') {
        if (animal.health < 50) {
          animal.condition = 'death';
          noNewDeath = false;
        } else {
          animal.condition = 'healthy';
        }
      } else if (animal.type === 'monkey') {
        console.log(animal.health);
        if (animal.health < 30) {
          animal.condition = 'death';
          noNewDeath = false;
        } else {
          animal.condition = 'healthy';
        }
      } else if (animal.type === 'elephant') {
        if (animal.health < 70) {
          if (animal.elephantPassCondition === 'ill') {
            animal.condition = 'death';
            noNewDeath = false;
          } else if (animal.elephantPassCondition === 'healthy') {
            animal.condition = 'ill';
            if (elephantIllToastShown) {
              toast.warning('Becareful, one of your elephants cannot walk!');
              elephantIllToastShown = false;
            }

          }
        } else {
          animal.condition = 'healthy';
        }
      }
      return animal;
    });
  if (!noNewDeath && deathToastShown) {
    toast.error('Oh no, one of your animals passed away');
    deathToastShown = false;
  }
  return updateAlive;
};

// To capitalise first letter

export const capitaliseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
