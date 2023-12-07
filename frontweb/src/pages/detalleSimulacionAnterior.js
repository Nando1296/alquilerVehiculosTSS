import React, {  useState, useEffect } from 'react';
import { openDB } from 'idb';
import { useParams } from 'react-router-dom';


const DetalleSimulacionAnterior = () => {
    const { id } = useParams();
    const [simulacionData, setSimulacionData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchSimulacionData = async () => {
        try {
          const db = await openDB('alquilerVehiculosDB', 1);
          const transaction = db.transaction('simulacionData', 'readonly');
          const store = transaction.objectStore('simulacionData');
          const simulacion = await store.get(Number(id));
  
          if (simulacion) {
            setSimulacionData(simulacion.simulacionData);
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
  
      fetchSimulacionData();
    }, [id]);

    
    return (
            <div>
                <h2>Resultados de la Simulación</h2>
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
                    {simulacionData.map((fila, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.dia}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.valorAleatorioAutos}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.vehiculosARentar}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.totalDisponible}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.costoNoDisponible}</td>
                            <td rowSpan={fila.filaVehiculosArray.length + 1}>{fila.costoOcioso}</td>
                        </tr>
                        {/* Filas para los detalles de los vehículos */}
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
