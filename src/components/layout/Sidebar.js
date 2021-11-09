import React from 'react'
import Listado from '../proyectos/Listado'
import NuevoProyecto from '../proyectos/NuevoProyecto'
import Logo from '../../img/logo_large.png'
const Sidebar = () => {
    return (
        <aside>

            <img src={Logo} alt='/' style={{ height:100,height:100 ,marginLeft:50 }}/>
                <NuevoProyecto/>

            <div className="proyectos">

                <h2>Tus Proyectos</h2>
                
                <Listado/>
            
            </div>
        
        </aside>

    )
}

export default Sidebar
