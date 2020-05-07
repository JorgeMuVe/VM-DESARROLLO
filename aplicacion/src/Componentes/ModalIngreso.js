/*
-- Description:      PEDIDO DE CLIENTE DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/****** COMPONENTES ******/
import React from 'react';
import Modal from './Modal';

/***** ICONO SVG *******/
import IconoMercado from '../SVG/IconoMercado';
import IconoUsuario from '../SVG/IconoUsuario';
import IconoContrasena from '../SVG/IconoContrasena';



/* VARIABLES GLOBALES */
const estadoInicial = {
    pedido : false, // Abrir - Cerrar El Pedido
};

export class PedidoCuadro extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        if(this.props.mostrarModalIngreso){
        return(
            <Modal
                mostrarModal = {this.props.mostrarModalIngreso}
                controlModal = {this.props.controlModalIngreso}
                tituloModal = {"Inicar Sesión"}
            >
            <div className="ModalIngreso">
                <div className="modal_ingreso_tipo">
                    <div style={{background:"red"}}><IconoMercado/><label className="centrado">Negocio</label></div>
                    <div style={{background:"green"}}><IconoUsuario fill="whitesmoke"/><label className="centrado">Cliente</label></div>
                </div>
                <div className="modal_ingreo_datos">
                    <div><IconoUsuario fill="#d1d3d8"/><input type="text" placeholder="Usuario o Correo"/></div>
                    <div><IconoContrasena fill="#d1d3d8"/><input type="password" placeholder="Contraseña"/></div>
                </div>
                <div className="modal_ingreso_ingreso">
                    <div> <a href="/recuperar">Olvido su contraseña?</a></div>
                    <div> <button> INGRESAR </button> </div>
                    <label> Nuevo aqui? <a href="/registro">Registrarse</a></label>
                </div>
                <div className="modal_ingreso_internet">
                    <div> INGRESAR CON </div>
                    <div><button>Ingresar con Facebook</button></div>
                    <div><button>Ingresar con Twitter</button></div>
                    <div><button>Ingresar con Google</button></div>
                </div>
            </div>
            </Modal>
        ) } else { return null }
    }
}

export default PedidoCuadro;