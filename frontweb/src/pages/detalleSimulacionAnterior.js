import React, {  useState, useEffect } from 'react';
import { openDB } from 'idb';
import { useParams } from 'react-router-dom';
import './reporte.css';


const DetalleSimulacionAnterior = () => {
    const { id } = useParams();
    const [simulacion, setSimulacion] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSimulacion = async () => {
            try {
            const db = await openDB('alquilerVehiculosDB', 1);
            const transaction = db.transaction('simulacionData', 'readonly');
            const store = transaction.objectStore('simulacionData');
            const simulacion = await store.get(Number(id));
    
            if (simulacion) {
                setSimulacion(simulacion);
                setIsLoading(false);
            } else {
                console.error(`Simulación con ID ${id} no encontrada.`);
                setIsLoading(false);
            }
            } catch (error) {
            console.error('Error al recuperar la simulación.', error);
            setIsLoading(false);
            }
        };
    
        fetchSimulacion();
        console.log('datos recuperados:', simulacion);
    }, [id]);

    const renderVehiculoSeleccionado = () => {
        if (!simulacion || !simulacion.vehiculoSeleccionado) {
            return null;
        }
    
        const { vehiculoSeleccionado } = simulacion;
        const rutaFoto = vehiculoSeleccionado.foto || '';
        const imagenSrc = process.env.PUBLIC_URL + '/' + rutaFoto;
            return (
            <div className={'card'}>
                {rutaFoto && <img src={imagenSrc} alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`} className='foto-vehiculo' />}
                <div className="textos">
                    <h3>Datos del vehículo</h3>
                    <h5>Marca: {vehiculoSeleccionado.marca}</h5>
                    <h5>Modelo: {vehiculoSeleccionado.modelo}</h5>
                    <h5>Tipo: {vehiculoSeleccionado.tipo}</h5>
                    <h5>Costo: {vehiculoSeleccionado.costo} Bs.</h5>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <p>Cargando...</p>;
    }
    
    if (!simulacion) {
        return <p>Simulación no encontrada.</p>;
    }

    
    return (
        <div>
            <div className='container-datos-reporte'>
                <div className='container-cards'>
                    {renderVehiculoSeleccionado()}
                

                    <div className='card'>
                        <div className='textosAnteriores'>
                            <h1>Informe de Simulación</h1>
                            <h3>Renta Total: {simulacion.totalIngresos} Bs.</h3>
                            <h3>Costo total de utilización de coches: {simulacion.costoTotalUtilizacion} Bs.</h3>
                            <h3>Costo Vehículo ocioso: {simulacion.totalCostoOcioso} Bs.</h3>
                            <h3>Costo no disponible: {simulacion.totalCostoNoDisponible} Bs.</h3>
                            <h3>Total Egresos: {simulacion.totalEgresos} Bs.</h3>
                            <h3>Ganancia neta: {simulacion.gananciaNeta} Bs.</h3>
                            
                            <h3>Se generan unos ingresos brutos de {simulacion.totalIngresos} Bs. en un periodo de {simulacion.numeroDias} días.</h3>
                            <h3>Se genera un gasto de {simulacion.totalEgresos} Bs.</h3>
                            <h3>Se genera una ganancia de {simulacion.gananciaNeta} Bs.</h3>
                        </div>
                    </div>
                </div>
            </div>
            

            <h2>Resultados de la Simulación Guardada</h2>
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
                    {simulacion.simulacionData.map((fila, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.dia}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.valorAleatorioAutos}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.vehiculosARentar}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.totalDisponible}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.costoNoDisponible}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.costoOcioso}</td>
                        </tr>
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

export default DetalleSimulacionAnterior;
