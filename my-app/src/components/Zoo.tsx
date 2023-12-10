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
    <section id="zoo">
      <h1 className='zoo-welcome'>Welcome to {newZoo.zooName}!</h1>
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

      <button className='newZoo-button' type='submit' onClick={handledNewZoo}>New Zoo</button>

    </section>
  );
}

export default Zoo;
