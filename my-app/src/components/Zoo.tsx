import { IAnimal, INewZoo } from '../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import Animals from './Animals';
import AnimalsHealthInfo from './AnimalsHealthInfo';
import { useEffect, useState } from 'react';
import {
  decreaseHealth,
  increaseAnimalsHealth,
  updateAnimalsCondition,
} from '../functions';
import './../styles.css';
import { toast } from 'react-toastify';

const Zoo: React.FC = () => {
  const [animals, SetAnimals] = useState<IAnimal[]>([]);
  const [intervalId, SetIntervalId] = useState<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const newZoo: INewZoo = location.state?.newZoo;
  const navigate = useNavigate();

  useEffect(() => {
    if (!newZoo) {
      navigate('/');
    }
    SetAnimals(newZoo?.animals);
    startInterval();
  }, []);

  const startInterval = () => {
    const intervalId = setInterval(() => {
      handledTime();
    }, 3600000);
    SetIntervalId(intervalId);
  };

  const handledTime = () => {
    toast.success('Your Zoo is 1h older');
    if (intervalId) {
      clearInterval(intervalId);
    }
    SetAnimals(decreaseHealth(animals));
    SetAnimals(updateAnimalsCondition(animals));
    checkAllAnimalDead(animals);
    startInterval();
    newZoo.zooAge += 1;
  };

  const handledFood = () => {
    toast.success('Your animals have been feed :)');
    const feedingAnimals = increaseAnimalsHealth(animals);
    SetAnimals(updateAnimalsCondition(feedingAnimals));
    leavesRaining();
  };

  const checkAllAnimalDead = (animals: IAnimal[]) => {
    if (animals.every((animal) => animal.condition === 'death')) {
      toast.error('You killed all your animals... Your zoo is closed!');
    }
  };

  const leavesRaining = () => {
    const numberOfLeaves = 30;
    for (let i = 0; i < numberOfLeaves; i++) {
      const leavesIcon = document.createElement('img');
      leavesIcon.src = '/leaves.png';
      leavesIcon.alt = 'Leaves rain';
      leavesIcon.setAttribute('aria-label', 'Leaves rain');
      leavesIcon.className = 'fallingLeaves';

      leavesIcon.style.left = `${Math.random() * 100}vw`;
      leavesIcon.style.animationDelay = `${Math.random()}s`;

      document.body.appendChild(leavesIcon);

      setTimeout(() => {
        document.body.removeChild(leavesIcon);
      }, 5000);
    }
  };

  const handledNewZoo = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    navigate('/');
  };

  return (
    <section id="zoo">
      {newZoo && (
        <>
          <h1 className="zoo-welcome">Welcome to {newZoo.zooName}!</h1>
          <div className="zoo-age">
            Zoo age: {newZoo.zooAge} {newZoo.zooAge > 1 ? 'hours' : 'hour'}
          </div>
          <div className="zoo-buttons">
            <img
              onClick={handledTime}
              aria-label="Make your zoo 1 hour older"
              className="zoo-buttons-icon"
              src="./timeIcon.png"
              alt="Time Icon"
            />
            <img
              onClick={handledFood}
              aria-label="Give food to your animals"
              className="zoo-buttons-icon"
              src="./foodIcon.png"
              alt="Food Icon"
            />
          </div>

          <div className="zoo-animals-grid">
            <div className="zoo-animals-grid-cage cage-a">
              <Animals
                animals={newZoo.animals.filter(
                  (animal) => animal.type === 'giraffe',
                )}
              />
            </div>
            <div className="zoo-animals-grid-cage cage-b">
              <Animals
                animals={newZoo.animals.filter(
                  (animal) => animal.type === 'elephant',
                )}
              />
            </div>
            <div className="zoo-animals-grid-cage cage-c">
              <Animals
                animals={newZoo.animals.filter(
                  (animal) => animal.type === 'monkey',
                )}
              />
            </div>
          </div>

          <div className="zoo-otherInfo">
            <div className="zoo-otherInfo-HealthInfo">
              <div className="zoo-otherInfo-HealthInfo-Container">
                <div className="zoo-otherInfo-HealthInfo-Container-AnimalType">
                  Giraffes&apos; Health:
                </div>
                <div className="zoo-otherInfo-HealthInfo-Container-animalsHealth">
                  <AnimalsHealthInfo
                    animals={newZoo.animals.filter(
                      (animal) => animal.type === 'giraffe',
                    )}
                  />
                </div>
              </div>
              <div className="zoo-otherInfo-HealthInfo-Container">
                <div className="zoo-otherInfo-HealthInfo-Container-AnimalType">
                  Monkeys&apos; Health:
                </div>
                <div className="zoo-otherInfo-HealthInfo-Container-animalsHealth">
                  <AnimalsHealthInfo
                    animals={newZoo.animals.filter(
                      (animal) => animal.type === 'monkey',
                    )}
                  />
                </div>
              </div>
              <div className="zoo-otherInfo-HealthInfo-Container">
                <div className="zoo-otherInfo-HealthInfo-Container-AnimalType">
                  Elephants&apos; Health:
                </div>
                <div className="zoo-otherInfo-HealthInfo-Container-animalsHealth">
                  <AnimalsHealthInfo
                    animals={newZoo.animals.filter(
                      (animal) => animal.type === 'elephant',
                    )}
                  />
                </div>
              </div>
            </div>
            <button
              className="zoo-otherInfo-button"
              type="submit"
              onClick={handledNewZoo}
            >
              New Zoo
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Zoo;
