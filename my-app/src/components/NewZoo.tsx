import './../styles.css';
import { INewZoo } from '../interfaces';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function NewZoo() {
  // Pattern to sanitize the input
  const pattern = /^[A-Za-z0-9]+$/;
  const navigate = useNavigate();

  // Handle the form to introduce the new Zoo name

  const formik = useFormik({
    initialValues: {
      zooName: '',
    },

    onSubmit: async (values) => {
      if (!values.zooName) {
        toast.warning('Please, name your zoo')
      }
      else if (!pattern.test(values.zooName)) {
        toast.error('Only letters and number allowed')
      } else {
        handleOpenZoo(values.zooName);
      }
    }
  })

  // Handle the creation of a new Zoo which is trigger on submit and navigate automatically to newZoo component - add zoo values to location

  const handleOpenZoo = (zooName: string) => {
    const newZoo = generateNewZoo(zooName);
    navigate('/zoo', { state: { newZoo: newZoo } })
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
        zoo.animals.push({ type: typeOfAnimals[i], health: 100, condition: 'healthy'});
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
