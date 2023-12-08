import React, { Component } from 'react'
import './vehiculos.css';
import { Link } from 'react-router-dom';
import store from './store';

export default class Vehiculos extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      vehiculos:[
        {id:1, marca:'Toyota', modelo:'Rav4', tipo:'SUV', costo:'350', foto:'images/Rav4.png'},
        {id:2 , marca:'Toyota', modelo:'Corolla', tipo:'Sedan', costo:'200', foto:'images/Corolla.png'},
        {id:3 , marca:'Honda', modelo:'Civic', tipo:'Deportivo', costo:'400', foto:'images/Civic.png'},
        {id:4 , marca:'Honda', modelo:'HRV', tipo:'SUV', costo:'350', foto:'images/HRV.png'},
        {id:5 , marca:'Suzuki', modelo:'Grand Vitara', tipo:'SUV', costo:'350', foto:'images/Grand Vitara.png'},
        {id:6 , marca:'Suzuki', modelo:'SX4', tipo:'Sedan', costo:'200', foto:'images/SX4.png'},
        {id:7 , marca:'Mitsubishi', modelo:'ASX', tipo:'SUV', costo:'350', foto:'images/ASX.png'},
        {id:8 , marca:'Audi', modelo:'R8', tipo:'Lujo', costo:'700', foto:'images/R8.png'},
        {id:9 , marca:'Nissan', modelo:'Versa', tipo:'Sedan', costo:'200', foto:'images/Versa.png'},
        {id:10 , marca:'Nissan', modelo:'Kicks', tipo:'SUV', costo:'350', foto:'images/Kicks.png'},
        {id:11 , marca:'JEEP', modelo:'Wrangler', tipo:'Todo Terreno', costo:'500', foto:'images/Wrangler.png'},
        {id:12 , marca:'JEEP', modelo:'Renegade', tipo:'Todo Terreno', costo:'500', foto:'images/Renegade.png'},
      ],
      vehiculoSeleccionado: null,
    };
  }

  handleCardClick = (vehiculo) => {
    this.setState({ vehiculoSeleccionado: vehiculo });
  }

  handleSiguienteClick = () => {
    store.dispatch({
      type: 'SELECCIONAR_VEHICULOS',
      payload: this.state.vehiculoSeleccionado,
    });
  }

  render() {
    return (
      <div>
      <h2 className='title-vehiculo'>Vehiculos</h2>
      <div className="vehiculos">
          <div className="contenedor-vehiculos">
            {this.state.vehiculos.map(vehiculo => (
                <div
                  key={vehiculo.id}
                  className={`card ${vehiculo === this.state.vehiculoSeleccionado ? 'seleccionado' : ''}`}
                  onClick={() => this.handleCardClick(vehiculo)}
                >
                  <img src={vehiculo.foto} alt={`${vehiculo.marca} ${vehiculo.modelo}`} className='foto-vehiculo' />
                  <div className="textos">
                    <h3>Datos del vehículo</h3>
                    <h5>Marca: {vehiculo.marca}</h5>
                    <h5>Modelo: {vehiculo.modelo}</h5>
                    <h5>Tipo: {vehiculo.tipo}</h5>
                    <h5>Costo: {vehiculo.costo} Bs.</h5>
                  </div>
                </div>
            ))}
          </div>

          <div className="btn-vehiculo">
            <Link to="/Renta">
              <button id="btn2" 
              className="btn2 btn-primary" 
              type=""
              onClick={this.handleSiguienteClick}
              >
                Siguiente
              </button>
            </Link>
          </div>
      </div>
      </div>
    )
  }
}
