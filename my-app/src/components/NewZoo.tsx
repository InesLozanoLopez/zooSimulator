import './../styles.css';
import { INewZoo } from '../interfaces';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { increasingId } from '../functions';

function NewZoo() {
  const pattern = /^[A-Za-z0-9]+$/;
  const navigate = useNavigate();

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
    navigate('/zoo', { state: {newZoo: newZoo}})
  }

  const generateNewZoo = (zooName: string) => {
    const zoo: INewZoo = {
      zooName: zooName,
      animals: [],
      zooAge: 0
    };

    const typeOfAnimals: string[] = ['giraffe', 'monkey', 'elephant'];
    let numberOfAnimals = 0;

    while (numberOfAnimals < 5) {
      
      for (let i = 0; i < 3; i++) {
        zoo.animals.push({ type: typeOfAnimals[i], health: 100, condition: 'health', id: increasingId()});
      }
      numberOfAnimals++;
    }
    return zoo;

  }

  return (
    <section id='newZoo'>
      <form className='newZoo-form' onClick={formik.handleSubmit}>
        <input
          type='text' id='zooName' placeholder='Zoo name...' value={formik.values.zooName} onChange={formik.handleChange}></input>
        <button type='submit'> New Zoo</button>
      </form>
    </section>
  );
}

export default NewZoo;
