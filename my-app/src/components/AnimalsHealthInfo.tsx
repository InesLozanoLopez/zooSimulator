import { useEffect } from 'react';
import { IAnimal } from '../interfaces';
import './../styles.css';
import { FaSquareFull } from 'react-icons/fa';

interface animalsHealthProps {
  animals: IAnimal[];
}

const AnimalsHealthInfo: React.FC<animalsHealthProps> = ({ animals }) => {
  useEffect(() => {
    animalHealthDisplay(animals);
  }, [animals]);

  const animalHealthDisplay = (animals: IAnimal[]) => {
    const squares = [];
    for (let i = 0; i < animals.length; i++) {
      squares.push(
        <FaSquareFull
          key={i}
          aria-label={`The health of this animal is ${animals[i].condition}`}
          className={animals[i].condition}
        />,
      );
    }
    return squares;
  };

  return <>{animalHealthDisplay(animals)}</>;
};

export default AnimalsHealthInfo;
