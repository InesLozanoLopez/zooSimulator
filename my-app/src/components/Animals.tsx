import { useEffect, useState } from "react";
import { IAnimal } from "../interfaces"
import './../styles.css';

const Animals: React.FC<{ animals: IAnimal[] }> = (animals) => {
    const [animalsAlive, SetAnimalsAlive]= useState<number>(5)

    /* Update the client view when the animals change
*/
    useEffect(() => {
        const aliveCount = animals.animals.filter((animal) => animal.condition !== 'death').length;
        SetAnimalsAlive(aliveCount);
    }, [animals]);

    /* Generate as many animals icons as animals of that type are alive
*/
    const animalIcons = (animalsAlive: number) => {
        const icons = [];
        for (let i =0; i<animalsAlive; i++){
        icons.push(
        <img
        className="animalIcons"
        key={i}
        src={`./${animals.animals[0].type}.png`}
        alt ={`icons of ${animals.animals[0].type}s`}
        />
        )}
        return icons
    }
   
    return (
        <>
        {animals.animals[0].type}
        <div className='animalIcons-container'>
            {animalIcons(animalsAlive)}
        </div>
        </>
    )
}

export default Animals