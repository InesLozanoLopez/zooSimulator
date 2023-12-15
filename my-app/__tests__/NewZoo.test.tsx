import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NewZoo from '../src/components/NewZoo';
import { toast } from 'react-toastify';
import { createMemoryHistory } from 'history';


describe('NewZoo component', () => {
    it('renders the form correctly', () => {
        render(<NewZoo />, { wrapper: MemoryRouter });

        const zooNameInput = screen.getByPlaceholderText('Zoo name...');
        const submitButton = screen.getByText('New Zoo');

        expect(zooNameInput).toBe;
        expect(submitButton).toBe;
    });

    it('submits the form with valid input', async () => {
        const history = createMemoryHistory();
        render(<NewZoo />, { wrapper: MemoryRouter });

        const zooNameInput = screen.getByPlaceholderText('Zoo name...');
        const submitButton = screen.getByText('New Zoo');

        act(() => {
            fireEvent.change(zooNameInput, { target: { value: 'Inesland' } });
            fireEvent.click(submitButton);
        })
        await waitFor(() => {
            history.push('/zoo');
        });
    });

    it('shows an error for invalid input', async () => {
        render(<NewZoo />, { wrapper: MemoryRouter });

        const zooNameInput = screen.getByPlaceholderText('Zoo name...');
        const submitButton = screen.getByText('New Zoo');

        act(() => {
            fireEvent.change(zooNameInput, { target: { value: 'InesLand?!' } });
            fireEvent.click(submitButton);
        });
        await waitFor(() => {
            expect(toast.warning('Only letters and numbers allowed'));
        });
    });
});