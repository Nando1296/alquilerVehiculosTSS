import React, { Component } from 'react';
import './renta.css';
import store from './store';
import { Link } from 'react-router-dom';
import '../assets/stylestabla.css';

export default class Renta extends Component {
constructor(props) {
    super(props);
    this.state = {
    diasRentadosPorAuto: 4,
    autosRentadosPorDia: 4,
    maxDias: 7,
    maxAutos: 10,
    frecuenciaDias: [
        { dias: 1, probabilidad: 0.4, probAcumulada: 0.4 },
        { dias: 2, probabilidad: 0.35, probAcumulada: 0.75 },
        { dias: 3, probabilidad: 0.15, probAcumulada: 0.9 },
        { dias: 4, probabilidad: 0.1, probAcumulada: 1 },
    ],
    frecuenciaAutos: [
        {autos: 0, probabilidad: 0.1, probAcumulada: 0.1 },
        {autos: 1, probabilidad: 0.1, probAcumulada: 0.2 },
        {autos: 2, probabilidad: 0.25, probAcumulada: 0.45 },
        {autos: 3, probabilidad: 0.3, probAcumulada: 0.75 },
        {autos: 4, probabilidad: 0.25, probAcumulada: 1 },
    ]
    };
}

handleDiasRentadosChange = (e) => {
    const selectedDias = parseInt(e.target.value, 10) || 1;
    
    const nuevaFrecuenciaDias = Array.from({ length: selectedDias }, (_, index) => {
        const prob = 1 / selectedDias;
        const probAcumuladaDias = (index + 1) * prob;
        return { dias: index + 1, probabilidad: prob, probAcumulada: probAcumuladaDias };
});

this.setState({
    diasRentadosPorAuto: selectedDias,
    frecuenciaDias: nuevaFrecuenciaDias,
    });
};

handleAutosRentadosChange = (e) => {
  const selectedAutos = parseInt(e.target.value, 10) || 1;

  const nuevaFrecuenciaAutos = Array.from({ length: selectedAutos + 1 }, (_, index) => {
    const prob = 1 / (selectedAutos + 1); 
    const probAcumuladaAutos = (index + 1) * prob;
    return { autos: index, probabilidad: prob, probAcumulada: probAcumuladaAutos };
  });

  
  nuevaFrecuenciaAutos.forEach((item) => {
    item.probAcumulada = Math.round(item.probAcumulada * 1000) / 1000;
  });

    this.setState({
      autosRentadosPorDia: selectedAutos,
      frecuenciaAutos: nuevaFrecuenciaAutos,
    });
};

storeDiasAutos = () => {

  const{diasRentadosPorAuto, frecuenciaDias, autosRentadosPorDia, frecuenciaAutos} = this.state;

  store.dispatch({
    type: 'GUARDAR_DIAS_POR_AUTO',
    payload: {
      diasRentadosPorAuto,
      frecuenciaDias,
    }
  });

  store.dispatch({
    type: 'GUARDAR_AUTOS_POR_DIA',
    payload: {
      autosRentadosPorDia,
      frecuenciaAutos,
    }
  });
}

render() {
    const opcionesNumerosDias = Array.from({ length: this.state.maxDias }, (_, index) => index + 1);
    const opcionesNumerosAutos = Array.from({ length: this.state.maxAutos}, (_, index) => index + 1);


    return (
      <div>
        <div className="table-container" id="renta">
          <br></br>
          <table>
            <thead>
              <tr>
                <th>N° de dias Rentados por auto</th>
                <th>
                  <select
                    value={this.state.diasRentadosPorAuto}
                    onChange={this.handleDiasRentadosChange}
                  >
                    {opcionesNumerosDias.map((numero) => (
                      <option key={numero} value={numero}>
                        {numero}
                      </option>
                    ))}
                  </select>
                </th>
              </tr>
            </thead>
          </table>

          <table>
            <thead>
              <tr>
                <th>N° de días rentados por auto</th>
                <th>Probabilidad</th>
                <th>Probabilidad Acumulada</th>
              </tr>
            </thead>
            <tbody>
              {this.state.frecuenciaDias.map((item) => (
                <tr key={item.dias}>
                  <td>{item.dias}</td>
                  <td>{item.probabilidad.toFixed(2)}</td>
                  <td>{item.probAcumulada.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
        </div>

        <div className="table-container" id="renta">
          <br></br>
          <table>
            <thead>
              <tr>
                <th>N° de autos Rentados por día</th>
                <th>
                  <select
                    value={this.state.autosRentadosPorDia}
                    onChange={this.handleAutosRentadosChange}
                  >
                    {opcionesNumerosAutos.map((numero) => (
                      <option key={numero} value={numero}>
                        {numero}
                      </option>
                    ))}
                  </select>
                </th>
              </tr>
            </thead>
          </table>

          <table>
            <thead>
              <tr>
                <th>N° de autos rentados por día</th>
                <th>Probabilidad</th>
                <th>Probabilidad Acumulada</th>
              </tr>
            </thead>
            <tbody>
              {this.state.frecuenciaAutos.map((item) => (
                <tr key={item.autos}>
                  <td>{item.autos}</td>
                  <td>{item.probabilidad.toFixed(2)}</td>
                  <td>{item.probAcumulada.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
        </div>

        <div className="ml-auto">
        <Link to="/Costos">
          <button
            id="btn3"
            className="btn3 btn-primary"
            type=""
            onClick={this.storeDiasAutos}
          >
            Siguiente
          </button>
        </Link>
      </div>
      </div>
    );
  }
}