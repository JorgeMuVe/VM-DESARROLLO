/* ********   F U N C I O N E S ************ */
import { listarProductoPorTipo_DB,buscarProducto_DB } from './DB/productoDB';
import { listarNegociosPorTipo_DB,  } from './DB/negocioDB';

/* *********  C O M P O N E N T E S   ************/
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Libreria React-Router
import React, { Component } from 'react';
import Menu from './Componentes/Menu2.js';
import MenuUsuario from './Componentes/MenuUsuario';
import MenuAplicacion from './Componentes/MenuAplicacion';
import Contacto from './Componentes/Contacto';
import PiePagina from './Componentes/PiePagina';
import Socios from './Componentes/Socios';
import PerfilTienda from './Componentes/PerfilTienda';

/* *********  I N T E R F A Z   **********/
import Principal from './UI/Paginas/Principal';
import Registro from './UI/Registro/Registro';
import Confirmar from './UI/Registro/Confirmar';
import Tiendas from './UI/Paginas/Tiendas';
import Categorias from './UI/Paginas/Categoria';
import Admin from './UI/Admin/Admin';
import Negocio from './UI/Negocio/Negocio';
import Cliente from './UI/Cliente/Cliente';
import Tienda from './UI/Tienda/Tienda';
import ProductoLista from './UI/Producto/ProductoLista';
import ProductoBuscador from './UI/Producto/ProductoBuscador';

/* ********* M O D A L ************* */
import ModalIngreso from './Componentes/ModalIngreso';
import ModalCantidad from './Componentes/ModalCantidad';
import ModalPedido from './Componentes/ModalPedido';
import Mensaje from './Componentes/Mensaje.js';

/* *******   V A R I A B L E S  G L O B A L E S **********/
const estadoInicial = {
  /** CIUDAD */
  ciudad:"ciudad",
  /***** M E N U  *****/
  mostrarMenuUsuario:false,
  mostrarMenuAplicacion:false,

  /**** CUADRO DE MENSAJE ****/
  mostrarMensaje: false,
  textoMensaje: '',
  tipoMensaje: '',

  /**** DATOS DE APLICACION *******/
  // Negocio
  categoriaNegocios:[],
  categoriaProductos:[],

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

  productosPaginaActual:1,
  productosCantidadPaginas:1,
  productosPorPagina:12,

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

  /*******  U   S   U   A   R   I   O   ******/
  /* INGRESAR AL SISTEMA */
  ingresarSistema = (usuarioAplicacion) => {
    if(usuarioAplicacion){this.setState({usuarioAplicacion,mostrarModalIngreso:false});}
  }

  /* OBTENER USUARIO */
  obtenerUsuario = () => {
    let usuarioAplicacion = JSON.parse(sessionStorage.getItem('usuarioAplicacion'));
    if(usuarioAplicacion) this.setState({usuarioAplicacion});
  }

  /* SALIR SISTEMA */
  salirSistema =()=> {
    console.log("SALIENDO DEL SISTEMA!!:.");
    this.setState({ usuarioAplicacion: {} }, () => {
      sessionStorage.removeItem('usuarioAplicacion');
      window.location.href = '/'
    });
  }

  /******   CATEGORIAS  ******/
  productosPaginaSiguiente =(categoria)=> {
    console.log(categoria);
    const { productosPaginaActual, productosCantidadPaginas } = this.state;
    if(productosPaginaActual < productosCantidadPaginas) 
      this.setState({productosPaginaActual:productosPaginaActual+1},()=>this.buscarProductoCategoria(categoria))
  }

  productosPaginaAtras =(categoria)=> {
    const { productosPaginaActual } = this.state;
    if(productosPaginaActual>1) this.setState({productosPaginaActual:productosPaginaActual-1},()=>this.buscarProductoCategoria(categoria))
  }

  cambiarCategoria =(categoria)=> {
    var categoriaNegocios=[];
    var categoriaProductos=[];
    var productosCantidadPaginas=1;

    var idCategoria = this.verificarCategoria(categoria)
    const Negocio = {idTipoNegocio:idCategoria};
    const Buscador={
      ciudad:"cusco",tipo:"TIPONEGOCIO",texto: "_",id:idCategoria,
      inicio: (this.state.productosPaginaActual-1)*this.state.productosCantidadPaginas,
      cantidad: this.state.productosPorPagina
    };

    listarNegociosPorTipo_DB(Negocio).then(resNegocio=>{
      buscarProducto_DB(Buscador).then(resProducto=>{
        if(!resNegocio.error){ categoriaNegocios = resNegocio };
        if(!resProducto.error){ 
          categoriaProductos = resProducto;
          productosCantidadPaginas = (resProducto[0].cantidadProductos / this.state.productosPorPagina);
          productosCantidadPaginas = Math.ceil(productosCantidadPaginas||1);
        };
        this.setState({productosCantidadPaginas,categoriaNegocios,categoriaProductos});
      });
    });
  }

  buscarProductoCategoria =(categoria)=> {
    var idCategoria = this.verificarCategoria(categoria);
    var productosCantidadPaginas=1;
    const Buscador={
      ciudad:"cusco",tipo:"TIPONEGOCIO",texto: "_",id:idCategoria,
      inicio: (this.state.productosPaginaActual-1)*this.state.productosCantidadPaginas,
      cantidad: this.state.productosPorPagina
    };

    buscarProducto_DB(Buscador).then(resProducto=>{
      if(!resProducto.error){ 
        productosCantidadPaginas = (resProducto[0].cantidadProductos / this.state.productosPorPagina);
        productosCantidadPaginas = Math.ceil(productosCantidadPaginas||1);
        this.setState({productosCantidadPaginas,categoriaProductos:resProducto});
      };
    });
  }

  verificarCategoria =(categoria)=> {
    var idCategoria = 0;
    switch (categoria) {
        case "mercados": idCategoria=1; break;
        case "restaurantes": idCategoria=2; break;
        case "comercios": idCategoria=3; break;
        case "supermercados": idCategoria=4; break;
        case "farmacias": idCategoria=5; break;
        case "servicios": idCategoria=6; break;
        default: idCategoria=0; break;
    }
    return idCategoria;
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

  confirmarPedido =()=> {
    this.setState({pedidoUsuario:{}},()=>{    
      sessionStorage.removeItem('pedidoUsuario');
    });
  }

  /**********  A   P   L   I   C   A   C   I   O   N    ***********/
  
  /* CONTROL MODAL */
  abrirMensajeError = (tiempo, mensaje) => {
    this.setState({ mostrarMensaje: true, textoMensaje: mensaje, tipoMensaje: 'error' }, () => {
      setTimeout(() => this.setState({ mostrarMensaje: false, textoMensaje: '', tipoMensaje: '' }), tiempo)
    })
  }

  abrirModalIngreso =()=> {
    const {usuarioAplicacion} = this.state;
    if(usuarioAplicacion.tipoUsuario==="invitado") this.controlModalIngreso()
    else this.controlMenuUsuario()
  }

  cerrarMenuUsuario =()=> this.setState({mostrarMenuUsuario:false});

  cambiarNuevoUsuario =(nuevoUsuario)=> { this.setState({ nuevoUsuario }) }

  cambiarCiudad =(ciudad)=> {
    sessionStorage.setItem('ciudad',ciudad);
    this.setState({ciudad})
  }

  controlMenuAplicacion =()=> {
    this.setState({mostrarMenuAplicacion:!this.state.mostrarMenuAplicacion,
      mostrarMenuUsuario:false,mostrarModalIngreso:false,mostrarModalPedido:false,mostrarModalCantidad:false});
  }

  controlMenuUsuario =()=> {
    this.setState({mostrarMenuUsuario:!this.state.mostrarMenuUsuario,
      mostrarMenuAplicacion:false,mostrarModalIngreso:false,mostrarModalPedido:false,mostrarModalCantidad:false});
  }

  controlModalIngreso =()=> {
    this.setState({mostrarModalIngreso:!this.state.mostrarModalIngreso,
      mostrarMenuAplicacion:false,mostrarMenuUsuario:false,mostrarModalPedido:false,mostrarModalCantidad:false});
  }

  controlModalPedido =()=> {
    this.setState({mostrarModalPedido:!this.state.mostrarModalPedido,
      mostrarMenuAplicacion:false,mostrarMenuUsuario:false,mostrarModalIngreso:false,mostrarModalCantidad:false});
  }
  
  controlModalCantidad =()=> {
    this.setState({mostrarModalCantidad:!this.state.mostrarModalCantidad,
      mostrarMenuAplicacion:false,mostrarMenuUsuario:false,mostrarModalIngreso:false,mostrarModalPedido:false});
  }

  /* EJECUTAR FUNCIONES AL INICIAR APP */
  inicarAplicacion = () => {
    this.obtenerUsuario();
    this.listarPedidoUsuario();
  }

  componentDidMount() {
    this.inicarAplicacion();
  }
  
  /************************>>>>>>RENDER<<<<<<****************************** */
  render() {
    return (<div className="Aplicacion" >
      
      <Mensaje 
        mostrarMensaje={this.state.mostrarMensaje}
        textoMensaje={this.state.textoMensaje}
        tipoMensaje={this.state.tipoMensaje} >
      </Mensaje>

      <ModalCantidad   
        controlModalCantidad={this.controlModalCantidad}
        mostrarModalCantidad={this.state.mostrarModalCantidad}
        productoSeleccionado={this.state.productoSeleccionado}
        cambiarCantidadProducto={this.cambiarCantidadProducto}
        agregarCantidadProducto={this.agregarCantidadProducto}
      ></ModalCantidad>
      

      <div className="Paginas" id="paginas">
        <BrowserRouter>
          <ModalIngreso
            mostrarModalIngreso={this.state.mostrarModalIngreso}
            controlModalIngreso={this.controlModalIngreso}
            ingresarSistema={this.ingresarSistema}
            abrirMensajeError={this.abrirMensajeError}>
          </ModalIngreso>
          <Menu
            usuarioAplicacion={this.state.usuarioAplicacion}
            controlMenuAplicacion={this.controlMenuAplicacion}
            cambiarCiudad={this.cambiarCiudad}
            ciudad={this.state.ciudad}
            controlModalPedido={this.controlModalPedido}
            controlModalIngreso={this.abrirModalIngreso}
            cambiarCategoria={this.cambiarCategoria}
          >
            <MenuAplicacion
              mostrarMenuAplicacion={this.state.mostrarMenuAplicacion}/>

            <ModalPedido
              mostrarPedido={this.state.mostrarModalPedido}
              pedidoUsuario={this.state.pedidoUsuario}
              seleccionarProductoCantidad={this.seleccionarProductoCantidad}
              controlModalPedido={this.controlModalPedido}
              controlModalIngreso={this.controlModalIngreso}
              sacarProducto={this.sacarProducto}/>
            
            <MenuUsuario
              mostrarMenuUsuario={this.state.mostrarMenuUsuario}
              usuarioAplicacion={this.state.usuarioAplicacion}
              salirSistema={this.salirSistema}
              controlMenuUsuario={this.cerrarMenuUsuario}/>
           </Menu>
          <Switch>
            
            <Route exact path="/" render={(props) => 
              <Principal seleccionarProductoCantidad={this.seleccionarProductoCantidad}{...props}/>}>
            </Route>

            <Route path="/registro" render={(props)=>
              <Registro cambiarNuevoUsuario={this.cambiarNuevoUsuario}{...props}/>}>
            </Route>            

            <Route path="/confirmar" render={(props)=>
              <Confirmar ingresarSistema={this.ingresarSistema} abrirMensajeError={this.abrirMensajeError} nuevoUsuario={this.state.nuevoUsuario} {...props}/>}>
            </Route>

            <Route path="/categoria/:categoria" render={(props)=>
              <Categorias 
                categoriaNegocios={this.state.categoriaNegocios}
                categoriaProductos={this.state.categoriaProductos}
                
                paginaActual={this.state.productosPaginaActual}
                cantidadPaginas={this.state.productosCantidadPaginas}
                paginaSiguiente={this.productosPaginaSiguiente}
                paginaAtras={this.productosPaginaAtras}
                cambiarCategoria={this.cambiarCategoria}
                seleccionarProductoCantidad={this.seleccionarProductoCantidad}{...props}/>}>
            </Route>

            <Route path="/perfiltienda/:idTienda" render={(props)=>
              <PerfilTienda agregarCanasta={this.agregarCanasta}{...props} seleccionarProductoCantidad={this.seleccionarProductoCantidad} {...props}/>}>
            </Route>

            <Route path="/tiendas" render={(props) =>
              <Socios {...props}/>}>
            </Route>
            
            <Route path="/tiendas/:tipo" render={(props)=>
              <Tiendas {...props}/>}>
            </Route>
           
            <Route path="/usuario/admin/:ruta" render={(props) => 
              <Admin salirSistema={this.salirSistema} controlMenuUsuario={this.cerrarMenuUsuario}{...props}/>}>
            </Route>

            <Route path="/usuario/negocio/:ruta" render={(props) => 
              <Negocio salirSistema={this.salirSistema} abrirMensajeError={this.abrirMensajeError} controlMenuUsuario={this.cerrarMenuUsuario}{...props}/>}>
            </Route>
           
            <Route path="/usuario/tienda/:ruta" render={(props) => 
              <Tienda salirSistema={this.salirSistema} controlMenuUsuario={this.cerrarMenuUsuario}{...props} />}>
            </Route>

            <Route path="/usuario/cliente/:ruta" render={(props) => 
              <Cliente salirSistema={this.salirSistema} sacarProducto={this.sacarProducto}
                confirmarPedido={this.confirmarPedido}controlMenuUsuario={this.cerrarMenuUsuario}{...props}/>}>
            </Route>

            <Route path="/productos/buscador/:ciudad/:tipo/:id/:texto" render={(props) =>
              <ProductoBuscador seleccionarProductoCantidad={this.seleccionarProductoCantidad} {...props}/>}>
            </Route>

            <Route path="/productos/lista" render={(props) =>
              <ProductoLista listarPor={"NEGOCIO"} {...props}/>}>
            </Route>

          </Switch>
        </BrowserRouter>
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