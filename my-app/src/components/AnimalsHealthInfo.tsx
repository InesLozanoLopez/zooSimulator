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
                <FaSquareFull key={i} className={healthStatus(animals[i])} />
            )
        }
        return squares
    }

    const healthStatus = (animal:IAnimal): string => {
        if (!animal.alive){
            return 'death'
        } else if (animal.type === 'elephant' && animal.health === 70){
            return 'ill'
        } 
        return 'healthy'
    }

    return (
        <>
            {animalHealthDisplay(animals)}
        </>
    )
}

export default AnimalsHealthInfo