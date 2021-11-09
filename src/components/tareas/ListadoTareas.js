import React,{Fragment,useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/TareaContext';
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import Tarea from './Tarea'

const ListadoTareas = () => {
    
    const proyectosContext = useContext(proyectoContext);
    const {proyecto,eliminarProyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

   if (!proyecto) return <h2>Selecciona un Proyecto del area de "Tus Proyectos"</h2>;

      //ARRAY DESTRUCTURING 
      const [proyectoActual]  = proyecto;
      
    return (


    <Fragment>
        <h2>Proyecto:{proyectoActual.nombre}</h2>

        <ul className="listado-tareas">

                {tareasproyecto.length === 0

                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                        
                    : <TransitionGroup>
                            {tareasproyecto.map(tarea => (
                               <CSSTransition 
                                    key={tarea._id}
                                    timeout={200}
                                    classNames='tarea'>
                                            <Tarea tarea={tarea}/>
                               </CSSTransition>
                            ))}
                    </TransitionGroup>
                }
        </ul>

        <button
        className="btn btn-eliminar"
        type="button"
        onClick={() => eliminarProyecto(proyectoActual._id)}
        >Eliminar Proyecto &times;</button>
        
    </Fragment>

    )
}

export default ListadoTareas
