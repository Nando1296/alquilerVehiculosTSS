import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSimulacionPorId } from '../indexDB/indexDB';

const CompararSimulaciones = () => {
  const { ids } = useParams();
  const simulacionIds = ids.split(',');

  const [simulaciones, setSimulaciones] = useState([]);

  useEffect(() => {
    const fetchSimulacionesDetails = async () => {
      const detallesPromises = simulacionIds.map(simulacionId => getSimulacionPorId(simulacionId));

      const detallesSimulaciones = await Promise.all(detallesPromises);

      // Filtrar simulaciones que sean diferentes de null (es decir, simulaciones encontradas)
      const simulacionesEncontradas = detallesSimulaciones.filter(simulacion => simulacion !== null);

      setSimulaciones(simulacionesEncontradas);
    };

    fetchSimulacionesDetails();
  }, [simulacionIds]);

  return (
    <div>
      <h1>Comparación de Simulaciones</h1>
      {simulaciones.map(simulacion => (
        <div key={simulacion.id}>
        <h2>Simulación ID: {simulacion.id}</h2>
        {simulacion && (
          <div>
            <p>Modelo: {simulacion.vehiculoSeleccionado.modelo}</p>
            <p>Marca: {simulacion.vehiculoSeleccionado.marca}</p>
            {/* Agrega más detalles según sea necesario */}
          </div>
        )}
      </div>
      ))}
    </div>
  );
};

export default CompararSimulaciones;
