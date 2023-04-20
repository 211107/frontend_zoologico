import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usuarios from './components/Usuarios.js';
import './styles/App.css';
import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <Usuarios />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}



export default App;
