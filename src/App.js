import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Navbar';
import Home from './components/Home';
import Asignatura from './components/Asignatura';
import AsignaturaDetalle from './components/AsignaturaDetalle';
import MiSemestre from './components/MiSemestre';



const App = () => {
  return (
    <BrowserRouter>
    <NavbarComponent />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/asignaturas" element={<Asignatura />} />
      <Route path="/currentsemester" element={<MiSemestre />} />
      <Route path="/asignaturas/:nombreAsignatura" element={<AsignaturaDetalle />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
