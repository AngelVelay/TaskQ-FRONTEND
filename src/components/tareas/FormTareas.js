import React,{useContext,useState,useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/TareaContext';

const FormTareas = () => {


    //extraer si un proyecto esta activp
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada,errortarea,agregarTarea,validarTarea,obtenerTareas,actualizarTarea,limpiarTarea} = tareasContext;
    

    //EFFECT QUE DETECTA SI HAY UNA TAREA SELECCIONADA

    useEffect(() => {

        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        }else {
            guardarTarea({
                nombre: '',
            })
        }

    },[tareaseleccionada])



    const [tarea, guardarTarea] = useState({
        nombre: '',
    });

    if (!proyecto) return null;

    //ARRAY DESTRUCTURING 
    const [proyectoActual]  = proyecto;

    //LEER LOS VALORESS DEL FORMULARIO
    const handleChange = (e) => {

       guardarTarea({ 
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const {nombre} = tarea;
    

    const onSubmit = (e) => {
        e.preventDefault();

        //VALIDAR
        if (nombre.trim() === '') {
            validarTarea();
            return;
        }

        //REVISAR SI ES EDICION O ES NUEVA TAREA
         if(tareaseleccionada === null){

            //AGREAGAR NUEVA TAREA AL STATE DE tareas
            tarea.proyecto = proyectoActual._id;
            //tarea.estado = false;
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea);
            limpiarTarea();
        }

        obtenerTareas(proyectoActual.id);

            //REINICIAR FORM
            guardarTarea({
                nombre:''
            })
    }
    
    
    return (
        <div className="formulario">
            
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name='nombre'
                        value={nombre}
                        onChange={handleChange}/>
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}/>
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTareas
