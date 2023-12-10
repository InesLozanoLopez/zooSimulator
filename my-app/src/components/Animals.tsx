import { useEffect, useState } from "react";
import { IAnimal } from "../interfaces"

const Animals: React.FC<{ animals: IAnimal[] }> = (animals) => {
    const [giraffes, SetGiraffes] = useState<IAnimal[]>([]);
    const [giraffesAlive, SetGiraffesAlive]= useState<number>(5)

    useEffect(() => {
        SetGiraffes(animals.animals.filter((animal) => animal.type === 'giraffe'));
    }, []);

    const handledTime = () => {
        const updateGiraffesHealth = giraffes.map((giraffe) => {
            const giraffeHealth = giraffe.health
            if (giraffeHealth >= 30) {
                const decrease = Math.floor(Math.random() * 21);
                giraffe.health = Number(giraffeHealth) - decrease;
            }
            return giraffe;

        })
        SetGiraffes(updateGiraffesHealth);
        const aliveCount = giraffes.filter((giraffe) => giraffe.health >= 30).length;
        SetGiraffesAlive(aliveCount);
    }

    const handledFood = () => {
        const increase = Math.floor(Math.random() * 16) + 10;

        const updateGiraffesHealth = giraffes.map((giraffe) => {
            const giraffeHealth = giraffe.health
            if (giraffeHealth >= 30) {
                giraffe.health = Number(giraffeHealth) + increase;
                if (giraffe.health >= 100) {
                    giraffe.health = 100;
                }
            }
            return giraffe;

        })
        SetGiraffes(updateGiraffesHealth);
    }

    console.log(giraffes)

    return (
        <>
            <button type='submit' onClick={handledTime}>Add 1h</button>
            <button type='submit' onClick={handledFood}>Food</button>
            {giraffesAlive}
        </>
    )
}

export default Animals