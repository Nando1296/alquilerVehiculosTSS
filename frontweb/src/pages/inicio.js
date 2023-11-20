import React, { Component } from 'react'
import '../assets/stylestabla.css'

export default class Inicio extends Component {
  render() {
    return (
      <div>
        <h1>Datos iniciales</h1>

        <div class="container">
        <div id="izq">
                <h4>Numero de dias rentados:</h4>
                <input type="number" placeholder="Cant Dias" required></input>
                <p></p>
                <table id="tabla-autos">
                    <thead>
                        <tr>
                            <th>N°Autos rentados por dia</th>
                            <th>Probabilidad</th>
                            <th>Probabilidad acumulada</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>0.40</td>
                            <td>0.40</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>0.35</td>
                            <td>0.75</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>0.15</td>
                            <td>0.90</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>0.10</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="der">
                <h4>Número de autos:</h4>
                <input type="number" placeholder="Cant Autos" required></input>
                <p></p>
                <table id="tabla-autos">
                    <thead>
                        <tr>
                            <th>N°Autos rentados por dia</th>
                            <th>Probabilidad</th>
                            <th>Probabilidad acumulada</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>0.10</td>
                            <td>0.10</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0.10</td>
                            <td>0.20</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>0.25</td>
                            <td>0.45</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>0.30</td>
                            <td>0.75</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>0.25</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
                <p></p>

                <button>Siguiente</button>

            </div>    

        </div>
      </div>
    )
  }
}