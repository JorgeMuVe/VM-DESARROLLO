/* COMPONENTES */
import React from 'react';

/* ICONOS */
import IconoAtras from '../../SVG/aplicacion/IconoAtras';
import IconoUsuarioRegistro from '../../SVG//IconoUsuarioRegistro';
import IconoDNIRegistro from '../../SVG//IconoDNIRegistro';
import IconoTelefonoRegistro from '../../SVG//IconoTelefonoRegistro';
import IconoFacebook from '../../SVG//IconoFacebook';
import IconoTwitter from '../../SVG//IconoTwitter';
import IconoGoogle from '../../SVG//IconoGoogle';

/* VARIABLES GLOBALES */
const estadoInicial = {
    mostrarConfirmar: false,
};

export class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    pasarConfirmacion = (evento) => {
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

    render() {
        var { mostrarConfirmar } = this.state;
        return (
            <div className="Registro">
                <div className="usuario_encabezado">
                    <div onClick={this.props.history.goBack}><IconoAtras fill="#e51b1b" /></div>
                    <label> Regístrate </label>
                    <div></div>
                </div>

                <div className={"centrado " + (mostrarConfirmar ? "ocultar" : "")}>
                    <form className="registroDatos" validate="true" onSubmit={this.pasarConfirmacion}>
                        <p className="pRegistro">Ingresa tus datos para que puedas formar parte de esta gran tienda virtual.</p>
                        <div className="nombresRegistro">
                            <span><IconoUsuarioRegistro /></span>
                            <input className="inNombresRegistro" required id="nombreCompleto" placeholder="Nombres" />
                        </div>
                        <div className="apellidosRegistro">
                            <div className="ApPatRegistro">
                                <span><IconoUsuarioRegistro /></span>
                                <input className="inApPatRegistro" required id="apellidoPaterno" placeholder="Apellido Paterno" />
                            </div>
                            <div className="ApMatRegistro">
                                <span><IconoUsuarioRegistro /></span>
                                <input className="inApMatRegistro" required id="apellidoMaterno" placeholder="Apellido Materno" />
                            </div>
                        </div>
                        <div className="dniTelefono">
                            <div className="dniRegistro">
                                <span><IconoDNIRegistro /></span>
                                <input className="inDNIRegistro" required id="registroNacional" placeholder="DNI" />
                            </div>
                            <div className="telefonoRegistro">
                                <span><IconoTelefonoRegistro /></span>
                                <input className="inTelefonoRegistro" required id="telefonoCliente" type="text" placeholder="Telefono" />
                            </div>
                        </div>
                        <div className="checkboxsRegistro">
                            <div>
                                <input required type="checkbox" className="terminosRegistro" />
                                <span> Acepto <a href="##" target="_blank"> Términos y Condiciones </a> y la <a href="##" target="_blank">Política de Privacidad y Tratamiento de Datos Personales</a> </span>
                            </div>
                            <div>
                                <input type="checkbox" className="UsoInfoRegistro" />
                                <span> Acepto el uso de mi información para <a href="##" target="_blank">fines promocionales</a> <br /></span>
                            </div>
                        </div>
                        <div className="centrado">
                            <button className="botonRegistro" type="submit">Registrarme</button>
                        </div>
                        <hr></hr>
                        <span className="oic">Ingresá con</span>
                        <div className="modal_ingreso_internet">
                            <div className="ingreso_internet_boton" style={{ backgroundColor: '#4267B2' }}>
                                <div className="centrado"><IconoFacebook fill="#d1d3d8" /></div>
                                <label style={{textAlign:'center'}}>Ingresar con Facebook</label>
                            </div>
                            <div className="ingreso_internet_boton" style={{ backgroundColor: '#00aced' }}>
                                <div className="centrado"><IconoTwitter fill="#d1d3d8" /></div>
                                <label style={{textAlign:'center'}}>Ingresar con Twitter</label>
                            </div>
                            <div className="ingreso_internet_boton" style={{ backgroundColor: '#b63a2b' }}>
                                <div className="centrado"><IconoGoogle fill="#d1d3d8" /></div>
                                <label style={{textAlign:'center'}}>Ingresar con Google</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Registro;
