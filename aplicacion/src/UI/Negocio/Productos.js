/*
-- Description:     PAGINA PRINCIPAL DE PRODUCTOS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/*** COMPONENTES ***/
import React from 'react';
import Modal from '../../Componentes/Modal';
import { guardarArchivo_DB } from '../../DB/archivoDB';

/*** FUNCIONES ***/
import { obtenerUsuario } from '../../Componentes/Funciones';
import { 
    agregarProducto_DB,
    editarProducto_DB,
    listarProductoPorNegocio_DB,
    listarTiposProducto_DB,
    listarUnidadesProducto_DB } from '../../DB/productoDB';


/*** ICONO SVG ***/
import IconoGoogle from '../../SVG/IconoGoogle';

/*** VARIABLES GLOBALES ***/

const estadoInicial = {

    tiposProducto:[],
    unidadesProducto:[],
    productosNegocio:[],
    
    mostrarModalProducto: false,

    productoSeleccionado: {},
    archivoImagenNuevo:null,
    archivoImagenTempo:null
};

export class Productos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    /********  L I S T A R   *******/

    obtenerTiposProducto =()=> {
        listarTiposProducto_DB().then(lista=>{
            if(!lista.error){
                this.setState({ tiposProducto: lista });
            } else { console.log("ERROR >> LISTAR TIPOS DE PRODUCTO!!..")}
        });
    }

    obtenerUnidadesProducto =()=> {
        listarUnidadesProducto_DB().then(lista=>{
            if(!lista.error){
                this.setState({ unidadesProducto: lista });
            } else { console.log("ERROR >> LISTAR UNIDADES DE PRODUCTO!!..")}
        });
    }

    obtenerProductosNegocio =()=> {
        var idNegocio = this.props.usuarioAplicacion.codigoUsuario;
        listarProductoPorNegocio_DB({idNegocio}).then(lista=>{
            if(!lista.error){
                this.setState({ productosNegocio: lista });
            } else { console.log("ERROR >> LISTAR PRODUCTOS DEL NEGOCIO!!..")}
        });
    }

    /*******   G U A R D A R   *****/
    guardarDatosProducto =(evento)=> {
        evento.preventDefault();
        var tp = document.getElementById('tipoProducto');
        var idTipoProducto = tp.options[tp.selectedIndex].value;

        const datoProducto = {
            idProducto:this.state.productoSeleccionado.idProducto,
            idNegocio:this.props.usuarioAplicacion.codigoUsuario||"1",
            idTipoProducto:idTipoProducto,
            tipoUnidad:document.getElementById('tipoUnidad').value,
            nombreProducto:document.getElementById('nombreProducto').value,
            detalleProducto:document.getElementById('detalleProducto').value,
            precioPorUnidad:(parseFloat(document.getElementById('precioPorUnidad').value)||0).toFixed(2),
            unidadCantidad:(parseFloat(document.getElementById('unidadCantidad').value)||0).toFixed(2),
            descuentoUnidad:(parseFloat(document.getElementById('descuentoUnidad').value)||0).toFixed(2),
            imagenProducto:"/img/productos/"+(this.state.archivoImagenNuevo||{}).name||"",
        }
        if(this.state.archivoImagenNuevo){
            guardarArchivo_DB(this.state.archivoImagenNuevo);
        } else{ console.log("No se selecciono imagen");}
        if(datoProducto.idProducto){            
            editarProducto_DB(datoProducto).then(res=>{
                if(!res.error){
                    this.obtenerProductosNegocio();
                    this.controlModalProducto();
                    this.setState({productoSeleccionado:[]});
                } else { console.log("ERROR >> CAMBIAR PRODUCTO") }
            });
        }else {
            agregarProducto_DB(datoProducto).then(res=>{
                if(!res.error){
                    this.obtenerProductosNegocio();
                    this.controlModalProducto();
                    this.setState({productoSeleccionado:[]});
                } else { console.log("ERROR >> AGREGAR PRODUCTO") }
            });
        }
    }

    /*******  C O N T R O L E S   *****/
    abrirProducto =(Producto)=> {
        this.setState({productoSeleccionado:Producto,archivoImagenNuevo:null,archivoImagenTempo:Producto.imagenProducto||""});
        this.controlModalProducto();
    }

    agregarProducto =()=> {
        this.setState({productoSeleccionado:{},archivoImagenNuevo:null,archivoImagenTempo:null});
        this.controlModalProducto();
    }    

    controlModalProducto =()=> this.setState({mostrarModalProducto:!this.state.mostrarModalProducto});

    cambiarArchivo = (evento) => {
        if(evento.target.files[0]){
            let archivoImagenNuevo = evento.target.files[0];
            this.setState({archivoImagenNuevo,archivoImagenTempo:URL.createObjectURL(archivoImagenNuevo)});
        }        
    }

    /******  I N I C I O   ******/
    iniciarFunciones =()=> {
        this.obtenerTiposProducto();
        this.obtenerUnidadesProducto();
        this.obtenerProductosNegocio();
    }

    componentDidMount(){
        const usuarioAplicacion = obtenerUsuario();
        if(usuarioAplicacion){
            this.iniciarFunciones();
        } else { alert("¡¡USUARIO NO RECONOCIDO!!") }
    }

    render(){
        return(
            <div className="NegocioProductos">
                <div className="Titulo">
                    <button>{"<"}</button>
                    <div>Pedidos registrados</div>
                </div>
                <div className="usuario_encabezado_opciones">
                    <button onClick={this.agregarProducto}> Agregar Producto </button>
                </div>
                {(this.state.productosNegocio||[]).length > 0?
                <div className="usuario_tabla centrado">
                    <table>
                        <thead>
                            <tr>                            
                                <th> PRODUCTO </th>
                                <th> NOMBRE </th>
                                <th> PRECIO<br/>UNIDAD</th>
                                <th> UNIDAD </th>
                            </tr>
                        </thead>
                        {(this.state.productosNegocio||[]).map((producto,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")} onClick={()=>this.abrirProducto(producto)}>
                                    <td> {producto.nombreTipoProducto} </td>
                                    <td> {producto.nombreProducto} </td>
                                    <td> S/. {producto.precioPorUnidad}</td>
                                    <td> {producto.unidadCantidad +" "+producto.tipoUnidad} </td>
                                </tr>
                            </tbody>
                        )})}
                    </table>
                    <div className="usuario_tabla_paginado">
                        Paginado
                    </div>
                </div> :
                <div>No Hay Productos Registrados</div> }

                <Modal
                    mostrarModal = {this.state.mostrarModalProducto}
                    controlModal = {this.controlModalProducto}
                    tituloModal = {"Agregar Producto"}
                >
                <form className="negocio_agregar_producto" validate="true" onSubmit={this.guardarDatosProducto}>
                    
                    <fieldset><legend align="left">Producto</legend>
                        <div>
                            <input required type="text" id="nombreProducto" placeholder="Nombre de Producto" defaultValue={this.state.productoSeleccionado.nombreProducto||""}/>&nbsp;
                            <select id="tipoProducto" defaultValue={this.state.productoSeleccionado.idTipoProducto||"1"}>
                                {(this.state.tiposProducto||[]).map(tipo=>
                                    <option key={tipo.idtipoProducto} value={tipo.idtipoProducto}>{tipo.nombreTipoProducto}</option>
                                )}
                            </select>
                        </div>
                    </fieldset>

                    <div className="negocio_agregar_producto_costo">
                        <fieldset><legend align="left">Precio x Cantidad</legend>
                            <div>
                                <label>S/.</label>&nbsp;
                                <input required type="decimal" id="precioPorUnidad" placeholder="0.00" 
                                    defaultValue={(parseFloat(this.state.productoSeleccionado.precioPorUnidad)||0).toFixed(2)||"0.00"}/>&nbsp;
                                <label>Por</label>&nbsp;
                                <input required type="decimal" id="unidadCantidad" placeholder="0" 
                                    defaultValue={(parseFloat(this.state.productoSeleccionado.unidadCantidad)||0).toFixed(2)||"0"}/>&nbsp;
                                <select id="tipoUnidad" defaultValue={this.state.productoSeleccionado.tipoUnidad||""}>
                                    {(this.state.unidadesProducto||[]).map(tipo=>
                                        <option key={tipo.nombreTipoUnidad} value={tipo.nombreTipoUnidad}>{tipo.nombreTipoUnidad}</option>
                                    )}
                                </select>
                            </div>
                        </fieldset>
                        <fieldset><legend align="left">Descuento</legend>
                            <div>
                                <input type="decimal" min="0" max="100" id="descuentoUnidad" placeholder="0" 
                                    defaultValue={(parseFloat(this.state.productoSeleccionado.descuentoUnidad)||0).toFixed(2)||"0"}/>&nbsp;
                                <label>&nbsp;%</label>
                            </div>
                        </fieldset>
                    </div>

                    <fieldset><legend align="left">Detalle</legend>
                        <textarea rows="6" id="detalleProducto" placeholder="Ej. Zapatillas Nike Originales de Excelente Canlidad" 
                            defaultValue={this.state.productoSeleccionado.detalleProducto||""}></textarea>
                    </fieldset>
   
                    <fieldset><legend align="left">Imagen</legend>
                        <div className="negocio_agregar_producto_imagen">
                            {this.state.archivoImagenTempo===null?null:
                            <div className="centrado">
                                <img src={this.state.archivoImagenTempo} alt="Imagen Producto"/>
                            </div>}

                            <div className="negocio_agregar_producto_imagen_boton">
                                <input type="file" id="imagenProducto" accept="image/*" onChange={(e)=> this.cambiarArchivo(e)}/>
                                <label htmlFor="imagenProducto"> <IconoGoogle fill="#fefefe"/> Subir Imagen</label>
                            </div>
                        </div>
                    </fieldset>

                    <div className="centrado">
                        <button type="submit"> Guardar Cambios </button>
                    </div>

                </form>
                </Modal>   
            </div>
        )
    }
}

export default Productos;