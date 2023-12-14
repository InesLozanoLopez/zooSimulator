import { useEffect } from "react";
import { IAnimal } from "../interfaces"
import './../styles.css';
import { FaSquareFull } from 'react-icons/fa';


const AnimalsHealthInfo: React.FC<{ animals: IAnimal[] }> = ({ animals }) => {

    useEffect(() => {
        animalHealthDisplay(animals);
    }, [animals])

    const animalHealthDisplay = (animals: IAnimal[]) => {
        const squares = [];
        for (let i = 0; i < animals.length; i++) {
            squares.push(
                <FaSquareFull key={i} className={animals[i].condition} />
            )
        }
        return squares
    }

    return (
        <>
            {animalHealthDisplay(animals)}
        </>
    )
}

export default AnimalsHealthInfo