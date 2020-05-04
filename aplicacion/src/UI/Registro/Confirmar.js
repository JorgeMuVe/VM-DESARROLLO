/*
-- Description:      Componente de Datos de Usuario TIENDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class ConfirmarRegistro extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    render(){
        return(
            <div className="registro_confirmacion">
                <div>Hola Jorge, Un paso más!</div>
                <div>
                    Confirma tu información repidiento la contraseña que 
                    escogiste para tu cuenta de Pedidelivery.
                </div>
                <div>Correo: <b>jorge.muvez@gmail.com</b></div>
                <input style={{width:'250px'}} placeholder="Confirma Contraseña" type='password'/>
            </div>
        )
    }
}

export default ConfirmarRegistro;
