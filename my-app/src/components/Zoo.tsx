import { IAnimal, INewZoo } from '../interfaces';
import { useLocation } from 'react-router-dom';
import Animals from './Animals';
import { useEffect, useState } from 'react';
import { decreaseHealth, increaseHealth } from '../functions';

const Zoo: React.FC = () => {
  const [animals, SetAnimals] = useState<IAnimal[]>([]);

  const location = useLocation();
  const newZoo: INewZoo = location.state?.newZoo;


  useEffect(() => {
    return SetAnimals(newZoo.animals);
}, []);


  const handledTime = () => {
    SetAnimals(decreaseHealth(animals));
  }
  const handledFood = () => {
    SetAnimals(increaseHealth(animals));
  }

  console.log('animals', animals)

  return (
    <>
      <h1>Welcome to {newZoo.zooName}!</h1>

      <button type='submit' onClick={handledTime}>Add 1h</button>
      <button type='submit' onClick={handledFood}>Food</button>

      <div>
        <Animals animals={newZoo.animals.filter((animal) => animal.type === 'giraffe')} />
      </div>
      <div>

        <Animals animals={newZoo.animals.filter((animal) => animal.type === 'elephant')} />
      </div>
      <div>

        <Animals animals={newZoo.animals.filter((animal) => animal.type === 'monkey')} />
      </div>


    </>
  );
}

export default Zoo;
