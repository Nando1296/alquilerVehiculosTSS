import React, { Component } from 'react';
import { connect } from 'react-redux';
//import '../assets/stylestabla.css';
import { Link } from 'react-router-dom';
import './simular.css';
import store from './store';

class Simular extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numeroDias: 365,
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

    generateSimulacionData = () => {
        let simulacionData = [];
        let totalIngresos = 0;
        let totalCostoOcioso = 0;
        let totalCostoNoDisponible = 0;

        const costoVehiculoSeleccionado = this.props.vehiculoSeleccionado.costo;
        const autosRentadosPorDia = this.props.autosRentadosPorDia;
        const frecuenciaAutos = this.props.frecuenciaAutos;
        const frecuenciaDias = this.props.frecuenciaDias;
        let totalDisponible = autosRentadosPorDia;
        
        for (let dia = 1; dia <= this.state.numeroDias; dia++){

            const valorAleatorioAutos = this.generarValorAleatorio();
            const vehiculosARentar = this.calcularVehiculosARentar(valorAleatorioAutos, frecuenciaAutos);
            const costoNoDisponible = this.calcularCostoNoDisponible(totalDisponible, vehiculosARentar);
            const costoOcioso = this.calcularCostoOcioso(totalDisponible, vehiculosARentar);
            
            totalCostoOcioso += costoOcioso;
            totalCostoNoDisponible += costoNoDisponible;

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
                
                totalIngresos += ingreso;
                
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
        console.log('costo total ingresos:  ', totalIngresos);
        console.log('costo total de carros ociosos:  ', totalCostoOcioso);
        console.log('costo total no disponibles:  ', totalCostoNoDisponible);

        store.dispatch({
        type: 'SET_SIMULACION_DATA',
        payload: {
            totalIngresos,
            totalCostoOcioso,
            totalCostoNoDisponible,
            numeroDias: this.state.numeroDias,
            simulacionData,
        },
    });
    console.log(simulacionData);
      //console.log("Estado del store después de despachar la simulacion:", store.getState());
        return simulacionData;
        
    };

    generarValorAleatorio() {
        const valorAleatorio = Math.random();
        return parseFloat(valorAleatorio.toFixed(4));
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
                    <th>Costo Ocioso</th>
                    <th colSpan="6">Detalles de Vehículos</th>
                </tr>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Número de Vehículo</th>
                    <th>Disponible</th>
                    <th>Valor Aleatorio Días</th>
                    <th>Días a Rentar</th>  
                    <th>Ingreso</th>
                    <th>Días No Disponible</th>
                </tr>
                </thead>
                <tbody>
                {simulacionData.map((fila, index) => (
                    <React.Fragment key={index}>
                    <tr>
                        <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.dia}</td>
                        <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.valorAleatorioAutos}</td>
                        <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.vehiculosARentar}</td>
                        <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.totalDisponible}</td>
                        <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.costoNoDisponible}</td>
                        <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.costoOcioso}</td>
                    </tr>
                    {/* Filas para los detalles de los vehículos */}
                    {fila.filaVehiculosArray.map((vehiculo, vIndex) => (
                        <tr key={vIndex}>
                        <td>{vehiculo.nVehiculo}</td>
                        <td>{vehiculo.disponible ? 'Sí' : 'No'}</td>
                        <td>{vehiculo.valorAleatorioDias}</td>
                        <td>{vehiculo.diasARentarPorVehiculos}</td>
                        <td>{vehiculo.ingreso}</td>
                        <td>{vehiculo.diasNoDisponible}</td>
                        </tr>
                    ))}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
        );
    }

    renderVehiculoSeleccionado() {
    const { vehiculoSeleccionado } = this.props;

    if (!vehiculoSeleccionado) {
        return null;
    }

    return (
        <div className={`card simular`}>
            <img src={vehiculoSeleccionado.foto} alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`} className='foto-vehiculo' />
            <div className="textos">
                <h3>Datos del vehículo</h3>
                <h5>Marca: {vehiculoSeleccionado.marca}</h5>
                <h5>Modelo: {vehiculoSeleccionado.modelo}</h5>
                <h5>Tipo: {vehiculoSeleccionado.tipo}</h5>
                <h5>Costo: {vehiculoSeleccionado.costo} Bs.</h5>
            </div>
        </div>
    );
    }

    render() {

        return (
        <div className="container">
            <div className="card simular">
                {this.renderVehiculoSeleccionado()}
            </div>
            <form onSubmit={this.handleSimularClick}>
                <div className="container-simular">
                    <div>
                        <div className="form-group">
                            <label htmlFor="numeroDias">Número de días a Simular</label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    className="form-control input-simular"
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
                                    onClick={this.handleSiguienteClick}
                                >
                                    Siguiente
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
            {this.renderSimulacionData(this.state.simulacionData)}
    </div>
        );
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
        costoOcioso: parseInt(state.datosFormulario.costoOcioso),
        costoAnual: parseInt(state.datosFormulario.costoAnual),
        costoNoDisponible: parseInt(state.datosFormulario.costoNoDisponible),
    };
};

    export default connect(mapStateToProps)(Simular);
