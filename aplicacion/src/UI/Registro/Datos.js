/*
-- Description:      Componente de Datos de Usuario TIENDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class DatosUsuario extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    render(){
        return(
            <div className="registro_datos">

                <div className="centrado">
                    <div className="logo_tienda" style={{background:'url(/img/clientes/sin_foto.jpg)no-repeat center/cover'}}>
                    </div>
                </div>
                <input id="nombreCompleto" placeholder="Nombres"/>
                <input id="apellidoPaterno" placeholder="Apellido Paterno"/>
                <input id="apellidoMaterno" placeholder="Apellido Materno"/>
                <input id="registroNacional" placeholder="Registro Nacional"/>
                <input id="nombreUsuario" type="email" placeholder="Correo"/>
                <input id="contrasena" type="password" placeholder="Contraseña"/>
            </div>
        )
    }
}

export default DatosUsuario;
