import { IAnimal, INewZoo } from '../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import Animals from './Animals';
import AnimalsHealthInfo from './AnimalsHealthInfo';
import { useEffect, useState } from 'react';
import { decreaseHealth, increaseHealth, updateAnimalsCondition } from '../functions';
import './../styles.css';

const Zoo: React.FC = () => {
  const [animals, SetAnimals] = useState<IAnimal[]>([]);
  const [intervalId, SetIntervalId] = useState<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const newZoo: INewZoo = location.state?.newZoo;
  const navigate = useNavigate();


  useEffect(() => {
    SetAnimals(newZoo.animals);
    startInterval();
  }, []);

  const startInterval = () => {
    const intervalId = setInterval(() => {
      handledTime();
    }, 3600000)
    SetIntervalId(intervalId);
  }


  const handledTime = () => {
    if (intervalId) {
      clearInterval(intervalId);
      SetAnimals(decreaseHealth(animals));
      startInterval();
      newZoo.zooAge += 1;
    }
    SetAnimals(decreaseHealth(animals));
    console.log('animalsFoodBeforeHealth', animals)
    SetAnimals(updateAnimalsCondition(animals));
    console.log('animalsFoodAfterHealth', animals)

  };

  const handledFood = () => {
    const increaseGiraffeHealth = increaseHealth();
    const increaseMonkeyHealth = increaseHealth();
    const increaseElephantHealth = increaseHealth();

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
    SetAnimals(updateAnimalsCondition(updateAnimalsHealthFeeding))
  };

  const handledNewZoo = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    navigate('/')
  }

  return (
    <section id="zoo">
      <h1 className='zoo-welcome'>Welcome to {newZoo.zooName}!</h1>
      <div className='zoo-age'>Zoo age: {newZoo.zooAge} {newZoo.zooAge > 1 ? 'hours' : 'hour'}</div>
      <div className='zoo-buttons'>
        <img
          onClick={handledTime}
          className='zoo-buttons-icon'
          src='./timeIcon.png'
          alt='Time Icon' />
        <img
          onClick={handledFood}
          className='zoo-buttons-icon'
          src='./foodIcon.png'
          alt='Food Icon' />
      </div>

      <div className='zoo-animals-grid'>
        <div className='zoo-animals-grid-cage cage-a'>
          <Animals animals={newZoo.animals.filter((animal) => animal.type === 'giraffe')} />
        </div>
        <div className='zoo-animals-grid-cage cage-b'>
          <Animals animals={newZoo.animals.filter((animal) => animal.type === 'elephant')} />
        </div>
        <div className='zoo-animals-grid-cage cage-c'>
          <Animals animals={newZoo.animals.filter((animal) => animal.type === 'monkey')} />
        </div>
      </div>

      <div className='zoo-otherInfo'>
        <div className='zoo-otherInfo-HealthInfo'>
          <div className='zoo-otherInfo-HealthInfo-Container'>
            <div className='zoo-otherInfo-HealthInfo-Container-AnimalType'>Giraffes' Health:</div>
            <div className='zoo-otherInfo-HealthInfo-Container-animalsHealth'>
            <AnimalsHealthInfo animals={newZoo.animals.filter((animal) => animal.type === 'giraffe')}/>
            </div>
          </div>
          <div className='zoo-otherInfo-HealthInfo-Container'>
            <div className='zoo-otherInfo-HealthInfo-Container-AnimalType'>Monkeys' Health:</div>
            <div className='zoo-otherInfo-HealthInfo-Container-animalsHealth'>
              <AnimalsHealthInfo animals={newZoo.animals.filter((animal) => animal.type === 'monkey')}/>
            </div>
          </div>
          <div className='zoo-otherInfo-HealthInfo-Container'>
            <div className='zoo-otherInfo-HealthInfo-Container-AnimalType'>Elephants' Health:</div>
            <div className='zoo-otherInfo-HealthInfo-Container-animalsHealth'>
            <AnimalsHealthInfo animals={newZoo.animals.filter((animal) => animal.type === 'elephant')}/>
            </div>
          </div>
        </div>
          <button className='zoo-otherInfo-button' type='submit' onClick={handledNewZoo}>New Zoo</button>
        </div>
    </section >
  );
}

export default Zoo;
