        import React, { Component } from 'react'
        import "../assets/renta.css"

        export default class Renta extends Component {
        render() {
            return (
            <div>


                    <body>
                
                    <div class="table-container" id='renta'>

                
            <br></br>
            <p>

                N° de autos rentados por dias

                <input type="number" min="1" max="500"                                                                                                                           />

                </p>
                <p>

                N° de autos rentados por dias

                <input type="number" min="1" max="500"/>

                </p>

            
            <br></br>
            </div>

            <div class="table-container" id='renta'>

                
                    <br></br>
                <table>
                    <thead>
                        <tr>
                            <th>N° de dias Rentados por auto</th>
                            <th>Probabilidad acumulada</th>
                            <th>Probabilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>0.4</td>
                            <td>0.4</td>
                            
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>0.75</td>
                            <td>0.35</td>
                            
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>0.9</td>
                            <td>0.15</td>
                            
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>1</td>
                            <td>0.1</td>
                            
                        </tr>
                        
                        
                    </tbody>
                </table>

                
                <table>
                    <thead>
                    <tr>
                            <th>N° de autos rentados por dia</th>
                            <th>Probabilidad acumulada</th>
                            <th>Probabilidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <td>0.1</td>
                            <td>0.10</td>
                            
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>0.2</td>
                            <td>0.10</td>
                            
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>0.25</td>
                            <td>0.45</td>
                            
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>0.75</td>
                            <td>0.30</td>
                            
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>1</td>
                            <td>0.75</td>
                            
                        </tr>
                        
                        
                    </tbody>
                </table>
                <br></br>
            </div>

        </body>
            </div>
            )
        }
        }
