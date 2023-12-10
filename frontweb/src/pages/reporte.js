import React, { Component } from "react";
import { connect } from "react-redux";
import { saveSimulacion } from "../indexDB/indexDB";
import { Link } from "react-router-dom";
import "./reporte.css";

class Reporte extends Component {
  state = {
    simulacionGuardada: false,
  };

  handleGuardarSimulación = () => {
    if (!this.state.simulacionGuardada) {
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
      const costoTotalUtilizacion =
        (costoAnual / 365) * numeroDias * autosRentadosPorDia;
      const totalEgresos =
        parseFloat(costoTotalUtilizacion) +
        parseFloat(totalCostoOcioso) +
        parseFloat(totalCostoNoDisponible);
      const gananciaNeta = totalIngresos - parseFloat(totalEgresos);
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

      this.setState({ simulacionGuardada: true });
    }
  };

  componentWillUnmount() {
    this.setState({ simulacionGuardada: false });
  }

  render() {
    const {
      vehiculoSeleccionado,
      costoAnual,
      autosRentadosPorDia,
      totalIngresos,
      totalCostoOcioso,
      totalCostoNoDisponible,
      numeroDias,
    } = this.props;

    const costoTotalUtilizacion =
      (costoAnual / 365) * numeroDias * autosRentadosPorDia;
    const totalEgresos =
      parseFloat(costoTotalUtilizacion) +
      parseFloat(totalCostoOcioso) +
      parseFloat(totalCostoNoDisponible);
    const gananciaNeta = totalIngresos - parseFloat(totalEgresos);

    if (!vehiculoSeleccionado) {
      return (
        <div className="reporte">
          <h1>Reporte de Simulación</h1>
          <h3>No se ha seleccionado ningún vehiculo.</h3>
        </div>
      );
    }

    const renderVehiculoSeleccionado = () => {
      const { vehiculoSeleccionado } = this.props;

      if (!vehiculoSeleccionado) {
        return null;
      }

      return (
        <div className={`card simular`}>
          <img
            src={vehiculoSeleccionado.foto}
            alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`}
            className="foto-vehiculo"
          />

          <div className="textos">
            <h3>Datos del vehículo</h3>
            <h5>Marca: {vehiculoSeleccionado.marca}</h5>
            <h5>Modelo: {vehiculoSeleccionado.modelo}</h5>
            <h5>Tipo: {vehiculoSeleccionado.tipo}</h5>
            <h5>Costo: {vehiculoSeleccionado.costo} Bs.</h5>
          </div>
        </div>
      );
    };

    return (
      <div className="reporte">
        <h1>Reporte de Simulación</h1>
        {renderVehiculoSeleccionado()}
        <div className="reporte-1">
          <h3 className="title">Renta Total: {this.props.totalIngresos} Bs.</h3>
          <h3 className="title">
            Costo total de utilización de coches: {costoTotalUtilizacion} Bs.
          </h3>
          <h3 className="title">
            Costo total carro ocioso: {this.props.totalCostoOcioso} Bs.
          </h3>
          <h3 className="title">
            Costo total no disponible: {this.props.totalCostoNoDisponible} Bs.
          </h3>
          <h2 className="title">Total Egresos: {totalEgresos} Bs.</h2>
          <h2 className="title">Ganancia neta: {gananciaNeta} Bs.</h2>

          <h3 className="title">
            Se generan unos ingresos brutos de {this.props.totalIngresos} Bs. en
            un periodo de {this.props.numeroDias} días.
          </h3>
          <h3 className="title">Se genera un gasto de {totalEgresos} Bs.</h3>
          <h3 className="title">
            Se genera una ganancia de {gananciaNeta} Bs.
          </h3>
        </div>
        <div className="ml-auto">
          <Link to="/ResultadosAnteriores">
            <button
              id="btn6"
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
  console.log("estado de props:  ", state);
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
