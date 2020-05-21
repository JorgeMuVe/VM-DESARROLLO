/****** COMPONENTES ******/
import React from 'react';
import Modal from './Modal';

/***** ICONO SVG *******/
import IconoMercado from '../SVG/IconoMercado';
import IconoUsuario from '../SVG/IconoUsuario';
import IconoContrasena from '../SVG/IconoContrasena';

import IconoFacebook from '../SVG/IconoFacebook';
import IconoTwitter from '../SVG/IconoTwitter';
import IconoGoogle from '../SVG/IconoGoogle';


/* VARIABLES GLOBALES */
const estadoInicial = {};

export class ModalIngreso extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    redireccionar =(ruta)=>{ window.location.href = (this.props.urlAplicacion+ruta) }

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
                    <div style={{background:"#e51b1b"}} onClick={()=>this.redireccionar('/usuario/negocio')}>
                        <IconoMercado/><label className="centrado">Negocio</label>
                    </div>
                    <div style={{background:"#2ECC71"}} onClick={()=>this.redireccionar('/usuario/cliente')}>
                        <IconoUsuario fill="whitesmoke"/><label className="centrado">Cliente</label>
                    </div>
                </div>
                <div className="modal_ingreo_datos">
                    <div><IconoUsuario fill="#d1d3d8"/><input type="text" placeholder="Usuario o Correo"/></div>
                    <div><IconoContrasena fill="#d1d3d8"/><input type="password" placeholder="Contraseña"/></div>
                </div>
                <div className="modal_ingreso_opciones">
                    <div> <a href="/recuperar">Olvido su contraseña?</a></div>
                    <div className="centrado" onClick={()=>this.redireccionar('/usuario/negocio')}> <button> INGRESAR </button> </div>
                    <div> Nuevo aqui? <a href="/registro">Registrarse</a></div>
                </div>
                <div className="modal_ingreso_internet">
                    <label className="centrado"> INGRESAR CON </label>
                    <div className="ingreso_internet_boton" style={{backgroundColor:'#4267B2'}}>
                        <div className="centrado"><IconoFacebook fill="#d1d3d8"/></div>
                        <label>Ingresar con Facebook</label>
                    </div>
                    <div className="ingreso_internet_boton" style={{backgroundColor:'#00aced'}}>
                        <div className="centrado"><IconoTwitter fill="#d1d3d8"/></div>
                        <label>Ingresar con Twitter</label>
                    </div>
                    <div className="ingreso_internet_boton" style={{backgroundColor:'#b63a2b'}}>
                        <div className="centrado"><IconoGoogle fill="#d1d3d8"/></div>
                        <label>Ingresar con Google</label>
                    </div>
                </div>
            </div>
            </Modal>
        ) } else { return null }
    }
}

export default ModalIngreso;