import { createStore } from 'redux';

const initialState = {
    vehiculoSeleccionado: null,
    diasRentadosPorAuto: null,
    frecuenciaDias: null,
    autosRentadosPorDia: null,
    frecuenciaAutos: null,
    datosFormulario: {
        costoAnual: null,
        costoOcioso: null,
        costoNoDisponible: null,
    },
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SELECCIONAR_VEHICULOS':
            return {...state, vehiculoSeleccionado:action.payload };
        case 'GUARDAR_DIAS_POR_AUTO':
            return {
                ...state,
                diasRentadosPorAuto: action.payload.diasRentadosPorAuto,
                frecuenciaDias: action.payload.frecuenciaDias,
            };
        case 'GUARDAR_AUTOS_POR_DIA':
            return {
                ...state,
                autosRentadosPorDia: action.payload.autosRentadosPorDia,
                frecuenciaAutos: action.payload.frecuenciaAutos,
            };
        case 'ALMACENAR_DATOS_FORMULARIO':
            return {
                ...state,
                datosFormulario: action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(rootReducer);

export default store;