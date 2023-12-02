import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../assets/stylestabla.css';
import { Link } from 'react-router-dom';
import './simular.css';

class Simular extends Component {

    state = {
        numeroDias: 365,
        simulacionData: [],
    }

    handleNumeroDiasChange = (e) => {
        this.setState({ numeroDias: parseInt(e.target.value, 10) });
    };

    handleSimularClick = (e) => {
        e.preventDefault();

        if (!this.props.frecuenciaDias || !this.props.frecuenciaAutos) {
            console.error('Error: Frecuencias no disponibles en props.');
            return;
        }

        let simulacionData = this.generateSimulacionData();
        this.setState({ simulacionData });
    
    };

    generateSimulacionData = () => {
        let simulacionData = [];

        const costoVehiculoSeleccionado = this.props.vehiculoSeleccionado.costo;
        const autosRentadosPorDia = this.props.autosRentadosPorDia;
        const frecuenciaAutos = this.props.frecuenciaAutos;
        const frecuenciaDias = this.props.frecuenciaDias;
        const costoOcioso = this.props.datosFormulario.costoOcioso;
        let totalDisponible = autosRentadosPorDia;

        for (let dia = 1; dia <= this.state.numeroDias; dia++){

            const valorAleatorioAutos = this.generarValorAleatorio();
            const vehiculosARentar = this.calcularVehiculosARentar(valorAleatorioAutos, frecuenciaAutos);
            
            let { totalDisponible, costoNoDisponible } = this.calcularTotalDisponible(vehiculosARentar);
            let filaDia = {
                dia,
                valorAleatorioAutos,
                vehiculosARentar,
                totalDisponible,
                costoNoDisponible,
            }

            let filaVehiculosArray= [];

            for (let nVehiculo = 1; nVehiculo <= autosRentadosPorDia; nVehiculo++){
                const vehiculoRentado = nVehiculo <= vehiculosARentar;
                //disponible
                const valorAleatorioDias = this.generarValorAleatorio();
                const diasARentarPorVehiculos = this.calcularDiasARentar(valorAleatorioDias, frecuenciaDias);

                const filaVehiculos = {
                    nVehiculo,
                    //disponible,
                    valorAleatorioDias,
                    diasARentarPorVehiculos,
                    //ingreso,
                    costoOcioso,
                    //diasNoDisponible,
                }
                
                filaVehiculosArray.push(filaVehiculos);
            }

            simulacionData.push({
                ...filaDia,
                filaVehiculosArray,
            });

            totalDisponible = this.calcularTotalDisponible(vehiculosARentar);
        }

        return simulacionData;
    };

    generarValorAleatorio(){
        return Math.random();
    }

    calcularVehiculosARentar(valorAleatorioAutos, frecuenciaAutos){
        for(let i = 0; i < frecuenciaAutos.length; i++){
            if (valorAleatorioAutos <= frecuenciaAutos[i].probAcumulada){
                return frecuenciaAutos[i].autos;
            }
        }
    }

    calcularTotalDisponible(vehiculosARentar){
        const totalAutos = this.props.autosRentadosPorDia;
        const totalDisponible = totalAutos - vehiculosARentar;

        if(totalDisponible < 0) {
            const costoNoDisponible = this.props.datosFormulario.costoNoDisponible;
            return {totalDisponible: 0, costoNoDisponible: costoNoDisponible * Math.abs(totalDisponible)};
        }

        return {totalDisponible, costoNoDisponible: 0};
    }

    calcularDiasARentar = (valorAleatorioDias, frecuenciaDias) => {
        for(let i = 0; i < frecuenciaDias.length; i++){
            if(valorAleatorioDias <= frecuenciaDias[i].probAcumulada){
                return frecuenciaDias[i].dias;
            }
        }
    }

    renderSimulacionData(simulacionData) {
        return (
            <div>
                <h2>Resultados de la Simulación</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Día</th>
                            <th>Valor Aleatorio Autos</th>
                            <th>Vehículos a Rentar</th>
                            <th>Total Disponible</th>
                            <th>Costo No Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {simulacionData.map((fila, index) => (
                            <tr key={index}>
                                <td>{fila.dia}</td>
                                <td>{fila.valorAleatorioAutos}</td>
                                <td>{fila.vehiculosARentar}</td>
                                <td>{fila.totalDisponible}</td>
                                <td>{fila.costoNoDisponible}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        
        const {
        vehiculoSeleccionado,
        diasRentadosPorAuto,
        frecuenciaDias,
        autosRentadosPorDia,
        frecuenciaAutos,
        datosFormulario,
        } = this.props;

        const datosFormularioValido = datosFormulario || {};

        const costoAnual = datosFormularioValido.costoAnual;
        const costoOcioso = datosFormularioValido.costoOcioso;
        const costoNoDisponible = datosFormularioValido.costoNoDisponible;

        return (
            <form onSubmit={this.handleSimularClick}>
            <div>
              <div className="form-group">
                <label htmlFor="numeroDias">Número de días a Simular</label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    name="numeroDias"
                    id="numeroDias"
                    value={this.state.numeroDias}
                    onChange={this.handleNumeroDiasChange}
                  />
                </div>
              </div>
      
              <div className="ml-auto">
                <button
                  id="btnS"
                  className="btnS btn-primary"
                  type="submit"
                >
                  Simular
                </button>
              </div>
      
              <div className="ml-auto">
                <Link to="/Reporte">
                  <button
                    id="btnR"
                    className="btnR btn-primary"
                    type=""
                  >
                    Siguiente
                  </button>
                </Link>
              </div>
            </div>
          </form>
        );
    }

    }

    const mapStateToProps = (state) => {

        const datosFormulario = state.datosFormulario || {};
        const frecuenciaDias = state.frecuenciaDias || [
            { dias: 1, probabilidad: 0, probAcumulada: 0 },
        ];
        const frecuenciaAutos = state.frecuenciaAutos || [
            { autos: 0, probabilidad: 0, probAcumulada: 0 },
        ];

    return {
        vehiculoSeleccionado: state.vehiculoSeleccionado,
        diasRentadosPorAuto: state.diasRentadosPorAuto,
        frecuenciaDias: state.frecuenciaDias,
        autosRentadosPorDia: state.autosRentadosPorDia,
        frecuenciaAutos: state.frecuenciaAutos,
        datosFormulario: state.datosFormulario,
        costoOcioso: parseInt(state.datosFormulario.costoOcioso),
        costoAnual: parseInt(state.datosFormulario.costoAnual),
        costoNoDisponible: parseInt(state.datosFormulario.costoNoDisponible),
    };
};

    export default connect(mapStateToProps)(Simular);
