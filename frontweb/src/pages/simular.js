import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/stylestabla.css';

class Simular extends Component {
  render() {
    const {
      vehiculoSeleccionado,
      diasRentadosPorAuto,
      frecuenciaDias,
      autosRentadosPorDia,
      frecuenciaAutos,
      datosFormulario,
    } = this.props;

    // Asegurémonos de que datosFormulario no sea nulo o indefinido
    const datosFormularioValido = datosFormulario || {};

    // Accedemos a las propiedades de datosFormulario utilizando el operador de encadenamiento opcional (?.)
    const costoAnual = datosFormularioValido.costoAnual;
    const costoOcioso = datosFormularioValido.costoOcioso;
    const costoNoDisponible = datosFormularioValido.costoNoDisponible;

    return (
      <div>
        <h1>Tabla de Simulación</h1>
        <div className="container">
          <table>
            <thead>
              <tr>
                <th colSpan={9} style={{ fontSize: 20 }} className="titulo">
                  Simulación
                </th>
              </tr>
              <tr>
                <th>Vehículo Seleccionado</th>
                <th>Días Rentados por Auto</th>
                <th>Frecuencia Días</th>
                <th>Autos Rentados por Día</th>
                <th>Frecuencia Autos</th>
                <th>Costo Anual</th>
                <th>Costo Ocioso</th>
                <th>Costo No Disponible</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vehiculoSeleccionado ? vehiculoSeleccionado.modelo : 'No seleccionado'}</td>
                <td>{diasRentadosPorAuto}</td>
                <td>{this.renderProbAcumulada(frecuenciaDias)}</td>
                <td>{autosRentadosPorDia}</td>
                <td>{this.renderProbAcumulada(frecuenciaAutos)}</td>
                <td>{costoAnual}</td>
                <td>{costoOcioso}</td>
                <td>{costoNoDisponible}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderProbAcumulada(array) {
    if (array) {
      return array.map((item, index) => (
        <span key={index}>{index > 0 ? ', ' : ''}{item.probAcumulada}</span>
      ));
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    vehiculoSeleccionado: state.vehiculoSeleccionado,
    diasRentadosPorAuto: state.diasRentadosPorAuto,
    frecuenciaDias: state.frecuenciaDias,
    autosRentadosPorDia: state.autosRentadosPorDia,
    frecuenciaAutos: state.frecuenciaAutos,
    datosFormulario: state.datosFormulario,
  };
};

export default connect(mapStateToProps)(Simular);
