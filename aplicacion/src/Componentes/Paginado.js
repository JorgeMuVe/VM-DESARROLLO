import React from 'react';
import IconoAtras from '../SVG/aplicacion/IconoAtras';
import IconoSiguiente from '../SVG/aplicacion/IconoSiguiente';

const CuadroMensaje = ({ paginaActual, cantidadPaginas, paginaSiguiente, paginaAtras }) => {
    return(
        <div className="paginacion">
            <div className="centrado" onClick={paginaAtras}><IconoAtras fill="#e51b1b"/></div>
            <input type="text" value={(paginaActual||0)+" / "+(cantidadPaginas||0)} onChange={()=>{}}/>
            <div className="centrado" onClick={paginaSiguiente}><IconoSiguiente fill="#e51b1b"/></div>
        </div>
    )
}
export default CuadroMensaje;