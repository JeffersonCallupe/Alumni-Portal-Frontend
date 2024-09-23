import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginInstitucional from '../src/app/login/LoginInstitucional'
import LoginSUM from '../src/app/login/LoginSUM'
import ValidacionSUM from './app/registro/validacionSUM'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginInstitucional />} />
        <Route path="/loginSUM" element={<LoginSUM />} />
        <Route path="/validacionSUM" element={<ValidacionSUM />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;