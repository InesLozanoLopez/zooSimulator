import { useEffect } from "react";
import { IAnimal } from "../interfaces"
import './../styles.css';
import { FaSquareFull } from 'react-icons/fa';


const AnimalsHealthInfo: React.FC<{ animals: IAnimal[] }> = ({ animals }) => {
    /* Update the animals display according to the animal.condition
*/
    useEffect(() => {
        animalHealthDisplay(animals);        
    }, [animals])


    /* Generate as many squares as animal of each type are and add the clasName according to their animal.condition
*/
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