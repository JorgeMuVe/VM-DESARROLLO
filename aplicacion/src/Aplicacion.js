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

/* *********  I N T E R F A Z   **********/
import Principal from './UI/Paginas/Principal.js';
import Negocio from './UI/Negocio/Negocio';
import Cliente from './UI/Cliente/Cliente';

import ProductoLista from './UI/Producto/ProductoLista';
import ProductoBuscador from './UI/Producto/ProductoBuscador';


/* ********* M O D A L ************* */
import ModalIngreso from './Componentes/ModalIngreso';
import ModalCantidad from './Componentes/ModalCantidad';

import Mensaje from './Componentes/Mensaje.js';

/* *******   V A R I A B L E S  G L O B A L E S **********/
const estadoInicial = {

  /**** URL DE APLICACION Y SERVIDOR ****/
  urlAplicacion_ : urlAplicacionPublica,
  urlAplicacion : urlAplicacionDesarrollo,
  urlAplicacionPublica: urlAplicacionPublica,

  /**** CUADRO DE MENSAJE ****/
  mostrarMensaje: false,
  textoMensaje: '',
  tipoMensaje: '',

  /**** DATOS DE APLICACION *******/
  // Usuario
  mostrarModalIngreso: false,
  usuarioAplicacion: {
    nombreCompleto: "Usuario Invitado",
    apellidoPaterno: "",
    apellidoMaterno: "",
    tipoUsuario: "cliente",
    codigoUsuario: "1"
  },

  // Productos
  mostrarModalCantidad: false,
  productoSeleccionado: {},
  productosPorTipo: [],

  // Pedido Usuario
  mostrarPedido: false,
  pedidoUsuario: [],

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
            sessionStorage.setItem('codigoUsuario', res.codigoUsuario);
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
            sessionStorage.setItem('codigoUsuario', res.codigoUsuario);
            this.cambiarPagina("producto-cliente");
          });
        } else { this.abrirError(4000, res.error); }
      });
    } else { this.abrirError(4000, 'DATOS INCOMPLETOS') }
  }

  /* OBTENER USUARIO */
  obtenerUsuario = () => {
    const codigoUsuario = sessionStorage.getItem("codigoUsuario");
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
    window.location.href = this.state.urlAplicacion+"/productos/buscador/"+
      (Buscador.tipoBuscar||"TODO")+"/"+(Buscador.textoBuscar||" ");
  }

  /* SELECCIONAR PRODUCTO */
  seleccionarProductoCantidad =(productoSeleccionado)=> {
    let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
    pedidoUsuario = JSON.parse(pedidoUsuario);
    var indexProducto = this.buscarProductoPedido(pedidoUsuario,productoSeleccionado.idProducto);
    productoSeleccionado["cantidadProducto"] = (pedidoUsuario[indexProducto]||{}).cantidadProducto;
    this.setState({productoSeleccionado},()=>this.controlModalCantidad())
  }

  buscarProductoPedido =(pedidoUsuario,idProducto)=> {
    var indexOf = -1;
    (pedidoUsuario||[]).forEach((p,i)=>{if(p.idProducto===idProducto){indexOf=i}});
    return indexOf;
  }

  /* AGREGAR CANTIDAD A PRODUCTO */
  agregarCantidadProducto =(evento)=> {
    evento.preventDefault();
    const { productoSeleccionado } = this.state;
    var cantidadProducto = document.getElementById("cantidadProducto").value;
    productoSeleccionado["cantidadProducto"] = cantidadProducto;
    this.agregarCanasta(productoSeleccionado);
    this.controlModalCantidad();
  }

  /* AGREGAR PRODUCTO A CANASTA */
  agregarCanasta = (producto) => {
    let pedidoUsuario = JSON.parse(sessionStorage.getItem('pedidoUsuario'));
    var indexProducto = this.buscarProductoPedido(pedidoUsuario,producto.idProducto);
    if(indexProducto < 0){ pedidoUsuario = (pedidoUsuario||[]).concat([producto]);
    } else { pedidoUsuario.splice(indexProducto, 1, producto) }
    sessionStorage.setItem('pedidoUsuario',JSON.stringify(pedidoUsuario));
  }

  /* SACAR PRODUCTO DE CANASTA */
  sacarProducto = (producto) => {
    let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
    pedidoUsuario = JSON.parse(pedidoUsuario);

    var index = pedidoUsuario.indexOf(producto);
    if (index > -1) {
      pedidoUsuario.splice(index, 1);
      sessionStorage.setItem('pedidoUsuario',JSON.stringify(pedidoUsuario));
    }
  }

  /* EJECUTAR FUNCIONES AL INICIAR APP */
  inicarAplicacion = () => {
    this.obtenerUsuario();
  }

  controlModalIngreso = () => this.setState({ mostrarModalIngreso: !this.state.mostrarModalIngreso });
  
  controlModalCantidad =()=> this.setState({mostrarModalCantidad:!this.state.mostrarModalCantidad});

  componentDidMount() {
    this.inicarAplicacion();
  }

  componentWillUnmount() {
  }

  render() {
    return (<div className="Aplicacion" >

      <ModalIngreso 
        urlAplicacion={this.state.urlAplicacion}
        mostrarModalIngreso={this.state.mostrarModalIngreso}
        controlModalIngreso={this.controlModalIngreso} >
      </ModalIngreso>

      <Mensaje 
        mostrarMensaje={this.state.mostrarMensaje}
        textoMensaje={this.state.textoMensaje}
        tipoMensaje={this.state.tipoMensaje} >
      </Mensaje>

      <Menu     
        urlAplicacion={this.state.urlAplicacion}
        pedidoUsuario={this.state.pedidoUsuario}
        abrirPedido={this.abrirPedido}
        controlModalIngreso={this.controlModalIngreso}
      ></Menu>

      <ModalCantidad   
        controlModalCantidad={this.controlModalCantidad}
        mostrarModalCantidad={this.state.mostrarModalCantidad}
        productoSeleccionado={this.state.productoSeleccionado}
        agregarCantidadProducto={this.agregarCantidadProducto}
      ></ModalCantidad>

      <div className="Paginas" id="paginas">
        <BrowserRouter>
          <Switch>

            <Route exact path="/" render={(props) => 
              <Principal usuarioAplicacion={this.state.usuarioAplicacion} buscarProducto={this.buscarProducto} {...props}/>}/>
           
            <Route path="/usuario/negocio" render={(props) =>
              <Negocio usuarioAplicacion={this.state.usuarioAplicacion} {...props}/>}/>

            <Route path="/usuario/cliente" render={(props) => 
              <Cliente usuarioAplicacion={this.state.usuarioAplicacion} {...props}/>}/>

            <Route path="/productos/buscador/:tipo/:texto" render={(props) =>
              <ProductoBuscador 
                agregarCanasta={this.agregarCanasta}{...props}
                seleccionarProductoCantidad={this.seleccionarProductoCantidad}
              />}/>

            <Route path="/productos/lista" render={(props) =>
              <ProductoLista listarPor={"NEGOCIO"} {...props}/>}/>

          </Switch>
        </BrowserRouter>
      </div>
      <div id="tiendas">
        <MejoresRestaurantes />
      </div>
      <div id="contacto" >
        <Contacto />
      </div> 
      <div id="piepagina">
        <PiePagina />
      </div>
    </div>
    )
  }
}

export default Aplicacion;