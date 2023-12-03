import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../assets/stylestabla.css';
import { Link } from 'react-router-dom';
import './simular.css';

class Simular extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numeroDias: 5,
            simulacionData: [],
        };
    }

    handleNumeroDiasChange = (e) => {
        const nuevoNumeroDias = parseInt(e.target.value, 10);
        if (!isNaN(nuevoNumeroDias)) {
            this.setState({ numeroDias: nuevoNumeroDias });
        }
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

    handlePruebaClick = (e) => {
        e.preventDefault();
        const simulacionData = this.generateSimulacionData();
        console.log('Datos de simulación generados:', simulacionData);
    };

    generateSimulacionData = () => {
        let simulacionData = [];

        const costoVehiculoSeleccionado = this.props.vehiculoSeleccionado.costo;
        const autosRentadosPorDia = this.props.autosRentadosPorDia;
        const frecuenciaAutos = this.props.frecuenciaAutos;
        const frecuenciaDias = this.props.frecuenciaDias;
        const costoOcioso = this.props.datosFormulario.costoOcioso;
        let totalDisponible = autosRentadosPorDia;
        let disponible = true;

        for (let dia = 1; dia <= this.state.numeroDias; dia++){

            const valorAleatorioAutos = this.generarValorAleatorio();
            const vehiculosARentar = this.calcularVehiculosARentar(valorAleatorioAutos, frecuenciaAutos);
            const costoNoDisponible = this.calcularCostoNoDisponible(totalDisponible, vehiculosARentar);
            const costoOcioso = this.calcularCostoOcioso(totalDisponible, vehiculosARentar);
            
            let filaDia = {
                dia,
                valorAleatorioAutos,
                vehiculosARentar,
                totalDisponible,
                costoNoDisponible,
                costoOcioso,
            }

            let filaVehiculosArray= [];
            

            for (let nVehiculo = 1; nVehiculo <= autosRentadosPorDia; nVehiculo++){
                let vehiculo = {};
                const valorAleatorioDias = this.generarValorAleatorio();
                const diasARentarPorVehiculos = this.calcularDiasARentar(valorAleatorioDias, frecuenciaDias);
                const ingreso = this.calcularIngreso(costoVehiculoSeleccionado, diasARentarPorVehiculos);
                
                
                vehiculo = {
                    nVehiculo,
                    disponible: diasARentarPorVehiculos === 0,
                    valorAleatorioDias,
                    diasARentarPorVehiculos,
                    ingreso,
                    diasNoDisponible: diasARentarPorVehiculos,
                };
                
                filaVehiculosArray.push(vehiculo);
                //console.log(filaVehiculosArray);
            }

            filaVehiculosArray.forEach(vehiculo => {
                if(!vehiculo.disponible){
                    vehiculo.diasNoDisponible -= 1;
                    if (vehiculo.diasNoDisponible === 0 ){
                        vehiculo.disponible = true;
                    }
                }
            });

            totalDisponible = this.calcularTotalDisponible(filaVehiculosArray);

            simulacionData.push({
                ...filaDia,
                filaVehiculosArray,
            });

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

    calcularTotalDisponible(filaVehiculosArray){
        const totalDisponible = filaVehiculosArray.filter(vehiculo => vehiculo.disponible).length;
        return totalDisponible;
    }

    calcularCostoOcioso(totalDisponible, vehiculosARentar){
        const costoOcioso = this.props.datosFormulario.costoOcioso;
        const cantidadOciosos = totalDisponible - vehiculosARentar;
        
        if(cantidadOciosos > 0){
            return cantidadOciosos * costoOcioso;
        }else{
            return 0;
        }
    }

    calcularCostoNoDisponible(totalDisponible, vehiculosARentar){
        const costoNoDisponible = this.props.costoNoDisponible;
        //console.log('costoNoDisponible por dia:' , costoNoDisponible);
        const cantidadNoDisponibles = vehiculosARentar - totalDisponible;
        //console.log('costoNoDisponible por cantidad:' , cantidadNoDisponibles);

        if((cantidadNoDisponibles) > 0){
            return costoNoDisponible * cantidadNoDisponibles;
        }

        return 0;
    }

    calcularIngreso(costoVehiculoSeleccionado, diasARentarPorVehiculos){
        return costoVehiculoSeleccionado * diasARentarPorVehiculos;
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
                            <div key={index}>
                            <h3>Día {fila.dia}</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Vehículo</th>
                                        <th>Valor Aleatorio Días</th>
                                        <th>Días a Rentar</th>
                                        <th>Disponible</th>
                                        <th>Días No Disponible</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fila.filaVehiculosArray.map((vehiculo, vIndex) => (
                                        <tr key={vIndex}>
                                            <td>{vehiculo.nVehiculo}</td>
                                            <td>{vehiculo.valorAleatorioDias}</td>
                                            <td>{vehiculo.diasARentarPorVehiculos}</td>
                                            <td>{vehiculo.disponible ? 'Sí' : 'No'}</td>
                                            <td>{vehiculo.diasNoDisponible}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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

                  <button onClick={this.handlePruebaClick}>Probar Generación de Datos</button>

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
