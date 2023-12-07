import React from 'react';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
//Components
import Navbar from './components/Navbar'
//pages
import Costos from './pages/costos'
import Renta from './pages/renta'
import Vehiculos from './pages/vehiculos'
import Inicio from './pages/inicio'
import Simular from './pages/simular'
import Reporte from './pages/reporte';
import ResultadosAnteriores from './pages/resultadosAnteriores';
import CompararSimulaciones from './pages/compararSimulaciones';
import DetalleSimulacionAnterior from './pages/detalleSimulacionAnterior';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" exact Component={Inicio}></Route>
      <Route path="/Vehiculos" exact Component={Vehiculos}></Route>
      <Route path="/Costos" exact Component={Costos}></Route>
      <Route path="/Renta" exact Component={Renta}></Route>
      <Route path="/Simular" exact Component={Simular}></Route>
      <Route path="/Reporte" exact Component={Reporte}></Route>
      <Route path="/ResultadosAnteriores" exact Component={ResultadosAnteriores}></Route>
      <Route path="/CompararSimulaciones/:ids" exact Component={CompararSimulaciones}></Route>
      <Route path="ResultadoAnterior/:id" exact Component={DetalleSimulacionAnterior}></Route>
      </Routes>
    </Router>
  );
}

export default App;
