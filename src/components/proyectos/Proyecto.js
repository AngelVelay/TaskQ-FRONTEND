import React,{useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/TareaContext';


const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyectoActual} = proyectosContext;

    
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;

    const seleccionarProyecto = (id) => {
        proyectoActual(id) //FIJAR UN PROYECTO ACTUAL  
        obtenerTareas(id) //FILTRAR LAS TAREAS CUANDO SE DE UN CLICK
    }
    
    return (
        <li>
            <button
            type="button" 
            className="btn btn-blank"
            onClick={() => seleccionarProyecto(proyecto._id)}>{proyecto.nombre}</button>
        </li>
    )
}

export default Proyecto
