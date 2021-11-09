import React ,{useContext,useEffect}from 'react'
import Proyecto from './Proyecto'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import proyectoContext from '../../context/proyectos/proyectoContext'

import alertasContext from '../../context/alertas/alertaContext'

const Listado = () => {

    //EXTRAER PROYECTOS DEL STATE INICIAL DEL CONTEXT
    const proyectosContext = useContext(proyectoContext);
    const {mensaje,proyectos,obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(alertasContext);
    const {alerta,mostrarAlerta} = alertaContext;

    useEffect(() => {

        //SI HAY UN ERROR
        if (mensaje) {
            mostrarAlerta(mensaje.msg,mensaje.categoria);
        }
        
        obtenerProyectos();
    // eslint-disable-next-line 
    },[mensaje]);

    //REVISAR SI PROYECTOS TIEN CONTENIDO
    if(proyectos.length === 0 ) return <p>No hay proyectos disponibles <br/><br/><strong>¡Comienza Creando uno!</strong> </p>;


    return (
        <ul className="listado-proyectos">

        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}

          <TransitionGroup>
            {proyectos.map(proyecto => (
                    <CSSTransition 
                        key={proyecto._id}
                        timeout={200}
                        classNames='proyecto'>
                        <Proyecto proyecto={proyecto}/>
                    </CSSTransition>
                ))}
          </TransitionGroup>
        </ul>
    )
}

export default Listado
