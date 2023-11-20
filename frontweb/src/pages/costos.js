import React, { Component } from 'react'
import '../assets/form.css'

export default class costos extends Component {
  render() {
    return (
      <div>
        <div class="container">
			<div class="main">
				<div class="main-center">
				<h3>Costos</h3>
					<form class="" method="post" action="#">
						
						<div class="form-group">
							<label for="name">Costo promedio anual por coche</label>
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
				<input type="text" class="form-control" name="name" id="name"  placeholder="ingrese el costo anual de un coche"/>
							</div>
						</div>

						<div class="form-group">
							<label for="email">Costo por auto oscioso</label>
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="email" placeholder="Ingrese el costo de tener un auto oscioso"/>
							</div>
						</div>

						<div class="form-group">
							<label for="username">Costo por no tener un auto disponible</label>
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" name="username" placeholder="Ingrese el costo por no tener un auto disponible para rentar"/>
								</div>
						</div>

						
        <div class="ml-auto">
				<button id="btn" class="btn btn-primary" type="">Siguiente</button>
						</div>
					</form>
				</div>
			</div>
		</div>

      </div>
    )
  }
}
