import React from 'react';
const CuadroMensaje = ({ mostrarMensaje,textoMensaje,tipoMensaje }) => {
    if(mostrarMensaje){
        return(
        <div className="cuadro_mensaje">
            <div className={tipoMensaje}>
                {textoMensaje}
            </div>
        </div>
        )
    }else { return null }
}
export default CuadroMensaje;