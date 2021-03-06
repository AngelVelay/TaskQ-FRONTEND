import React,{useContext} from 'react'
import tareaContext from '../../context/tareas/TareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext'

const Tarea = ({tarea}) => {

    const tareasContext = useContext(tareaContext);
    const {eliminarTarea,obtenerTareas,actualizarTarea,guaradarTareaActual} = tareasContext;

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const [proyectoActual]  = proyecto;

    //FUNCION QUE ELIMINA UNA TAREA

    const tareaEliminar = (id) => {
        eliminarTarea(id,proyectoActual._id);
        obtenerTareas(proyectoActual._id)

    }

    //FUNCION QUE MODIFICA EL ESTADO DE LA TAREAS
    const cambiarEstado = (tarea) => {
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        actualizarTarea(tarea);
    }

    const seleccionarTarea = (tarea) => {
        guaradarTareaActual(tarea);
    }
    
    
    return (
        <li className= 'tarea sombra'>
            <p>{tarea.nombre}</p>

            <div className= 'estado'>
                {tarea.estado

                ?   
                    (<button
                        type="button"
                        className="completo"
                        onClick={() => {cambiarEstado(tarea)}}>Completo</button>)
                
                :
                    (<button
                        type="button"
                        className="incompleto"
                        onClick={() => {cambiarEstado(tarea)}}>Incompleto</button>)  
                }

            </div>
            <div className= 'acciones'>

                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea) }
                >Editar</button>

                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
                

            </div>
        </li>
    )
}

export default Tarea
