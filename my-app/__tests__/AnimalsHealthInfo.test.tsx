import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimalsHealthInfo from './../src/components/AnimalsHealthInfo';
import '@testing-library/jest-dom/extend-expect';

const mockAnimals = [
    { type: 'giraffe', health: 100, condition: 'healthy' },
    { type: 'elephant', health: 69, condition: 'ill' },
    { type: 'monkey', health: 20, condition: 'death' }
]

describe('AnimalsHealthInfo component', () => {
    it('applies the correct className to each health square', () => {
        render(<AnimalsHealthInfo animals={mockAnimals} />);
        const healthSquares = screen.getAllByLabelText(`The health of this animal is ${mockAnimals[0].condition}`);
        healthSquares.forEach((square, index) => {
            expect(square).toHaveClass(mockAnimals[index].condition);
        });
    });

    it('updates the health display on prop change', () => {
        const { rerender } = render(<AnimalsHealthInfo animals={mockAnimals} />);
        const updatedMockAnimals = [
            { type: 'giraffe', health: 80, condition: 'ill' },
            { type: 'elephant', health: 80, condition: 'healthy' },
            { type: 'monkey', health: 50, condition: 'healthy' }
        ];

        rerender(<AnimalsHealthInfo animals={updatedMockAnimals} />);
        const updatedHealthSquares = screen.getAllByLabelText(`The health of this animal is ill`);

        expect(updatedHealthSquares).toHaveLength(1);

        const updatedHealthSquares2 = screen.getAllByLabelText(`The health of this animal is healthy`);
        expect(updatedHealthSquares2).toHaveLength(2);

        
        updatedHealthSquares.forEach((square, index) => {
            expect(square).toHaveClass(updatedMockAnimals[index].condition);
        });
    });
});