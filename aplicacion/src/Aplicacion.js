/*
-- Description:      APLICACIÓN TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* ********   F U N C I O N E S ************ */
import { agregarUsuario_DB, ingresarSistema_DB, buscarUsuarioCliente_DB } from './DB/usuarioDB';
import { listarProductoPorTipo_DB } from './DB/productoDB';

import { urlAplicacionDesarrollo } from './Componentes/Funciones'
import { urlAplicacionPublica } from './Componentes/Funciones'

/* *********  C O M P O N E N T E S   ************/
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Libreria React-Router
import React, { Component } from 'react';
import Menu from './Componentes/Menu.js';
import Contacto from './Componentes/Contacto';
import PiePagina from './Componentes/PiePagina';
import MejoresRestaurantes from './Componentes/MejoresRestaurantes';

import Mensaje from './Componentes/Mensaje.js';

/* *********  I N T E R F A Z   **********/
import Principal from './UI/Paginas/Principal.js';
import Negocio from './UI/Negocio/Negocio';
import Cliente from './UI/Cliente/Cliente';


import ProductoLista from './UI/Producto/ProductoLista';
import ProductoBuscador from './UI/Producto/ProductoBuscador';




/* ********* M O D A L ************* */
import ModalIngreso from './Componentes/ModalIngreso';


/* *******   V A R I A B L E S  G L O B A L E S **********/
const estadoInicial = {

  /**** URL DE APLICACION Y SERVIDOR ****/
  urlAplicacion: urlAplicacionDesarrollo,
  // urlAplicacion: urlAplicacionPublica,
  urlAplicacionPublica: urlAplicacionPublica,

  /**** CUADRO DE MENSAJE ****/
  mostrarMensaje: false,
  textoMensaje: '',
  tipoMensaje: '',

  /**** DATOS DE APLICACION *******/
  //Usuario
  mostrarModalIngreso: false,
  usuarioAplicacion: {
    nombreCompleto: "Usuario Invitado",
    apellidoPaterno: "",
    apellidoMaterno: "",
    tipoUsuario: "invitado",
    codigoUsuario: ""
  },

  // Productos
  buscadorProducto: {},

  productosPorTipo: [],

  // Pedido Usuario
  mostrarPedido: false,
  pedidoUsuario: [1],

  // Notificaciones
  notificaciones: [1],

  /*  *************************** */

  //oferta:[{codigoProducto:0},{codigoProducto:1}],
  //pedidos:[{codigoPedido:0},{codigoPedido:1}],  
  //venta:[{codigoPedido:0},{codigoPedido:1}],
};

/* ****************  --------------------------   *********/
export class Aplicacion extends Component {

  constructor(props) {
    super(props);
    this.state = estadoInicial;
  }

  /* MOSTRAR MENSAJE DE ERROR */
  abrirError = (tiempo, mensaje) => {
    this.setState({ mostrarMensaje: true, textoMensaje: mensaje, tipoMensaje: 'error' }, () => {
      setTimeout(() => this.setState({ mostrarMensaje: false, textoMensaje: '', tipoMensaje: '' }), tiempo)
    })
  }

  /* MOSTRAR PEDIDO LISTA */
  abrirPedido = () => {
    this.setState({ mostrarPedido: !this.state.mostrarPedido });
  }

  /* VERIFICACION */
  verificarDatosUsuario = (nuevoUsuario) => {
    if (nuevoUsuario) { return true } else { return false }
  }

  /* DATOS Y REGISTRO DE USUARIO*/
  agregarUsuario = () => {
    var nuevoUsuario = {
      registroNacional: document.getElementById("registroNacional").value,
      nombreCompleto: document.getElementById("nombreCompleto").value,
      apellidoPaterno: document.getElementById("apellidoPaterno").value,
      apellidoMaterno: document.getElementById("apellidoMaterno").value,
      nombreUsuario: document.getElementById("nombreUsuario").value,
      contrasena: document.getElementById("contrasena").value,
      tipoUsuario: "cliente"
    };

    if (this.verificarDatosUsuario(nuevoUsuario)) {
      agregarUsuario_DB(nuevoUsuario).then(res => {
        console.log(res);
        if (!res.error) {
          this.setState({ usuarioAplicacion: res }, () => {
            localStorage.setItem('codigoUsuario', res.codigoUsuario);
            this.cambiarPagina("producto-cliente");
          });
        } else { this.abrirError(4000, res.error); }
      }) //.catch(res => alert("Error"));
    } else { this.abrirError(4000, 'DATOS INCOMPLETOS') }
  }

  /* INGRESAR AL SISTEMA */
  ingresarSistema = (tipoUsuario) => {
    var ingresoUsuario = {
      nombreUsuario: document.getElementById("correoUsuario").value,
      contrasena: document.getElementById("contrasenaUsuario").value,
      tipoUsuario: tipoUsuario
    };

    if (this.verificarDatosUsuario(ingresoUsuario)) {
      ingresarSistema_DB(ingresoUsuario).then(res => {
        if (!res.error) {
          this.setState({ usuarioAplicacion: res }, () => {
            localStorage.setItem('codigoUsuario', res.codigoUsuario);
            this.cambiarPagina("producto-cliente");
          });
        } else { this.abrirError(4000, res.error); }
      });
    } else { this.abrirError(4000, 'DATOS INCOMPLETOS') }
  }

  /* OBTENER USUARIO */
  obtenerUsuario = () => {
    const codigoUsuario = localStorage.getItem("codigoUsuario");
    if (codigoUsuario) {
      const buscaUsuario = { codigoUsuario: codigoUsuario };
      buscarUsuarioCliente_DB(buscaUsuario).then(res => {
        if (!res.error) {
          this.setState({ usuarioAplicacion: res });
        } else { this.abrirError(4000, res.error) }
      });
    } else { } // console.log("Usuario Invitado") }
  }

  /* OBTENER PRODUCTOS */
  listarProductoPorTipo = (idTipoProducto) => {
    const buscaProducto = { tipoProducto: idTipoProducto }
    listarProductoPorTipo_DB(buscaProducto).then(productos => {
      this.setState({ productosPorTipo: productos });
    });
  }

  buscarProducto = (Buscador) => {
    this.setState({ buscadorProducto: Buscador }, () => {
      window.location.href = this.state.urlAplicacion + "/productos/buscador"
    });
  }

  /* AGREGAR PRODUCTO A CANASTA */
  agregarCanasta = (producto) => {
    this.setState({ pedidoUsuario: this.state.pedidoUsuario.concat([producto]) });
  }

  /* SACAR PRODUCTO DE CANASTA */
  sacarProducto = (producto) => {
    const { pedidoUsuario } = this.state;
    var index = pedidoUsuario.indexOf(producto);
    if (index > -1) {
      pedidoUsuario.splice(index, 1);
      this.setState({ pedidoUsuario });
    }
  }

  /* EJECUTAR FUNCIONES AL INICIAR APP */
  inicarAplicacion = () => {
    this.obtenerUsuario();
  }

  controlModalIngreso = () => this.setState({ mostrarModalIngreso: !this.state.mostrarModalIngreso });

  componentDidMount() {
    this.inicarAplicacion();
    //window.addEventListener('popstate',()=>this.cambiarPagina(this.state.paginaAnterior));
    //window.history.pushState({name:"browserBack"},"on browser back click", window.location.href);
  }

  componentWillUnmount() {
    //window.history.pushState({name: "browserBack"}, "on browser back click", window.location.href);
  }

  render() {
    return (<div className="Aplicacion" >
      <ModalIngreso urlAplicacion={this.state.urlAplicacion}
        mostrarModalIngreso={this.state.mostrarModalIngreso}
        controlModalIngreso={this.controlModalIngreso} >
      </ModalIngreso>
      <Mensaje mostrarMensaje={this.state.mostrarMensaje}
        textoMensaje={this.state.textoMensaje}
        tipoMensaje={this.state.tipoMensaje} >
      </Mensaje>

      <Menu abrirPedido={this.abrirPedido}
        controlModalIngreso={this.controlModalIngreso}
        urlAplicacion={this.state.urlAplicacion} >
      </Menu>

      <div className="Paginas"
        id="paginas">
        <BrowserRouter >
          <Switch >
            <Route exact path="/"
              render={
                (props) => < Principal usuarioAplicacion={this.state.usuarioAplicacion}
                  buscarProducto={this.buscarProducto} {...props}
                />} />
            <Route path="/usuario/negocio"
              render={
                (props) => < Negocio usuarioAplicacion={this.state.usuarioAplicacion} {...props}
                />} />
            <Route path="/usuario/cliente"
              render={
                (props) => < Cliente usuarioAplicacion={this.state.usuarioAplicacion} {...props}
                />} />
            <Route path="/productos/buscador"
              render={
                (props) => < ProductoBuscador buscarPor={this.state.buscadorProducto} {...props}/>} />
            <Route path="/productos/lista"
              render={
                (props) => < ProductoLista listarPor={"NEGOCIO"} {...props}
                />} />
          </Switch> </BrowserRouter > </div> <
            div id="tiendas" >
        <MejoresRestaurantes />
      </div>

      <div id="contacto" >
        <Contacto />
      </div> <
        PiePagina />
    </div>
    )
  }
}

export default Aplicacion;

/*




            <div className={paginaActual === 'principal' ? '' : 'ocultar'}>
<Principal
urlAplicacion={this.state.urlAplicacion}
cambiarPagina={this.cambiarPagina}
></Principal>
</div>
<div className={paginaActual === 'venta' ? '' : 'ocultar'}>
<Venta
cambiarPagina={this.cambiarPagina}
></Venta>
</div>
<div className={paginaActual === 'entrega' ? '' : 'ocultar'}>
<Entrega
cambiarPagina={this.cambiarPagina}
></Entrega>
</div>
<div className={paginaActual.split("-")[0] === 'producto' ? '' : 'ocultar'}>
<Producto
urlAplicacion={this.state.urlAplicacion}
tipoUsuario={paginaActual}
cambiarPagina={this.cambiarPagina}
listarProductoPorTipo={this.listarProductoPorTipo}
></Producto>
</div>

<div className={paginaActual.split("-")[0] === 'productoLista' ? '' : 'ocultar'}>
<ProductoLista
tipoProducto={paginaActual.split("-")[1]}
productos={this.state.productosPorTipo}
agregarCanasta={this.agregarCanasta}
cambiarPagina={this.cambiarPagina}
></ProductoLista>
</div>
<div className={paginaActual === 'pedido' ? '' : 'ocultar'}>
<Pedido
cambiarPagina={this.cambiarPagina}
sacarProducto={this.sacarProducto}
pedidoUsuario={this.state.pedidoUsuario}
paginaActual={this.state.paginaActual}
></Pedido>
</div>
<div className={paginaActual === 'direccion' ? '' : 'ocultar'}>
<Direccion
></Direccion>
</div>

<div className={paginaActual === 'usuario' ? '' : 'ocultar'}>
<Usuario
usuarioAplicacion={this.state.usuarioAplicacion}
cambiarPagina={this.cambiarPagina}
paginaActual={this.state.paginaActual}
></Usuario>
</div>

<div className={paginaActual.split("-")[0] === 'ingresar' ? '' : 'ocultar'}>
<Ingresar
tipoUsuario={paginaActual.split("-")[1]}
ingresarSistema={this.ingresarSistema}
cambiarPagina={this.cambiarPagina}
></Ingresar>
</div>
<div className={paginaActual.split("-")[0] === 'registroUsuario' ? '' : 'ocultar'}>
<Registro
tipoUsuario={paginaActual.split("-")[1]}
agregarUsuario={this.agregarUsuario}
cambiarPagina={this.cambiarPagina}
></Registro>
</div>
</div>

*/