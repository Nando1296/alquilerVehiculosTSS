import React, { Component } from 'react';
import { connect } from 'react-redux';

class CompararSimulaciones extends Component {
  render() {
    const { simulacionesSeleccionadas, simulaciones } = this.props;

    // Filtra las simulaciones seleccionadas
    console.log(simulacionesSeleccionadas, simulaciones)
    const simulacionesFiltradas = simulaciones.filter(simulacion =>
      simulacionesSeleccionadas.includes(simulacion.id)
    );

    
    return (
      <div>
        <h1>Comparación de Simulaciones</h1>
        {simulacionesFiltradas.map(simulacion => (
          <div key={simulacion.id}>
            <h2>Simulación ID: {simulacion.id}</h2>
            <pre>{JSON.stringify(simulacion, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    simulacionesSeleccionadas: state.simulacionesSeleccionadas,
    simulaciones: state.simulaciones,
  };
};

export default connect(mapStateToProps)(CompararSimulaciones);
