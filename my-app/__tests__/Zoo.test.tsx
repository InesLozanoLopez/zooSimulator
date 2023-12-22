import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Zoo from '../src/components/Zoo';
import { toast } from 'react-toastify';
import '../src/styles.css'


interface newZooProp {
    zooName: string;
    zooAge: number;
    animals: Array<
        { type: string; health: number; condition: string }>
}

const newZoo: newZooProp = {
    zooName: 'Test Zoo',
    zooAge: 0,
    animals: [
        { type: 'giraffe', health: 100, condition: 'healthy' },
        { type: 'elephant', health: 69, condition: 'ill' },
        { type: 'monkey', health: 20, condition: 'death' },
    ],
};

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(() => ({ state: { newZoo } })),
}));

jest.useFakeTimers();


describe('Zoo component', () => {
    it('renders the Zoo component with initial zoo details', async () => {
        render(
            <MemoryRouter>
                <Zoo />
            </MemoryRouter>,
        );

        await act(async () => {
            expect(screen.getByText(`Welcome to ${newZoo.zooName}!`)).toBe;
            expect(screen.getByText(`Zoo age: ${newZoo.zooAge} hour`)).toBe;
        });

    });

    it('handles time button click and updates zoo age', async () => {
        render(<Zoo />, { wrapper: MemoryRouter });

        const initialAge = `${newZoo.zooAge}`;
        const element = screen.getByLabelText('Make your zoo 1 hour older');
        expect(element).toBe;

        await act(async () => {
            fireEvent.click(element);
        });
        await waitFor(() => {
            toast.success('Your Zoo is 1h older');
        });
        const updatedAge = `${newZoo.zooAge}`;

        expect(Number(updatedAge)).toBeGreaterThan(Number(initialAge));
    });

    it('handles food button click and updates animals health', async () => {
        render(<Zoo />, { wrapper: MemoryRouter });

        const element = screen.getByAltText('Food Icon');
        expect(element).toBe;

        await act(async () => {
            fireEvent.click(element);
        });
        await waitFor(() => {
            expect(toast.success('Your animals have been feed :)'));
        });
    });
    it('updates zoo age with the interval', async () => {
            render(<Zoo />, { wrapper: MemoryRouter });

        const initialAge = `${newZoo.zooAge}`;

        act(() => {
            jest.advanceTimersByTime(3600001);
        });
        await waitFor(() => {
            expect(toast.success('Your Zoo is 1h older'));
        });
        const updatedAge = `${newZoo.zooAge}`;
        expect(Number(updatedAge)).toBeGreaterThan(Number(initialAge));
    })
})
