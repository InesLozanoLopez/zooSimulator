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
            if (giraffeHealth > 30) {
                const decrease = Math.floor(Math.random() * 21);
                giraffe.health = Number(giraffeHealth) - decrease;
            }
            return giraffe;

        })
        SetGiraffes(updateGiraffesHealth);
        const aliveCount = giraffes.filter((giraffe) => giraffe.health >= 30).length;
        SetGiraffesAlive(aliveCount);
    }

    return (
        <>
            <button type='submit' onClick={handledTime}>Add 1h</button>
            {giraffesAlive}
        </>
    )
}

export default Animals