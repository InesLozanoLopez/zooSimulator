import { INewZoo } from '../interfaces';
import { useLocation } from 'react-router-dom';
import Animals from './Animals';

function Zoo() {
  const location = useLocation();
  const newZoo: INewZoo = location.state?.newZoo;


  return (
<>
<h1>Welcome to {newZoo.zooName}!</h1>
<Animals animals={newZoo.animals}/>
</>
  );
}

export default Zoo;
