import React, { Component } from 'react';
import { connect } from 'react-redux';
import {saveSimulacion} from '../indexDB/indexDB';
import { Link } from 'react-router-dom';
import './reporte.css';

class Reporte extends Component {

  state = {
    simulacionGuardada: false,
  };

  handleGuardarSimulación = () => {
    if(!this.state.simulacionGuardada){
      const {
        vehiculoSeleccionado,
        autosRentadosPorDia,
        diasRentadosPorAuto,
        frecuenciaDias,
        frecuenciaAutos,
        costoAnual,
        costoOcioso,
        costoNoDisponible,
        numeroDias,
        simulacionData,
        totalIngresos,
        totalCostoOcioso,
        totalCostoNoDisponible,
        
      } = this.props;
  
      // Calcular valores
      const costoTotalUtilizacion = ((costoAnual / 365) * numeroDias * autosRentadosPorDia );
      const totalEgresos = (parseFloat(costoTotalUtilizacion) + parseFloat(totalCostoOcioso) + parseFloat(totalCostoNoDisponible));
      const gananciaNeta = (totalIngresos - parseFloat(totalEgresos));
      //const {marca, modelo, tipo, costo} = vehiculoSeleccionado;
  
      saveSimulacion({
        vehiculoSeleccionado,
        autosRentadosPorDia,
        diasRentadosPorAuto,
        frecuenciaDias,
        frecuenciaAutos,
        costoAnual,
        costoOcioso,
        costoNoDisponible,
        numeroDias,
        simulacionData,
        totalIngresos,
        totalCostoOcioso,
        totalCostoNoDisponible,
        costoTotalUtilizacion,
        totalEgresos,
        gananciaNeta,
      });

      this.setState({simulacionGuardada: true });
    }
  };

  componentWillUnmount() {
    this.setState({ simulacionGuardada: false });
  }

  render() {

    return (
      <div className='reporte'>
        <h1>Informe de Simulación</h1>
        <h2>Datos del vehiculo:</h2>
        <h3>Marca: {this.props.vehiculoSeleccionado.marca} </h3>
        <h3>Modelo: {this.props.vehiculoSeleccionado.modelo} </h3>
        <h3>Tipo: {this.props.vehiculoSeleccionado.tipo} </h3>
        <h3>Costo: {this.props.vehiculoSeleccionado.costo} Bs.</h3>
        <h3>Renta Total: {this.props.totalIngresos} Bs.</h3>
        <h3>Costo total de utilización de coches: {this.props.costoTotalUtilizacion} Bs.</h3>
        <h3>Costo total carro ocioso: {this.props.totalCostoOcioso} Bs.</h3>
        <h3>Costo total no disponible: {this.props.totalCostoNoDisponible} Bs.</h3>
        <h2>Total Egresos: {this.props.totalEgresos} Bs.</h2>
        <h2>Ganancia neta: {this.props.gananciaNeta} Bs.</h2>
        
        <h3>Se generan unos ingresos brutos de {this.props.totalIngresos} Bs. en un periodo de {this.props.numeroDias} días.</h3>
        <h3>Se genera un gasto de {this.props.totalEgresos}.</h3>
        <h3>Se genera una ganancia de {this.props.gananciaNeta}.</h3>

        <div className="ml-auto">
            <Link to="/ResultadosAnteriores">
              <button id="btn6" 
              className="btn6 btn-primary" 
              type=""
              onClick={this.handleGuardarSimulación}
              disabled={this.state.simulacionGuardada}
              >
                Guardar Simulación
              </button>
            </Link>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  console.log('estado de props:  ', state )
  return {
    //Vehiculos
    vehiculoSeleccionado: state.vehiculoSeleccionado,

    //renta
    //dias
    diasRentadosPorAuto: state.diasRentadosPorAuto,
    frecuenciaDias: state.frecuenciaDias,
    //autos
    autosRentadosPorDia: state.autosRentadosPorDia,
    frecuenciaAutos: state.frecuenciaAutos,

    //costos
    costoAnual: state.datosFormulario.costoAnual,
    costoOcioso: state.datosFormulario.costoOcioso,
    costoNoDisponible: state.datosFormulario.costoNoDisponible,

    //simular
    numeroDias: state.numeroDias,
    simulacionData: state.simulacionData,
    totalIngresos: state.totalIngresos,
    totalCostoOcioso: state.totalCostoOcioso,
    totalCostoNoDisponible: state.totalCostoNoDisponible,
  };
};

export default connect(mapStateToProps)(Reporte);