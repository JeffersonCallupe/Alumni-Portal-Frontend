import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ActividadesRegistradas from "./app/dashboard/actividadesRegistradas";
import ActividadesHistorico from "./app/dashboard/actividadesHistorico";
import Actividades from "./app/dashboard/actividades";
import Configuraciones from "./app/profile/settings";
import Home from "./app/dashboard/home";
import LoginInstitucional from "../src/app/login/LoginInstitucional";
import LoginEmpresa from '../src/app/login/LoginEmpresa';
import LoginSUM from "../src/app/login/LoginSUM";
import OfertasLaborales from "./app/dashboard/ofertasLaborales";
import OfertasAplicadas from "./app/dashboard/ofertasAplicadas";
import OfertasHistorico from "./app/dashboard/ofertasHistorico";
import ProfileEmpresa from "./app/profile/profileEmpresa"
import ProfileInstitucional from "./app/profile/profileInstitucional"
import RegistroSUM from "./app/registro/registroSUM";
import RegistroEmpresa from "./app/registro/registroEmpresa";
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
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/actividadesRegistradas" element={<ActividadesRegistradas />} />
            <Route path="/actividadesHistorico" element={<ActividadesHistorico />} />
            <Route path="/ofertasLaborales" element={<OfertasLaborales />} />
            <Route path="/ofertasAplicadas" element={<OfertasAplicadas />} />
            <Route path="/ofertasHistorico" element={<OfertasHistorico />} />
            <Route path="/settings" element={<Configuraciones />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AlertProvider>
  );
}

export default App;
