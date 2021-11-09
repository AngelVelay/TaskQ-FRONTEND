
import { useReducer } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer'

import {FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTOS,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,PROYECTO_ERROR} from '../../types';

import clienteAxios from '../../config/axios'



const ProyectoState = (props) => {

    //const proyectos = [
      //  {id:1,nombre:'Tienda Virtual'},
        //{id:2,nombre:'Intranet'},
      //  {id:3,nombre:'Diseño de Sitio Web'},
      //  {id:4,nombre:'Crear Backend'}
    //]

    const initialState = {
        
        proyectos : [],
        formulario:false,
        errorFormulario:false,
        proyecto:null,
        mensaje:null
    }

    //DISPATCH PARA EJECUTAR LAS ACCIONES

    const [state, dispatch] = useReducer (proyectoReducer, initialState)




    //serie de ffunciones para el CRUD en
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //OBTEBER LOS PROYECTOS
    const obtenerProyectos = async () => {
        
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            console.log(resultado)

            dispatch({
                type:OBTENER_PROYECTOS,
                payload:resultado.data.proyecto
            })

        }catch (error) {

            const alerta  = {
                msg:'HUBO UN ERROR',
                categoria:'alerta-error',
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
        

    }
    //AGREGAR NUEVO PROYECTO

    const agregarProyectos = async (proyecto) => {
        //proyecto.id = uuidv4();

       try {
           const resultado = await clienteAxios.post('/api/proyectos',proyecto);
           console.log(resultado)

           dispatch({
                type: AGREGAR_PROYECTOS,
                payload: resultado.data
           });
       } catch (error) {

        const alerta  = {
            msg:'HUBO UN ERROR',
            categoria:'alerta-error',
        }

        dispatch({
            type:PROYECTO_ERROR,
            payload:alerta
        })
    }
    }

    //VALIDAR FORMULARIO POR ERRORES
    const mostrarError = () => {
        dispatch({
            type:VALIDAR_FORMULARIO
            
        })
    }
    //SELECCION AEL PROYECTO QUE SE DIO CLICK

    const proyectoActual = (proyectoId) => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload:proyectoId,
        })
    }

    //ELimina un proyecto 
    const eliminarProyecto = async (proyectoId) => {
        
        try {
            const resultado = await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            console.log(resultado)

            
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload:proyectoId,

            })
        
        } catch (error) {

            const alerta  = {
                msg:'HUBO UN ERROR',
                categoria:'alerta-error',
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
        
    }
    
    
    


    return (
        <proyectoContext.Provider
            value={{
                //STATES
                proyectos:state.proyectos,
                formulario:state.formulario,
                errorFormulario:state.errorFormulario,
                proyecto:state.proyecto,
                mensaje:state.mensaje,


                //FUNCIONES
                mostrarFormulario,
                obtenerProyectos,
                agregarProyectos,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}>

                {props.children}

        </proyectoContext.Provider>
    );
}

export default ProyectoState;
