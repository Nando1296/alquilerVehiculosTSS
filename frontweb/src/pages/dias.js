import React, { Component } from 'react'
import '../assets/form.css'

export default class Dias extends Component {
  render() {
    return (
		<div>
        <div class="container">
			<div class="main">
      <div class='main-center'>
        <form class="" method="post" action="#">
						
						<div class="form-group">
							<label for="name">Cantidad de Vehiculos Disponibles</label>
								<div class="input-group">
				<input type="text" class="form-control"/>
							</div>
						</div>

            </form>

            <form class="" method="post" action="#">
						
						<div class="form-group">
							<br></br>
							<label for="name">N° de Dias de Renta</label>
								<div class="input-group">
				<input type="text" class="form-control"/>
							</div>
						</div>

            <div class="ml-auto">
				<button id="btn" class="btn btn-primary" type="">Guardar</button>
						</div>
            </form>
      </div>
	  </div>
	  </div>
	  </div>
    )
  }
}
