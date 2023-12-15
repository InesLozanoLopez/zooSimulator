import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Animals from './../src/components/Animals';
import '../src/styles.css';

const mockAnimals = [
    { type: 'giraffe', health: 100, condition: 'healthy' },
    { type: 'elephant', health: 69, condition: 'ill' },
    { type: 'monkey', health: 20, condition: 'death' },
]

describe('Animals component', () => {
    it('render animal type', () => {
        render(<Animals animals={mockAnimals} />);
        const typeElement = screen.getAllByLabelText(`Icons of ${mockAnimals[0].type} alive`);
        expect(typeElement).toBe;
    });

    it('renders correct number of animal icons', () => {
        render(<Animals animals={mockAnimals} />);
        const animalIcons = screen.getAllByLabelText(`Icons of giraffe alive`);
        expect(animalIcons).toBeVisible;
      });

    it('updates the number of animals alive on prop change', () => {
        render(<Animals animals={mockAnimals} />);
        const element = screen.getAllByLabelText(`Icons of monkey alive`);
        expect(element).not.toBe;

        const updatedMockAnimals = [
            { type: 'giraffe', health: 100, condition: 'healthy' },
            { type: 'elephant', health: 69, condition: 'ill' },
            { type: 'monkey', health: 20, condition: 'healthy' }
        ];

        render(<Animals animals={updatedMockAnimals} />);
        const typeElement = screen.getAllByLabelText(`Icons of monkey alive`);
        expect(typeElement).toBe;
    });
})