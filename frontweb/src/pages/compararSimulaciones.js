import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSimulacionPorId } from '../indexDB/indexDB';

const CompararSimulaciones = () => {
  const { ids } = useParams();
  const [simulacion1, setSimulacion1] = useState(null);
  const [simulacion2, setSimulacion2] = useState(null);

  useEffect(() => {
    const loadSimulaciones = async () => {
      try {
        const [id1, id2] = ids.split(',');
        
        const simulacionData1 = await getSimulacionPorId(Number(id1));
        const simulacionData2 = await getSimulacionPorId(Number(id2));

        setSimulacion1(simulacionData1);
        setSimulacion2(simulacionData2);

        console.log('simulacion 1: ', simulacionData1);
        console.log('simulacion 2: ', simulacionData2);
      } catch (error) {
        console.error('Error al cargar simulaciones para comparar:', error);
      }
    };

    loadSimulaciones();
  }, [ids]);

  // Renderizar solo algunos datos para probar
  const renderSimulacionData = (simulacion) => {
    if (!simulacion) {
      return null;
    }

    return (
      <div>
        <h2>Datos de la simulación</h2>
        <p>Modelo: {simulacion.vehiculoSeleccionado.modelo}</p>
        <p>Marca: {simulacion.vehiculoSeleccionado.marca}</p>
        {/* Agrega aquí más datos que desees renderizar */}
      </div>
    );
  };

  return (
    <div>
      <h1>Comparar Simulaciones</h1>
      {renderSimulacionData(simulacion1)}
      {renderSimulacionData(simulacion2)}
    </div>
  );
};

export default CompararSimulaciones;
