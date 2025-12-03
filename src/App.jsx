import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import ActividadesRegistradas from "./app/dashboard/actividadesRegistradas";
import ActividadesHistorico from "./app/dashboard/actividadesHistorico";
import Actividades from "./app/dashboard/actividades";
import Configuraciones from "./app/profile/configuraciones";
import Home from "./app/dashboard/home";
import LoginInstitucional from "./app/login/loginInstitucional";
import LoginEmpresa from './app/login/loginEmpresa';
import LoginSUM from "./app/login/loginSUM";
import OfertasLaborales from "./app/dashboard/ofertasLaborales";
import OfertasAplicadas from "./app/dashboard/ofertasAplicadas";
import OfertasHistorico from "./app/dashboard/ofertasHistorico";
import ProfileEmpresa from "./app/profile/profileEmpresa"
import ProfileInstitucional from "./app/profile/profileInstitucional";
import RegistroSUM from "./app/registro/registroSUM";
import RegistroEmpresa from "./app/registro/registroEmpresa";
=======
import ActividadesRegistradas from "./app/dashboard/ActividadesRegistradas";
import ActividadesHistorico from "./app/dashboard/ActividadesHistorico";
import Actividades from "./app/dashboard/Actividades";
import Configuraciones from "./app/profile/Configuraciones";
import Home from "./app/dashboard/Home";
import LoginInstitucional from "../src/app/login/LoginInstitucional";
import LoginEmpresa from '../src/app/login/LoginEmpresa';
import LoginSUM from "../src/app/login/LoginSUM";
import OfertasLaborales from "./app/dashboard/OfertasLaborales";
import OfertasAplicadas from "./app/dashboard/OfertasAplicadas";
import OfertasHistorico from "./app/dashboard/OfertasHistorico";
import ProfileEmpresa from "./app/profile/ProfileEmpresa"
import ProfileInstitucional from "./app/profile/ProfileInstitucional"
import RegistroSUM from "./app/registro/RegistroSUM";
import RegistroEmpresa from "./app/registro/RegistroEmpresa";
>>>>>>> origin/main
import { UserProvider } from "./contexts/userContext";
import { AlertProvider } from "./contexts/alertContext";

function App() {
  return (
    <AlertProvider>
      <UserProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<LoginInstitucional />} /> 
            <Route path="/loginEmpresa" element={<LoginEmpresa/>} />
            <Route path="/loginSUM" element={<LoginSUM />} />
            <Route path="/validacionSUM" element={<RegistroSUM />} />
            <Route path="/crearCuentaEmpresa" element={<RegistroEmpresa/>} />
            <Route path="/profile" element={<ProfileEmpresa />} />
            <Route path="/profileInstitucional" element={<ProfileInstitucional />} />
            <Route path="/home" element={<Home />} />
<<<<<<< HEAD
            <Route path="/Actividades" element={<Actividades />} />
            <Route path="/ActividadesRegistradas" element={<ActividadesRegistradas />} />
            <Route path="/ActividadesHistorico" element={<ActividadesHistorico />} />
            <Route path="/AfertasLaborales" element={<OfertasLaborales />} />
            <Route path="/OfertasAplicadas" element={<OfertasAplicadas />} />
            <Route path="/OfertasHistorico" element={<OfertasHistorico />} />
            <Route path="/Configuraciones" element={<Configuraciones />} />
=======
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/actividadesRegistradas" element={<ActividadesRegistradas />} />
            <Route path="/actividadesHistorico" element={<ActividadesHistorico />} />
            <Route path="/ofertasLaborales" element={<OfertasLaborales />} />
            <Route path="/ofertasAplicadas" element={<OfertasAplicadas />} />
            <Route path="/ofertasHistorico" element={<OfertasHistorico />} />
            <Route path="/configuraciones" element={<Configuraciones />} />
>>>>>>> origin/main
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AlertProvider>
  );
}

export default App;
