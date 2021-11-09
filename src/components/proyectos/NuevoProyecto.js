import React,{Fragment,useState,useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {


    //DEFINIR EL STATE DEL FORMULARIO

    const proyectosContext = useContext(proyectoContext);
    const {formulario,errorFormulario,mostrarFormulario,agregarProyectos,mostrarError} = proyectosContext;

    const [proyecto, setProyecto] = useState({
        nombre:''
    })

    const {nombre}=proyecto;

    const onChangeProyecto = (e)  => {
        setProyecto({
            ...proyecto,
            [e.target.name]:e.target.value
        })
    } 

    const OnSubmitProyecto = (e)  => {
        e.preventDefault();

        //Validar
        if (nombre === ''){
            mostrarError();
            return;
        }
        //Agregar al State
        agregarProyectos(proyecto);
        
        //REINICIAR EL FORMULARIO
        setProyecto({
            nombre:''
        });

    }

    return (
        
    <Fragment>
       <button
       type="button"
       className="btn btn-block btn-primario"
       onClick={()=>mostrarFormulario()} > Nuevo Proyecto</button>

       {
           formulario ? 
                (
                <form className="formulario-nuevo-proyecto"
                    onSubmit={OnSubmitProyecto}>
                        <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}/>
                        <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"/>

            </form>):null}

            {errorFormulario ? <p className="mansaje error">El nombre del Proyecto es Obligatorio</p> : null}
    </Fragment>
    )
}

export default NuevoProyecto
