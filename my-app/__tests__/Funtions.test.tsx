import { waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { decreaseHealth, increaseAnimalsHealth, updateAnimalsCondition } from '../src/functions';

describe('Zoo functions', () => {
  const giraffe = { type: 'giraffe', health: 50, condition: 'healthy' };
  const monkey = { type: 'monkey', health: 70, condition: 'healthy' };
  const elephant = { type: 'elephant', health: 60, condition: 'ill', elephantPassCondition: 'healthy' };

  it('should decrease health of animals', () => {
    const initialAnimals = [giraffe, monkey, elephant];
    const updatedAnimals = decreaseHealth(initialAnimals);

    expect(updatedAnimals.every(animal => animal.health <= 100 && animal.health >= 0)).toBe(true);
    expect(updatedAnimals.map((animal, index) => animal.health <= initialAnimals[index].health)).toStrictEqual([true, true, true]);
});

  it('should increase health of animals', () => {
    const initialAnimals = [giraffe, monkey, elephant];
    const updatedAnimals = increaseAnimalsHealth(initialAnimals);

    expect(updatedAnimals.every(animal => animal.health <= 100 && animal.health >= 0)).toBe(true);
    expect(updatedAnimals.map((animal, index) => animal.health >= initialAnimals[index].health)).toStrictEqual([true, true, true]);

  });

  it('should update animals\' conditions', () => {
    const initialAnimals = [giraffe, monkey, elephant];
    const updatedAnimals = updateAnimalsCondition(initialAnimals);

    const filteredAnimals = updatedAnimals.filter((animal) => animal !== undefined);
    const conditionsValid = filteredAnimals.every(animal => ['healthy', 'ill', 'death'].includes(animal?.condition || ''));
    expect(conditionsValid).toBe(true);
  });
});


describe('updateAnimalsCondition function', () => {
    it('should mark giraffe as "death" when health is less than 50', async () => {
      const giraffe = { type: 'giraffe', health: 40, condition: 'healthy' };
      const updatedAnimals = updateAnimalsCondition([giraffe]);
  
      expect(updatedAnimals[0]?.condition).toBe('death');
      
      await waitFor(() => {
        expect(toast.error('Oh no, one of your animals passed away'));
    });
    });
  
    it('should mark monkey as "death" when health is less than 30', async () => {
      const monkey = { type: 'monkey', health: 20, condition: 'healthy' };
      const updatedAnimals = updateAnimalsCondition([monkey]);
  
      expect(updatedAnimals[0]?.condition).toBe('death');
      await waitFor(() => {
        expect(toast.error('Oh no, one of your animals passed away'));
    });
    });
  
    it('should mark elephant as "death" when health is less than 70 and previous condition is "ill"', async () => {
      const elephant = { type: 'elephant', health: 60, condition: 'ill', elephantPassCondition: 'ill' };
      const updatedAnimals = updateAnimalsCondition([elephant]);
  
      expect(updatedAnimals[0]?.condition).toBe('death');
      await waitFor(() => {
        expect(toast.error('Oh no, one of your animals passed away'));
    });
    });
  
    it('should mark elephant as "ill" and display a warning toast when health is less than 70 and previous condition is "healthy"', async () => {
      const elephant = { type: 'elephant', health: 60, condition: 'healthy', elephantPassCondition: 'healthy' };
      
      await waitFor(() => {
        toast.warning('Becareful, one of your elephants cannot walk!');
    });
  
      const updatedAnimals = updateAnimalsCondition([elephant]);
  
      expect(updatedAnimals[0]?.condition).toBe('ill');
      await waitFor(() => {
        toast.warning('Becareful, one of your elephants cannot walk!');
    });
    });
  
    it('should not update condition when health is sufficient', () => {
      const giraffe = { type: 'giraffe', health: 70, condition: 'healthy' };
      const updatedAnimals = updateAnimalsCondition([giraffe]);
  
      expect(updatedAnimals[0]?.condition).toBe('healthy');
    });
  
    it('should trigger an error toast when an animal dies', async () => {
      const monkey = { type: 'monkey', health: 10, condition: 'healthy' };
      
      await waitFor(() => {
        expect(toast.error('Oh no, one of your animals passed away'));
    });
      updateAnimalsCondition([monkey]);
  
      await waitFor(() => {
        expect(toast.error('Oh no, one of your animals passed away'));
    });    });
  });