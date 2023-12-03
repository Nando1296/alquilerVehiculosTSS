import React, { Component } from 'react';
import { connect } from 'react-redux';

class Reporte extends Component {
  render() {
    const {
      costoAnual,
      costoOcioso,
      costoNoDisponible,
      numeroDias,
      totalIngresos,
    } = this.props;

    // Calcular valores
    const costoTotalUtilizacion = ((costoAnual / 365) * numeroDias).toFixed(2);
    const totalCostoOcioso = (costoOcioso * numeroDias).toFixed(2);
    const totalCostoNoDisponible = (costoNoDisponible * numeroDias).toFixed(2);
    const totalEgresos = (parseFloat(costoTotalUtilizacion) + parseFloat(totalCostoOcioso) + parseFloat(totalCostoNoDisponible)).toFixed(2);
    const gananciaNeta = (totalIngresos - parseFloat(totalEgresos)).toFixed(2);


    return (
      <div>
        <h1>Informe de Simulación</h1>
        <h3>Renta Total: {totalIngresos} Bs.</h3>
        <h3>Costo total de utilización de coches: {costoTotalUtilizacion} Bs.</h3>
        <h3>Costo total carro ocioso: {totalCostoOcioso} Bs.</h3>
        <h3>Costo total no disponible: {totalCostoNoDisponible} Bs.</h3>
        <h2>Total Egresos: {totalEgresos} Bs.</h2>
        <h2>Ganancia neta: {gananciaNeta} Bs.</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    costoAnual: state.datosFormulario.costoAnual,
    costoOcioso: state.datosFormulario.costoOcioso,
    costoNoDisponible: state.datosFormulario.costoNoDisponible,
    numeroDias: state.numeroDias,
    totalIngresos: state.totalIngresos,
    totalCostoOcioso: state.totalCostoOcioso,
    totalCostoNoDisponible: state.totalCostoNoDisponible,
  };
};

export default connect(mapStateToProps)(Reporte);
