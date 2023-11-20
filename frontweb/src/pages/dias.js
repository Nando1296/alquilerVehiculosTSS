import React, { Component } from 'react'
import '../assets/form.css'

export default class Dias extends Component {
  render() {
    return (
      <div class='main-center'>
        <form class="" method="post" action="#">
						
						<div class="form-group">
							<label for="name">N° de Dias de Renta</label>
								<div class="input-group">
				<input type="text" class="form-control"/>
							</div>
						</div>

            <div class="ml-auto">
				<button id="btn" class="btn btn-primary" type="">Guardar</button>
						</div>
            </form>

            <form class="" method="post" action="#">
						
						<div class="form-group">
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
    )
  }
}
