import { IAnimal } from "../interfaces";
import './../styles.css';
import { capitaliseFirstLetter } from "../functions";

interface AnimalsProps {
  animals: IAnimal[];
}

const Animals: React.FC<AnimalsProps> = ({ animals }) => {
  
    const animalIcons = () => {
        const icons = [];
        for (let i = 0; i < animals.length; i++) {
            icons.push(
                <img
                    aria-label={`Icons of ${animals[i].type} alive`}
                    className={`animalIcons ${animals[i].condition === 'death' ? 'hiddenIcon' : ''}`}
                    key={i}
                    src={`./${animals[i].type}.png`}
                    alt={`icons of ${animals[i].type}s`}
                />
            )
        }
        return icons
    }

    return (
        <>
            <div className="animalsCage">
                <div className="animalsCage-name">
                    <h2>{capitaliseFirstLetter(animals[0].type)}s</h2>
                </div>
                <div className='animalsCage-IconsContainer'>
                    {animalIcons()}
                </div>
            </div>
        </>
    )
}

export default Animals