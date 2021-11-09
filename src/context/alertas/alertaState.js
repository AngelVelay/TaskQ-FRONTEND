import React,{useReducer} from 'react';
import alertaReducer from './alertaReducer';
import alertasContext from './alertaContext';

import { MOSTRAR_ALERTA,OCULTAR_ALERTA } from "../../types";


const AlertaState = (props) => {
    
    const initialState = {
        alerta:null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    //FUNCIONES

    const mostrarAlerta = (msg,categoria) => {
        dispatch({
            type:MOSTRAR_ALERTA,
            payload:{
                msg,
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
                type:OCULTAR_ALERTA
            })
        },5000);
    }


    return (
        <alertasContext.Provider
            value={{
                //ESTADOS
                alerta:state.alerta,

                //FUNCIONES
                mostrarAlerta,
            }}
        >
            {props.children}
        
        </alertasContext.Provider>
    )
}

export default AlertaState;

