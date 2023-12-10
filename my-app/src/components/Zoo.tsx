import { IAnimal, INewZoo } from '../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import Animals from './Animals';
import { useEffect, useState } from 'react';
import { decreaseHealth, increaseHealth } from '../functions';
import './../styles.css';

const Zoo: React.FC = () => {
  const [animals, SetAnimals] = useState<IAnimal[]>([]);

  const location = useLocation();
  const newZoo: INewZoo = location.state?.newZoo;
  const navigate = useNavigate();


  useEffect(() => {
    return SetAnimals(newZoo.animals);
}, []);


  const handledTime = () => {
    SetAnimals(decreaseHealth(animals));
  }
  const handledFood = () => {
    SetAnimals(increaseHealth(animals));
  }
  const handledNewZoo = () => {
    navigate('/')
  }

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

      <button type='submit' onClick={handledNewZoo}>New Zoo</button>


    </>
  );
}

export default Zoo;
