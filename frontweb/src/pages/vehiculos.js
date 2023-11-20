import React, { Component } from 'react'
import './vehiculos.css';

export default class Vehiculos extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      vehiculos:[
        {id:1, marca:'Toyota', modelo:'Rav4', tipo:'SUV', costo:'350Bs.', foto:'images/Rav4.png'},
        {id:2 , marca:'Toyota', modelo:'Corolla', tipo:'Sedan', costo:'200 Bs.', foto:'images/Corolla.png'},
        {id:3 , marca:'Honda', modelo:'Civic', tipo:'Deportivo', costo:'400Bs.', foto:'images/Civic.png'},
        {id:4 , marca:'Honda', modelo:'HRV', tipo:'SUV', costo:'350Bs.', foto:'images/HRV.png'},
        {id:5 , marca:'Suzuki', modelo:'Grand Vitara', tipo:'SUV', costo:'350Bs.', foto:'images/Grand Vitara.png'},
        {id:6 , marca:'Suzuki', modelo:'SX4', tipo:'Sedan', costo:'200Bs.', foto:'images/SX4.png'},
        {id:7 , marca:'Mitsubishi', modelo:'ASX', tipo:'SUV', costo:'350.', foto:'images/ASX.png'},
        {id:8, marca:'Audi', modelo:'R8', tipo:'Lujo', costo:'700Bs.', foto:'images/R8.png'},
        {id:9 , marca:'Nissan', modelo:'Versa', tipo:'Sedan', costo:'200Bs.', foto:'images/Versa.png'},
        {id:10 , marca:'Nissan', modelo:'Kicks', tipo:'SUV', costo:'350Bs.', foto:'images/Kicks.png'},
        {id:11 , marca:'JEEP', modelo:'Wrangler', tipo:'Todo Terreno', costo:'500 Bs.', foto:'images/Wrangler.png'},
        {id:12 , marca:'JEEP', modelo:'Renegade', tipo:'Todo Terreno', costo:'500 Bs.', foto:'images/Renegade.png'},
      ],
    };
  }

  render() {
    return (
      <div class="vehiculos">
          <div class="contenedor-vehiculos">
            {this.state.vehiculos.map(vehiculo => (
                <div key={vehiculo.id} className="card">
                  <img src={vehiculo.foto} alt={`${vehiculo.marca} ${vehiculo.modelo}`} className='foto-vehiculo' />
                  <div className="textos">
                    <h3>Datos del vehículo</h3>
                    <p>Marca: {vehiculo.marca}</p>
                    <p>Modelo: {vehiculo.modelo}</p>
                    <p>Tipo: {vehiculo.tipo}</p>
                    <p>Costo: {vehiculo.costo}</p>
                  </div>
                </div>
            ))}
          </div>

          <div class="ml-auto">
              <button id="btn4" className="btn4 btn-primary" type="">Siguiente</button>
          </div>
      </div>
    )
  }
}


