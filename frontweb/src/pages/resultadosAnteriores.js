import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllSimulaciones } from "../indexDB/indexDB";
import { CiViewTable } from "react-icons/ci";
import "./resultadosAnteriores.css";

export default function ResultadosAnteriores() {
  const navigate = useNavigate();
  const [simulaciones, setSimulaciones] = useState([]);
  const [simulacionesSeleccionadas, setSimulacionesSeleccionadas] = useState(
    []
  );

  useEffect(() => {
    loadSimulaciones();
  }, []);

  const loadSimulaciones = async () => {
    try {
      const simulaciones = await getAllSimulaciones();
      setSimulaciones(simulaciones);
    } catch (error) {
      console.error("Error al cargar simulaciones:", error);
    }
  };

  const handleSeleccionarSimulacion = (simulacionId) => {
    if (simulacionesSeleccionadas.length === 2) {
      const simulacionAntigua = simulacionesSeleccionadas[0];
      setSimulacionesSeleccionadas([simulacionId, simulacionAntigua]);
    } else {
      const index = simulacionesSeleccionadas.indexOf(simulacionId);

      if (index === -1) {
        setSimulacionesSeleccionadas([
          ...simulacionesSeleccionadas,
          simulacionId,
        ]);
      } else {
        setSimulacionesSeleccionadas([
          ...simulacionesSeleccionadas.slice(0, index),
          ...simulacionesSeleccionadas.slice(index + 1),
        ]);
      }
    }
  };

  const handleCompararClick = () => {
    if (simulacionesSeleccionadas.length >= 2) {
      const idsParam = simulacionesSeleccionadas.join(",");
      navigate(`/CompararSimulaciones/${idsParam}`);
    } else {
      console.log("Entró al bloque else");
      alert("Selecciona al menos dos simulaciones para comparar.");
    }
  };

  return (
    <div>
      <h1>Resultados Anteriores</h1>
      {simulaciones.length > 0 ? (
        <div>
          <div className="resultados">
            <table>
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th>Tipo</th>
                  <th>Número de Días</th>
                  <th>Número de Vehiulos</th>
                  <th>Ganancia Neta</th>
                  <th>Foto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {simulaciones.map((simulacion) => (
                  <tr key={simulacion.id}>
                    <td>{simulacion.vehiculoSeleccionado.modelo}</td>
                    <td>{simulacion.vehiculoSeleccionado.marca}</td>
                    <td>{simulacion.vehiculoSeleccionado.tipo}</td>
                    <td>{simulacion.numeroDias}</td>
                    <td>{simulacion.autosRentadosPorDia}</td>
                    <td>{simulacion.gananciaNeta.toFixed(2)} Bs.</td>
                    <td>
                      <img
                        src={simulacion.vehiculoSeleccionado.foto}
                        alt={`${simulacion.vehiculoSeleccionado.marca} ${simulacion.vehiculoSeleccionado.modelo}`}
                        style={{ maxWidth: "100px" }}
                      />
                    </td>
                    <td>
                      <div>
                        <Link to={`/ResultadoAnterior/${simulacion.id}`}>
                          <CiViewTable />
                        </Link>
                        <input
                          type="checkbox"
                          checked={simulacionesSeleccionadas.includes(
                            simulacion.id
                          )}
                          onChange={() =>
                            handleSeleccionarSimulacion(simulacion.id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            id="btn7"
            className="btn7 btn-primary"
            type=""
            onClick={handleCompararClick}
          >
            Comparar
          </button>
        </div>
      ) : (
        <p>No hay simulaciones anteriores.</p>
      )}
    </div>
  );
}
