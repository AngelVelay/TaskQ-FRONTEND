import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'

import alertasContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const Login = (props) => {

     //EXTRAER LOS VALORES DEL CONTEXTES
     const alertaContext = useContext(alertasContext);
     const {alerta,mostrarAlerta} = alertaContext;
 
     const authenContext = useContext(authContext);
     const {mensaje,autenticado,iniciarSesion} = authenContext;

     
    //EN CASO DE QUE EL USUARIO o USUARIO DE
     useEffect(() => {
        if (autenticado) {
           props.history.push('/proyectos')
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
    // eslint-disable-next-line 
    },[mensaje,autenticado,props.history]);

    //State para Iniciar Sesión

    const [usuario, setUsuario] = useState({
        email:'',
        password:''
    });

    const {email,password} = usuario;

    const onChange = (e) => { 
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();


        //Validar que no haya campos vacios
        if (email.trim()==='' || password.trim()==='') {
            mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        }

        //Pasarlo al Action(Reducer)
        iniciarSesion({email,password});

    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <div className="contenedor-form combra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu Email"
                        value={email}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresa tu Password"
                        value={password}
                        onChange={onChange}/>
                    </div>
                    <div className="camp-form">
                        <input 
                        type="submit" className="btn btn-primario btn-block"
                        value="Iniciar Sesión"/>
                    </div>
                </form>
                <Link to = {'nueva-cuenta'} className="enlace-cuenta">Obtener cuenta</Link>
            </div>
        </div>
    )
}

export default Login
