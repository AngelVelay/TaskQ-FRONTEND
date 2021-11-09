import React,{useContext,useEffect} from 'react'
import Barra from '../layout/Barra'
import Sidebar from '../layout/Sidebar'
import FormTareas from '../tareas/FormTareas'
import ListadoTareas from '../tareas/ListadoTareas'
import authContext from '../../context/autenticacion/authContext'

const Proyectos = () => {

    const authenContext = useContext(authContext);
    const { usuariAutenticado} = authenContext;

    useEffect(() => {
        usuariAutenticado();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="contenedor-app">
                <Sidebar/>
            
            <div className="seccion-principal">
                <Barra/>

                <main>
                    <FormTareas/>
                    
                    <div className="contenedor-tareas">
                       <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default Proyectos
