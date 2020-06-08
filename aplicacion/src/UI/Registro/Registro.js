/* COMPONENTES */
import React from 'react';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarConfirmar:false,
};

export class Registro extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    pasarConfirmacion =(evento)=> {
        evento.preventDefault();
        var nuevoUsuario = {
            registroNacional: document.getElementById("registroNacional").value,
            nombreCompleto: document.getElementById("nombreCompleto").value,
            apellidoPaterno: document.getElementById("apellidoPaterno").value,
            apellidoMaterno: document.getElementById("apellidoMaterno").value,
            telefonoCliente: document.getElementById("telefonoCliente").value
        };
        this.props.cambiarNuevoUsuario(nuevoUsuario);
        this.props.history.push("/confirmar")
    }

    render(){
        var { mostrarConfirmar } = this.state;
        return(
            <div className="Registro">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b"/></div>
                    <label> Regístrate </label>
                    <div></div>
                </div>

                <div className={"centrado " + (mostrarConfirmar?"ocultar":"")}> 
                    <form className="registro_datos" validate="true" onSubmit={this.pasarConfirmacion}>
                        <div className="centrado">
                            <div className="logo_tienda" style={{background:'url(/img/clientes/sin_foto.jpg)no-repeat center/cover'}}></div>
                        </div>
                        <input required id="nombreCompleto" placeholder="Nombres"/>
                        <input required id="apellidoPaterno" placeholder="Apellido Paterno"/>
                        <input id="apellidoMaterno" placeholder="Apellido Materno"/>
                        <input required id="registroNacional" placeholder="Registro Nacional"/>
                        <input required id="telefonoCliente" type="text" placeholder="Telefono"/>
                        <div className="centrado">
                            <button type="submit">Registrarme</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Registro;
