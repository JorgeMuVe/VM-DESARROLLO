/****** COMPONENTES ******/
import React from 'react';
import {withRouter} from 'react-router';

import Modal from './Modal';

/***** ICONO SVG *******/
import IconoMercado from '../SVG/IconoMercado';
import IconoUsuario from '../SVG/IconoUsuario';
import IconoContrasena from '../SVG/IconoContrasena';

import IconoFacebook from '../SVG/IconoFacebook';
import IconoTwitter from '../SVG/IconoTwitter';
import IconoGoogle from '../SVG/IconoGoogle';

/****** FUNCIONES *****/
import { ingresarSistema_DB } from '../DB/usuarioDB';

/* VARIABLES GLOBALES */
const estadoInicial = {
    esCliente:true
};

export class ModalIngreso extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    /* INGRESAR AL SISTEMA */
    ingresarSistema = (ingresoUsuario) => {
        ingresarSistema_DB(ingresoUsuario).then(res => {
            if (!res.error) {
                sessionStorage.setItem('usuarioAplicacion',JSON.stringify(res));
                this.props.history.push('/usuario/'+res.tipoUsuario);
                this.props.ingresarSistema(res);
            } else { this.props.abrirMensajeError(4000, res.error); }
        });
    }
    ingresarSistemaBoton =(evento)=> {
        evento.preventDefault();
        const usuarioIngreso = {};
        usuarioIngreso["nombreUsuario"] = document.getElementById("nombreUsuario").value;
        usuarioIngreso["contrasena"] = document.getElementById("contrasena").value;
        usuarioIngreso["tipoUsuario"] = this.state.esCliente?"cliente":"negocio";
        //usuarioIngreso["codigoUsuario"] = localStorage.getItem("codigoUsuario")||0;
        this.ingresarSistema(usuarioIngreso);
    }

    cambiarEsCliente =(esCliente)=> this.setState({esCliente})

    render(){
        if(this.props.mostrarModalIngreso){
        return(
            <Modal
                mostrarModal = {this.props.mostrarModalIngreso}
                controlModal = {this.props.controlModalIngreso}
                tituloModal = {"Inicar Sesión"}
            >
            <form className="ModalIngreso" validate="true" onSubmit={this.ingresarSistemaBoton}>
                <div className="modal_ingreso_tipo">
                    <div style={{background:this.state.esCliente?"#2ECC71":"#8b8b8b"}} 
                        onClick={()=>this.cambiarEsCliente(true)}>
                        <IconoUsuario fill="whitesmoke"/><label className="centrado">Cliente</label>
                    </div>
                    <div style={{background:this.state.esCliente?"#8b8b8b":"#2ECC71"}} 
                        onClick={()=>this.cambiarEsCliente(false)}>
                        <IconoMercado fill="whitesmoke"/><label className="centrado">Negocio</label>
                    </div>
                </div>
                <div className="modal_ingreo_datos">
                    <div><IconoUsuario fill="#d1d3d8"/><input required id="nombreUsuario" type="text" placeholder="Usuario o Correo"/></div>
                    <div><IconoContrasena fill="#d1d3d8"/><input required id="contrasena" type="password" placeholder="Contraseña"/></div>
                </div>
                <div className="modal_ingreso_opciones">
                    <div> <a href="/recuperar">Olvido su contraseña?</a></div>
                    <div className="centrado"> 
                    <button type="submit"> INGRESAR </button> </div>
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
            </form>
            </Modal>
        ) } else { return null }
    }
}

export default withRouter(ModalIngreso);