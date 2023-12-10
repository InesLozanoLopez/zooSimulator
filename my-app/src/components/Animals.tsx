import { useEffect, useState } from "react";
import { IAnimal } from "../interfaces"

const Animals: React.FC<{ animals: IAnimal[] }> = (animals) => {
    const [animalsAlive, SetAnimalsAlive]= useState<number>(5)

    useEffect(() => {
        console.log('account')
        const aliveCount = animals.animals.filter((animal) => animal.health >= 30).length;
        SetAnimalsAlive(aliveCount);
    }, [animals]);

    
   
    return (
        <>
        {animals.animals[0].type}
            {animalsAlive}
        </>
    )
}

export default Animals