import { ToastContainer } from 'react-toastify';
import AppRouter from './router';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" theme="colored" />
    </>
  );
}

export default App;
