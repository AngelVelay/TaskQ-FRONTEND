import React,{useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

import {    REGISTRO_EXITOSO,
    REGISTRO_ERROR ,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION} from "../../types";


const AuthState = (props) => {
    
    const initialState = {
        token:localStorage.getItem('token'),
        autenticado:null,
        usuario:null,
        mansaje:null,
        cargando:true,
    }
    
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Funciones 

    const registrarUsuario = async(datos) => {

        try {

            const respuesta = await clienteAxios.post('/api/usuarios',datos);
            console.log(respuesta.data)

            dispatch({
                type:REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //OBTENER EL USUARIO 
            usuariAutenticado();


        } catch (error) {
            //console.log(error.response.data.msg);

            const alerta = {
                msg:error.response.data.msg,
                categoria:'alerta-error'
            }
            
            dispatch({
                type:REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    //RETORNA EL USUARIO AUNTENTICADO

    const usuariAutenticado = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            //TODO:FUNCION PARA ENVIAR EL TOKEN POR HEADER
            tokenAuth(token)

        }

        try {
            const respuesta = await clienteAxios.get('/api/auth')
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

            //console.log(respuesta)

        } catch (error) {
            console.log(error.response);
            dispatch({
                type:LOGIN_ERROR,
            })
        }
    }

    const iniciarSesion = async (datos) => {
        
        try {
            const respuesta = await clienteAxios.post('/api/auth',datos);
            console.log(respuesta);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            
            //OBTENER EL USUARIO 

            usuariAutenticado();

        
        } catch (error) {
            console.log(error.response.data.msg);

            const alerta = {
                msg:error.response.data.msg,
                categoria:'alerta-error'
            }
            
            dispatch({
                type:LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }
    
    
    

    return (
        <authContext.Provider
            value={{
                //ESTADOS
                token:state.alerta,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                cargando:state.cargando,
    
                //FUNCIONES
                registrarUsuario,
                iniciarSesion,
                usuariAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        
        </authContext.Provider>
    )

   
}





export default AuthState;