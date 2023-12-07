import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSimulacionPorId } from '../indexDB/indexDB';
import './compararSimulaciones.css';

const CompararSimulaciones = () => {
  const { ids } = useParams();
  const [simulacion1, setSimulacion1] = useState(null);
  const [simulacion2, setSimulacion2] = useState(null);
  const [simulacionConveniente, setSimulacionConveniente] = useState(null);

  useEffect(() => {
    const loadSimulaciones = async () => {
      try {
        const [id1, id2] = ids.split(',');

        const simulacionData1 = await getSimulacionPorId(Number(id1));
        const simulacionData2 = await getSimulacionPorId(Number(id2));

        setSimulacion1(simulacionData1);
        setSimulacion2(simulacionData2);

        // Comparar datos y determinar cuál simulación es más conveniente
        const porcentajeGananciaNeta1 = (simulacionData1.gananciaNeta / simulacionData1.totalIngresos) * 100;
        const porcentajeGananciaNeta2 = (simulacionData2.gananciaNeta / simulacionData2.totalIngresos) * 100;

        const simulacionMasConveniente = porcentajeGananciaNeta1 > porcentajeGananciaNeta2 ? simulacionData1 : simulacionData2;
        setSimulacionConveniente(simulacionMasConveniente);
      } catch (error) {
        console.error('Error al cargar simulaciones para comparar:', error);
      }
    };

    loadSimulaciones();
  }, [ids]);

  const renderSimulacionData = (simulacion, isConveniente) => {
    if (!simulacion) {
      return null;
    }

    const { vehiculoSeleccionado } = simulacion;
    const rutaFoto = vehiculoSeleccionado.foto || '';
    const imagenSrc = process.env.PUBLIC_URL + '/' + rutaFoto;

    const cardStyle = {
      backgroundColor: isConveniente ? '#91a2ff' : 'red',
    };

    const porcentajeGananciaNeta = (simulacion.gananciaNeta / simulacion.totalIngresos) * 100;

    return (
      <div className={`card simular`} style={isConveniente ? cardStyle : {}} key={vehiculoSeleccionado.modelo}>
        {rutaFoto && <img src={imagenSrc} alt={`${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.modelo}`} className='foto-vehiculo' />}
        <div className="textos">
          <h3>Datos del vehículo</h3>
          <h5>Marca: {vehiculoSeleccionado.marca}</h5>
          <h5>Modelo: {vehiculoSeleccionado.modelo}</h5>
          <h5>Tipo: {vehiculoSeleccionado.tipo}</h5>
          <h5>Costo: {vehiculoSeleccionado.costo} Bs.</h5>
          <h5>Renta Total: {simulacion.totalIngresos.toFixed(2)} Bs.</h5>
          <h5>Costo total de utilización de coches: {simulacion.costoTotalUtilizacion.toFixed(2)} Bs.</h5>
          <h5>Costo Vehículo ocioso: {simulacion.totalCostoOcioso.toFixed(2)} Bs.</h5>
          <h5>Costo no disponible: {simulacion.totalCostoNoDisponible.toFixed(2)} Bs.</h5>
          <h5>Total Egresos: {simulacion.totalEgresos.toFixed(2)} Bs.</h5>
          <h5>Ganancia neta: {simulacion.gananciaNeta.toFixed(2)} Bs.</h5>
          <h5>Porcentaje de Ganancia Neta: {porcentajeGananciaNeta.toFixed(2)} %</h5>
        </div>
      </div>
    );
  };

  return (
    <div>
    <h1>Comparar Simulaciones</h1>
    <div className='comparar'>
      <div className='contenedor-vehiculos'>
        {renderSimulacionData(simulacion1, simulacionConveniente === simulacion1)}
        {renderSimulacionData(simulacion2, simulacionConveniente === simulacion2)}
      </div>
      <div className='datos-comparacion'>
        <h1>Análisis</h1>
        {simulacionConveniente && (
          <>
            <p>
              La simulación más conveniente es la del vehículo {simulacionConveniente.vehiculoSeleccionado.marca}{' '}
              {simulacionConveniente.vehiculoSeleccionado.modelo} con un porcentaje de ganancia neta del{' '}
              {((simulacionConveniente.gananciaNeta / simulacionConveniente.totalIngresos) * 100).toFixed(2)} %.
              
            </p>
            <p>Detalles adicionales de la simulación:</p>
            <ul>
              <li>Costo Anual: {simulacionConveniente.costoAnual.toFixed(2)} Bs.</li>
              <li>Costo Por Cada Vehículo Ocioso: {simulacionConveniente.costoOcioso.toFixed(2)} Bs.</li>
              <li>Costo Por Cada vehiculo No disponible: {simulacionConveniente.costoNoDisponible.toFixed(2)} Bs.</li>
              <li>Total Egresos: {simulacionConveniente.totalEgresos.toFixed(2)} Bs.</li>
              <li>Cantidad De Vehiculos: {simulacionConveniente.autosRentadosPorDia}.</li>
              <li>Cantidad De Días Máx. A Rentar: {simulacionConveniente.diasRentadosPorAuto}.</li>
            </ul>
          </>
        )}
      </div>
    </div>
  </div>
  );
};

export default CompararSimulaciones;
