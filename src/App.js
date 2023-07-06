import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Navbar';
import Home from './components/Home';
import Asignatura from './components/Asignatura';
import AsignaturaDetalle from './components/AsignaturaDetalle';
import MiSemestre from './components/MiSemestre';
import UserContext from './components/UserContext';
//importamos todas las referencias que necesitamos para levantar adecuadamente la aplicación
const App = () => {
  const [username, setUsername] = useState(''); // Definir el estado de usuario

  return (
    <UserContext.Provider value={{ username, setUsername }}> {/* Pasar el estado de usuario como valor */}
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asignaturas" element={<Asignatura />} />
          <Route path="/currentsemester" element={<MiSemestre />} />
          <Route path="/asignaturas/:nombreAsignatura" element={<AsignaturaDetalle />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;