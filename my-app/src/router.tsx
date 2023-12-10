import { Route, Routes } from 'react-router-dom';
import NewZoo from './components/newZoo';
import Zoo from './components/Zoo';

const AppRouter = () => {

    return (
        <Routes>
            <Route path='/' element={<NewZoo />} />
            <Route path='/zoo' element={<Zoo />} />
        </Routes>
    )
}

export default AppRouter;