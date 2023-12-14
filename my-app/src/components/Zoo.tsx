import { IAnimal, INewZoo } from '../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import Animals from './Animals';
import AnimalsHealthInfo from './AnimalsHealthInfo';
import { useEffect, useState } from 'react';
import { decreaseHealth, increaseAnimalsHealth, updateAnimalsCondition } from '../functions';
import './../styles.css';
import { toast } from 'react-toastify';

const Zoo: React.FC = () => {
  const [animals, SetAnimals] = useState<IAnimal[]>([]);
  const [intervalId, SetIntervalId] = useState<NodeJS.Timeout | null>(null);

  // use the location of the router to get the zoo name and animals

  const location = useLocation();
  const newZoo: INewZoo = location.state?.newZoo;
  const navigate = useNavigate();

  // Update the client view when the page is renderise and start the interval for zoo.age to be updated every hour.

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

/*Update animals' health when on hour is passed or when the handledTime icon is pressed.
This function (handledTime) clear and create a new intervalID if there was already one.
In addition, it should be set up the interval to 0, also decrease the health of animals, check if all animals are death and increase the zoo.age by 1
*/

  const handledTime = () => {
    toast.success('Your Zoo is 1h older');
    const currentDate = new Date();
    console.log('currentDate', currentDate);
    if (intervalId) {
      clearInterval(intervalId);
    }
    SetAnimals(decreaseHealth(animals));
    SetAnimals(updateAnimalsCondition(animals));
    checkAllAnimalDead(animals);
    startInterval();
    newZoo.zooAge += 1;

  };
/*Update animals' health when the food icon is pressed.
*/
  const handledFood = () => {
    toast.success('Your animals have been feed :)');
    const feedingAnimals = increaseAnimalsHealth(animals);   
    SetAnimals(updateAnimalsCondition(feedingAnimals));
} 
/* I created this function just to trigger a message when all animals are death
*/
const checkAllAnimalDead = (animals: IAnimal[]) => {
  if (animals.every((animal) => animal.condition === 'death')) {
      toast.error('You kill all your animals... Your zoo is closed!')
  };
}

/* Navegate to the main page (newZoo) to start the simulator again
*/
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

