import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginInstitucional from '../src/app/login/LoginInstitucional'
import LoginSUM from '../src/app/login/LoginSUM'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginInstitucional />} />
        <Route path="/loginSUM" element={<LoginSUM />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;