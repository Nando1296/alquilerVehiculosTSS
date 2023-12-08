import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/inicio.css";

export default class Inicio extends Component {
  render() {
    return (
      <div>
        <h2 className="casoEstudio">Caso de estudio 1</h2>
        <h1>Empresa de Alquiler de Autos</h1>
        <div className="textContainer">
          <p className="textp">
            La empresa de alquiler de automóviles está tratando de determinar la
            cantidad óptima de automóviles que comprará. El precio promedio
            anual de un automóvil es de 75.000 Bs. Por cierto. Esta empresa ha
            recopilado las siguientes probabilidades de operacion:
            <br></br>
            Si el alquiler diario por auto es de Bs. 350, el costo de no tener
            un auto disponible cuando se está solicitando es de Bs. 200, y el
            costo de tener un carro ocioso durante un día es de Bs. 50, ¿Qué
            cantidad de automóviles debería comprar la empresa? Asuma que un
            automóvil que se alquila puede estar alquilado durante varios días y
            que una vez devuelto estará disponible al día siguiente. También,
            asuma 365 días de operación al año.
          </p>

          <div className="ml-auto">
            <Link to="/Vehiculos">
              <button id="btn1" className="btn1 btn-primary" type="">
                Siguiente
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
