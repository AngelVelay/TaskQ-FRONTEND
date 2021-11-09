
import {FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTOS,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,PROYECTO_ERROR} from '../../types';


//eslint-disable-next-line import/no-anonymous-default-export
export default (state,action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario:true
            }
        case OBTENER_PROYECTOS:
            //console.log(action.payload)
            return{
                ...state,
                proyectos:action.payload

            }
        case AGREGAR_PROYECTOS:
            return{
                proyectos:[...state.proyectos,action.payload],
                formulario:false,
                errorFormulario:false
            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorFormulario:true
            }
        case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto:state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos:state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto:null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje:action.payload,
            }

           default:
            return state;
    }
}