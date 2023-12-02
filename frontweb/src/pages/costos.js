import React, { Component } from 'react';
import '../assets/form.css';
import { Link } from 'react-router-dom';
import store from './store';

export default class Costos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      costoAnual: '',
      costoOcioso: '',
      costoNoDisponible: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSiguienteClick = () => {
    const { costoAnual, costoOcioso, costoNoDisponible } = this.state;

    store.dispatch({
      type: 'ALMACENAR_DATOS_FORMULARIO',
      payload: {
        costoAnual,
        costoOcioso,
        costoNoDisponible,
      },
    });

    console.log("Estado del store después de despachar la acción:", store.getState());
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="main">
            <div className="main-center">
              <h3>Costos</h3>
              <form className="" method="post" action="#">
                <div className="form-group">
                  <label htmlFor="costoAnual">Costo promedio anual por coche</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-user fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="costoAnual"
                      id="costoAnual"
                      placeholder="Ingrese el costo anual de un coche"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="costoOcioso">Costo por auto ocioso</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-envelope fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="costoOcioso"
                      placeholder="Ingrese el costo de tener un auto ocioso"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="costoNoDisponible">Costo por no tener un auto disponible</label>
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-users fa" aria-hidden="true"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="costoNoDisponible"
                      placeholder="Ingrese el costo por no tener un auto disponible para rentar"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="ml-auto">
                  <Link to="/Simular">
                    <button
                      id="btn"
                      className="btn btn-primary"
                      type=""
                      onClick={this.handleSiguienteClick}
                    >
                      Siguiente
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
