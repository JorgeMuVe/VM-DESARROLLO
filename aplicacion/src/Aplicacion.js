/*
-- Description:      APLICACIÓN TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* ********   F U N C I O N E S ************ */
import { agregarUsuario_DB, ingresarSistema_DB } from './DB/usuarioDB';
import { listarProductoPorTipo_DB } from './DB/productoDB';

import { urlAplicacionDesarrollo } from './Componentes/Funciones'
import { urlAplicacionPublica } from './Componentes/Funciones'

/* *********  C O M P O N E N T E S   ************/
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; // Libreria React-Router
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
    tipoUsuario: "invitado",
    codigoUsuario: ""
  },

  // Productos
  mostrarModalCantidad: false,
  productoSeleccionado: {},
  productosPorTipo: [],

  // Pedido Usuario
  mostrarModalPedido: false,
  pedidoUsuario: [],

  // Notificaciones
  notificaciones: [1],

  /*  *************************** */
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

  /* CONTROL MODAL PEDIDO LISTA */
  controlModalPedido = () => {
    this.setState({ mostrarModalPedido: !this.state.mostrarModalPedido });
  }


  /*******  U   S   U   A   R   I   O   ******/
  /* VERIFICACION */
  verificarDatosUsuario = (nuevoUsuario) => {
    if (nuevoUsuario) { return true } else { return false }
  }

  /* ABRIR MODAL INGRESO CUENTA */
  abrirModalIngreso =()=> {
    const {usuarioAplicacion} = this.state;
    if(usuarioAplicacion.tipoUsuario==="invitado"){
      this.controlModalIngreso();
    }else { window.location.href = '/usuario/'+usuarioAplicacion.tipoUsuario; }
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
  ingresarSistema = (ingresoUsuario) => {
    if (this.verificarDatosUsuario(ingresoUsuario)) {
      ingresarSistema_DB(ingresoUsuario).then(res => {
        if (!res.error) {
          this.setState({ usuarioAplicacion: res[0] }, () => {
            sessionStorage.setItem('usuarioAplicacion',JSON.stringify(res[0]));
            window.location.href = '/usuario/'+res[0].tipoUsuario;
          });
        } else { this.abrirError(4000, res.error); }
      });
    } else { this.abrirError(4000, 'DATOS INCOMPLETOS') }
  }

  /* OBTENER USUARIO */
  obtenerUsuario = () => {
    let usuarioAplicacion = JSON.parse(sessionStorage.getItem('usuarioAplicacion'));
    if(usuarioAplicacion) this.setState({usuarioAplicacion});
  }

  /* SALIR SISTEMA */
  salirSistema =()=> {
    this.setState({ usuarioAplicacion: {} }, () => {
      sessionStorage.removeItem('usuarioAplicacion');
      window.location.href = '/'
    });
  }


  /***************************************************************/
  /******   P   R   O   D   U   C   T   O    ******/
  /* OBTENER PRODUCTOS */
  listarProductoPorTipo = (idTipoProducto) => {
    const buscaProducto = { tipoProducto: idTipoProducto }
    listarProductoPorTipo_DB(buscaProducto).then(productos => {
      this.setState({ productosPorTipo: productos });
    });
  }

   /* OBTENER PEDIDO */
  listarPedidoUsuario =()=> {
    let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
    pedidoUsuario = JSON.parse(pedidoUsuario);
    this.setState({pedidoUsuario});
  }

  /* SELECCIONAR PRODUCTO */
  seleccionarProductoCantidad =(productoSeleccionado)=> {
    let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
    pedidoUsuario = JSON.parse(pedidoUsuario);
    var indexProducto = this.buscarProductoPedido(pedidoUsuario,productoSeleccionado.idProducto);
    if(indexProducto>0)productoSeleccionado["cantidadProducto"] = (pedidoUsuario[indexProducto]||{}).cantidadProducto;
    this.setState({productoSeleccionado},()=>this.controlModalCantidad())
  }

  /* CAMBIAR CANTIDAD PRODUCTO SELECCIONADO */
  cambiarCantidadProducto =(aumentar)=> {
    
    const { productoSeleccionado } = this.state;
    if(aumentar){
      productoSeleccionado["cantidadProducto"]=(parseFloat(productoSeleccionado.cantidadProducto||0) + 1).toFixed(2)
    }else {
      if(productoSeleccionado.cantidadProducto>0){
        productoSeleccionado["cantidadProducto"]=(parseFloat(productoSeleccionado.cantidadProducto||0) - 1).toFixed(2)
      }
    }
    
    //const { productoSeleccionado } = this.state;
    //productoSeleccionado["cantidadProducto"] = evento.target.value;
    this.setState({ productoSeleccionado });
  }

  /* BUSCAR PRODUCTO EN PEDIDO */
  buscarProductoPedido =(pedidoUsuario,idProducto)=> {
    var indexOf = -1;
    (pedidoUsuario||[]).forEach((p,i)=>{if(p.idProducto===idProducto){indexOf=i}});
    return indexOf;
  }

  /* AGREGAR CANTIDAD A PRODUCTO */
  agregarCantidadProducto =(evento)=> {
    evento.preventDefault();
    const { productoSeleccionado } = this.state;
    this.agregarCanasta(productoSeleccionado);
    this.controlModalCantidad();
  }

  /* AGREGAR PRODUCTO A CANASTA */
  agregarCanasta = (producto) => {
    let pedidoUsuario = JSON.parse(sessionStorage.getItem('pedidoUsuario'));
    var indexProducto = this.buscarProductoPedido(pedidoUsuario,producto.idProducto);
    if(indexProducto < 0){ pedidoUsuario = (pedidoUsuario||[]).concat([producto]);
    } else { pedidoUsuario.splice(indexProducto, 1, producto) }
    this.setState({pedidoUsuario},()=>{    
      sessionStorage.setItem('pedidoUsuario',JSON.stringify(pedidoUsuario));
    });
  }

  /* SACAR PRODUCTO DE CANASTA */
  sacarProducto = (producto) => {
    let pedidoUsuario = sessionStorage.getItem('pedidoUsuario');
    pedidoUsuario = JSON.parse(pedidoUsuario);
    var indexProducto = this.buscarProductoPedido(pedidoUsuario,producto.idProducto);
    if (indexProducto > -1) {
      pedidoUsuario.splice(indexProducto, 1);
      this.setState({pedidoUsuario},()=>{    
        sessionStorage.setItem('pedidoUsuario',JSON.stringify(pedidoUsuario));
      });
    }
  }

  /************************************************************** */


  /**********  A   P   L   I   C   A   C   I   O   N    ***********/
  /* EJECUTAR FUNCIONES AL INICIAR APP */
  inicarAplicacion = () => {
    this.obtenerUsuario();
    this.listarPedidoUsuario();
  }

  controlModalIngreso = () => this.setState({ mostrarModalIngreso: !this.state.mostrarModalIngreso });
  
  controlModalCantidad =()=> this.setState({mostrarModalCantidad:!this.state.mostrarModalCantidad});

  componentDidMount() {
    this.inicarAplicacion();
  }

  componentWillUnmount() {
  }
  
  /************************>>>>>>RENDER<<<<<<****************************** */
  render() {
    return (<div className="Aplicacion" >

      <ModalIngreso 
        urlAplicacion={this.state.urlAplicacion}
        ingresarSistema={this.ingresarSistema}
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
        usuarioAplicacion={this.state.usuarioAplicacion}
        pedidoUsuario={this.state.pedidoUsuario}
        seleccionarProductoCantidad={this.seleccionarProductoCantidad}
        sacarProducto={this.sacarProducto}
        controlModalIngreso={this.abrirModalIngreso}
      ></Menu>

      <ModalCantidad   
        controlModalCantidad={this.controlModalCantidad}
        mostrarModalCantidad={this.state.mostrarModalCantidad}
        productoSeleccionado={this.state.productoSeleccionado}
        cambiarCantidadProducto={this.cambiarCantidadProducto}
        agregarCantidadProducto={this.agregarCantidadProducto}
      ></ModalCantidad>

      <div className="Paginas" id="paginas">
        <BrowserRouter>
          <Switch>

            <Route exact path="/" render={(props) => 
              <Principal usuarioAplicacion={this.state.usuarioAplicacion} {...props}/>}/>
           
            <Route path="/usuario/negocio/:pagina" render={(props) =>
              <Negocio usuarioAplicacion={this.state.usuarioAplicacion} {...props}
              salirSistema={this.salirSistema} />}/>
            <Redirect from="/usuario/negocio" to="/usuario/negocio/pedidos"></Redirect>

            <Route path="/usuario/cliente" render={(props) => 
              <Cliente usuarioAplicacion={this.state.usuarioAplicacion} salirSistema={this.salirSistema} {...props}/>}/>

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