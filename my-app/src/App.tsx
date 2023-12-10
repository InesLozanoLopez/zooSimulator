import './App.css';
import { INewZoo } from './interfaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';

function Context() {
  const [zoo, SetZoo] = useState<INewZoo>();
  const pattern = /^[A-Za-z0-9]+$/

  const formik = useFormik({
    initialValues: {
      zooName: '',
    },
    validationSchema: Yup.object({
      zooName: Yup.string().required(
        'Please name your Zoo'
      ),
    }),

    onSubmit: async (values) => {
      if (!pattern.test(values.zooName)) {
        toast.warning('Only letters and number allowed')
      } else {
        handleOpenZoo(values.zooName);
      }
    }
  })

  const handleOpenZoo = (zooName: string) => {
    const newZoo = generateNewZoo(zooName);
    SetZoo(newZoo)
  }

  const generateNewZoo = (zooName: string) => {
    const zoo: INewZoo = {
      zooName: zooName,
      animals: []
    };

    const typeOfAnimals: string[] = ['giraffes', 'monkeys', 'elephants'];
    let numberOfAnimals = 5;

    if (numberOfAnimals > 0) {
      for (let i = 0; i < 3; i++) {
        zoo.animals.push({ type: typeOfAnimals[i], health: 100 });
      }
      numberOfAnimals--;
    }
    return zoo;

  }

  return (
    <>
      <form onClick={formik.handleSubmit}>
        <input
          type='text' id='zooName' placeholder='Zoo name...' value={formik.values.zooName} onChange={formik.handleChange}></input>
        <button type='submit'> New Zoo</button>
      </form>
    </>
  );
}

export default Context
