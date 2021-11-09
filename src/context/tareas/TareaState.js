import React ,{useReducer} from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';

import clienteAxios from '../../config/axios'



import {TAREAS_PROYECTOS,
        AGREGAR_TAREAS,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA} from '../../types';

const TareaState = (props) => {
    const initialState = {
       
        tareasproyecto:[],
        errortarea:false,
        tareaseleccionada:null
    }


    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //FUNCIONES DE

    //OBTENER TAREAS DEL PROYECTO
    const obtenerTareas = async (proyecto) => {

       try {
        const resultado = await clienteAxios.get('/api/tareas',{params:{proyecto}})
        //console.log(resultado.data)
        
        dispatch({
            type:TAREAS_PROYECTOS,
            payload:resultado.data.tareas
            
        })

       } catch (error) {
           console.log(error)
       }
    }

    //AGREGAR_TAREAS AL PROYECTO SELECCIONADO
    const agregarTarea = async (tarea) => {
        
        try {

            const resultado = await clienteAxios.post('/api/tareas',tarea)
            console.log(resultado)
            dispatch({
                type:AGREGAR_TAREAS,
                payload:tarea
            })

        } catch (error) {
            console.log(error)
        }


        
    }

    const validarTarea = () => {
        dispatch({
            type:VALIDAR_TAREA,
        })
    }
    
    const eliminarTarea = async(id,proyecto) => {

        try {
            await clienteAxios.delete(`/api/tareas/${id}`,{params:{proyecto}})

         dispatch({
            type:ELIMINAR_TAREA,
            payload:id
        })
        } catch (error) {
            console.log(error)
        }
    }

    /*const cambiarEstadoTarea = (tarea) => {
        dispatch({
            type:ESTADO_TAREA,
            payload:tarea
        })
    }*/

    //EXTRAE UNA TAREA PARA EDICION

    const guaradarTareaActual = (tarea) => {
        dispatch({
            type:TAREA_ACTUAL,
            payload:tarea
        })
    }

    const actualizarTarea = async (tarea) => {
        
        try {
            const resultado  = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea);
            console.log(resultado)

            dispatch({
                type:ACTUALIZAR_TAREA,
                payload:resultado.data.tareaExiste
            })

        } catch (error) {
            console.log(error)
        }
    }

    const limpiarTarea = () => {
        dispatch({
            type:LIMPIAR_TAREA,
            
        })
    }
    
    
    
    

    return(
        <TareaContext.Provider
            
            value={{
                //ESTADOS
               
                tareasproyecto:state.tareasproyecto,
                errortarea:state.errortarea,
                tareaseleccionada:state.tareaseleccionada,


                //FUNCIONES 
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                //cambiarEstadoTarea,
                guaradarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;