import { useEffect, useState } from "react";
import { IAnimal } from "../interfaces"
import './../styles.css';

const Animals: React.FC<{ animals: IAnimal[] }> = (animals) => {
    const [animalsAlive, SetAnimalsAlive]= useState<number>(5)

    useEffect(() => {
        const aliveCount = animals.animals.filter((animal) => animal.health >= 30).length;
        SetAnimalsAlive(aliveCount);
    }, [animals]);

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