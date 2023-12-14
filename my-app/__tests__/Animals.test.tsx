import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Animals from './../src/components/Animals';
import React from 'react';

const mockAnimals = [
    { type: 'giraffe', health: 100, condition: 'healthy' },
    { type: 'elephant', health: 69, condition: 'ill' },
    { type: 'monkey', health: 20, condition: 'death' }
]

describe('Animals component', () => {
    it('renders animal type', () => {
        render(<Animals animals={mockAnimals} />);
        const typeElement = screen.getAllByLabelText(`Icons of ${mockAnimals[0].type} alive`);
        expect(typeElement).toBeInTheDocument();
    });

    it('renders correct number of animal icons', () => {
        render(<Animals animals={mockAnimals} />);
        const animalIcons = screen.getAllByAltText(/icons of/i);
        expect(animalIcons).toHaveLength(3); // Updated to 3 based on the mockAnimals array length
      });

    it('updates the number of animals alive on prop change', () => {
        render(<Animals animals={mockAnimals} />);
        const initialCount = screen.getAllByAltText(/icons of giraffe/i).length;

        const updatedMockAnimals = [
            { type: 'giraffe', health: 100, condition: 'healthy' },
            { type: 'elephant', health: 69, condition: 'ill' },
            { type: 'monkey', health: 20, condition: 'healthy' }
        ];

        render(<Animals animals={updatedMockAnimals} />);
        const updatedCount = screen.getAllByAltText(/icons of giraffe/i).length;

        expect(updatedCount).toBeGreaterThan(initialCount);
    });
})