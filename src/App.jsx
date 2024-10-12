import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginInstitucional from "../src/app/login/LoginInstitucional";
import LoginEmpresa from '../src/app/login/LoginEmpresa';
import LoginSUM from "../src/app/login/LoginSUM";
import RegistroSUM from "./app/registro/registroSUM";
import RegistroEmpresa from "./app/registro/registroEmpresa";
import Home from "./app/dashboard/home";
import { UserProvider } from '../src/contexts/userContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginInstitucional />} />
          <Route path="/loginSUM" element={<LoginSUM />} />
          <Route path="/validacionSUM" element={<RegistroSUM />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/loginEmpresa" element={<LoginEmpresa/>} />
          <Route path="/crearCuentaEmpresa" element={<RegistroEmpresa/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
