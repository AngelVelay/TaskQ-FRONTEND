import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import alertasContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {


    //EXTRAER LOS VALORES DEL CONTEXTES
    const alertaContext = useContext(alertasContext);
    const {alerta,mostrarAlerta} = alertaContext;

    const authenContext = useContext(authContext);
    const {mensaje,autenticado,registrarUsuario} = authenContext;


    //EN CASO DE QUE EL USUARIO SE HAYA AUTENTICADO O REGISTRADO O SEA UN REGISTRO DUPLICADO

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
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    });

    const {nombre,email,password,confirmar} = usuario;

    const onChange = (e) => { 
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();


        //Validar que no haya campos vacios

        if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === ''){
                mostrarAlerta('Todos los campos son obligatorios','alerta-error');
                return;
            }
            

        //Passwor minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe minimo de 6 caracteres','alerta-error');
            return;
        }

        //Los dos passwords debe ser iguales
        if(password !== confirmar){
            mostrarAlerta('EL PASSWORD NO COINCIDE','alerta-error');

        }
        //Pasarlo al Action
        registrarUsuario({nombre,email,password});

    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }

            <div className="contenedor-form sombra-dark">
                
            <h1>Crea una Nueva Cuenta</h1>
                <form onSubmit={onSubmit}>
                    
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa tu Nombre"
                        value={nombre}
                        onChange={onChange}/>
                    </div>
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
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresa tu Password"
                        value={password}
                        onChange={onChange}/>
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirma tu Password</label>
                        <input
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Confirma tu Password"
                        value={confirmar}
                        onChange={onChange}/>
                    </div>

                    
                    <div className="camp-form">
                        <input 
                        type="submit" className="btn btn-primario btn-block"
                        value="Registrar Usuario"/>
                    </div>
                </form>
                <Link to = {'/'} className="enlace-cuenta">Iniciar Sesión</Link>
            </div>
        </div>
    )
}

export default NuevaCuenta
