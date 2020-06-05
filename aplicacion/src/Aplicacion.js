/*
-- Description:      APLICACIÓN TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* ********   F U N C I O N E S ************ */
import { listarProductoPorTipo_DB } from './DB/productoDB';


/* *********  C O M P O N E N T E S   ************/
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // Libreria React-Router
import React, { Component } from 'react';
import Menu from './Componentes/Menu.js';
import MenuUsuario from './Componentes/MenuUsuario';
import MenuAplicacion from './Componentes/MenuAplicacion';
import Contacto from './Componentes/Contacto';
import PiePagina from './Componentes/PiePagina';
import MejoresRestaurantes from './Componentes/MejoresRestaurantes';
import PerfilTienda from './Componentes/PerfilTienda';

/* *********  I N T E R F A Z   **********/
import Principal from './UI/Paginas/Principal';
import Registro from './UI/Registro/Registro';
import Buscador from './UI/Paginas/Buscador';
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
  /***** M E N U  *****/
  mostrarMenuUsuario:false,
  mostrarMenuAplicacion:false,

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
            controlModalPedido={this.controlModalPedido}
            controlModalIngreso={this.abrirModalIngreso}
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
              <Principal usuarioAplicacion={this.state.usuarioAplicacion} {...props}/>}>
            </Route>

            <Route path="/registro" render={(props)=><Registro ingresarSistema={this.ingresarSistema}{...props}/>}></Route>
          
            <Route path="/lima" render={(props)=><Buscador ciudad={"lima"} {...props}/>}></Route>

            <Route path="/cusco" render={(props)=><Buscador ciudad={"cusco"} {...props}/>}></Route>

            <Route path="/arequipa" render={(props)=><Buscador ciudad={"arequipa"} {...props}/>}></Route>

            <Route path="/categoria/:categoria" render={(props)=><Categorias {...props}/>}></Route>

            <Route path="/perfiltienda/:idTienda" render={(props)=><PerfilTienda  {...props}/>}></Route>
            
            <Route path="/tiendas/:tipo" render={(props)=><Tiendas {...props}/>}></Route>
           
            <Route path="/usuario/admin/:ruta" render={(props) => 
              <Admin 
                salirSistema={this.salirSistema}
                controlMenuUsuario={this.cerrarMenuUsuario}{...props}/>
            }></Route>

            <Route path="/usuario/negocio/:ruta" render={(props) => 
              <Negocio salirSistema={this.salirSistema}
                abrirMensajeError={this.abrirMensajeError}
                controlMenuUsuario={this.cerrarMenuUsuario}{...props}/>
            }></Route>
           
            <Route path="/usuario/tienda/:ruta" render={(props) => 
              <Tienda salirSistema={this.salirSistema}
                controlMenuUsuario={this.cerrarMenuUsuario}{...props} />
            }></Route>

            <Route path="/usuario/cliente/:ruta" render={(props) => 
              <Cliente salirSistema={this.salirSistema}
                sacarProducto={this.sacarProducto}
                confirmarPedido={this.confirmarPedido}
                controlMenuUsuario={this.cerrarMenuUsuario}{...props}/>
            }></Route>

            <Route path="/productos/buscador/:tipo/:texto" render={(props) =>
              <ProductoBuscador 
                agregarCanasta={this.agregarCanasta}{...props}
                seleccionarProductoCantidad={this.seleccionarProductoCantidad}/>
            }></Route>

            <Route path="/productos/lista" render={(props) =>
              <ProductoLista listarPor={"NEGOCIO"} {...props}/>
            }></Route>

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

/*
DELIMITER $$
CREATE PROCEDURE editarNegocio(
	IN `@idNegocio` INT(10) UNSIGNED,
    IN `@idTipoNegocio` INT(10) UNSIGNED,
    IN `@nombreNegocio` VARCHAR(250),
    IN `@ruc` VARCHAR(11),
    IN `@logo` VARCHAR(250),
    IN `@correoNegocio` VARCHAR(250),
    IN `@telefonoNegocio` VARCHAR(250),
    IN `@descripcionNegocio` VARCHAR(250))
BEGIN

UPDATE negocio SET
idTipoNegocio = `@idTipoNegocio`,
nombreNegocio = `@nombreNegocio`,
ruc = `@ruc`, logo = `@logo`,
correoNegocio = `@correoNegocio`,
telefonoNegocio = `@telefonoNegocio`,
descripcionNegocio = `@descripcionNegocio`
WHERE idNegocio = `@idNegocio`;

END$$
DELIMITER ;

CREATE TABLE ciudad(
    idCiudad INT(10) unsigned PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
    nombreCiudad VARCHAR(250)
);
$$
DELIMITER ;
*/