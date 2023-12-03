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

    //simulacionData: [],
    totalIngresos: 0,
    totalCostoOcioso: 0,
    totalCostoNoDisponible: 0,
    numeroDias: 365,
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
        case 'SET_SIMULACION_DATA':
            return {
                ...state,
                //simulacionData: action.payload.simulacionData,
                totalIngresos: action.payload.totalIngresos,
                totalCostoOcioso: action.payload.totalCostoOcioso,
                totalCostoNoDisponible: action.payload.totalCostoNoDisponible,
                numeroDias: action.payload.numeroDias,
            }
        default:
            return state;
    }
};

const store = createStore(rootReducer);

export default store;