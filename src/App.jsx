import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginInstitucional from "../src/app/login/LoginInstitucional";
import LoginSUM from "../src/app/login/LoginSUM";
import RegistroSUM from "./app/registro/registroSUM";
import Home from "./app/dashboard/home";
import ProfileEmpresa from "./app/profile/profileEmpresa";
import ProfileInstitucional from "./app/profile/profileInstitucional";
import { UserProvider } from "./contexts/userContextInstitucional";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginInstitucional />} />
          <Route path="/loginSUM" element={<LoginSUM />} />
          <Route path="/validacionSUM" element={<RegistroSUM />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<ProfileEmpresa />} />
          <Route path="/profileInstitucional" element={<ProfileInstitucional />} /> 
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
