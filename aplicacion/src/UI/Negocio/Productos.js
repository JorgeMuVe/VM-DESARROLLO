/*
-- Description:     PAGINA PRINCIPAL DE PRODUCTOS DE NEGOCIO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';
import Modal from '../../Componentes/Modal';

/** ICONO SVG **/
import IconoGoogle from '../../SVG/IconoGoogle';

/* VARIABLES GLOBALES */

const estadoInicial = {
    mostrarModalAgregar: false,

    productoSeleccionado: {
    },

    archivoImagenNuevo:null,
    archivoImagenTempo:null
};

export class Productos extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    controlModalAgregar =()=> this.setState({mostrarModalAgregar:!this.state.mostrarModalAgregar});

    setFileMedia = (evento) => {
        if(evento.target.files[0]){
            let archivoImagenNuevo = evento.target.files[0];
            this.setState({archivoImagenNuevo,archivoImagenTempo:URL.createObjectURL(archivoImagenNuevo),
            }, console.log(this.state));
        }        
    }

    guardarDatosProducto =(evento)=> {
        evento.preventDefault();
        const datoProducto = {
            nombreProducto:document.getElementById('nombreProducto').value,
            tipoUnidad:document.getElementById('tipoUnidad').value,
            precioPorUnidad:(parseFloat(document.getElementById('precioPorUnidad').value)||0).toFixed(2),
            unidadCantidad:document.getElementById('unidadCantidad').value,
            descuentoUnidad:document.getElementById('descuentoUnidad').value,
            detalleProducto:document.getElementById('detalleProducto').value,
            imagenProducto:(this.state.archivoImagenNuevo||{}).name,
        }
        console.log(datoProducto);
        //alert("Se agregara producto");
    }

    render(){
        return(
            <div className="NegocioProductos">
                <div className="usuario_encabezado">
                    <label> PRODUCTOS PUBLICADOS</label>
                    <div className="usuario_encabezado_opciones"><button onClick={this.controlModalAgregar}> Agregar Producto </button></div>
                </div>
                {(this.state.productosNegocio||[1]).length > 0?
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
                        {(this.state.productosNegocio||[1,2,3,4,5,6]).map((producto,i) => {
                            return ( 
                            <tbody key={i}>
                                <tr className={(i%2!==0?" interlinea":"")}>
                                    <td> Ejemplo </td>
                                    <td> Producto {i}</td>
                                    <td> S/. 10.00 </td>
                                    <td> KG </td>
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
                    mostrarModal = {this.state.mostrarModalAgregar}
                    controlModal = {this.controlModalAgregar}
                    tituloModal = {"Agregar Producto"}
                >
                <form className="negocio_agregar_producto" validate="true" onSubmit={this.guardarDatosProducto}>
                    <div className="negocio_agregar_producto_general">
                        <fieldset><legend align="left">Nombre</legend>
                            <input required type="text" id="nombreProducto" placeholder="Ej. Zapatilla Nike" defaultValue={this.state.productoSeleccionado.nombre||""}/>
                        </fieldset>
                        <fieldset><legend align="left">Unidad</legend>
                            <select id="tipoUnidad">                            
                                <option>UNI</option>
                                <option>KG</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="negocio_agregar_producto_costo">
                        <fieldset><legend align="left">Precio</legend>
                            <div>
                                <label>S/.&nbsp;</label>
                                <input required type="number" id="precioPorUnidad" placeholder="10.00" defaultValue={this.state.productoSeleccionado.ruc||""}/>
                            </div>
                        </fieldset>
                        <fieldset><legend align="left">cantidad</legend>
                            <div>
                                <input required type="number" id="unidadCantidad" placeholder="1" defaultValue={this.state.productoSeleccionado.correo||""}/>                            
                                <label>&nbsp;UNI</label>
                            </div>
                        </fieldset>
                        <fieldset><legend align="left">Descuento</legend>
                            <div>
                                <input type="number" min="0" max="100" id="descuentoUnidad" placeholder="10.5" defaultValue={this.state.productoSeleccionado.telefono||""}/>
                                <label>&nbsp;%</label>
                            </div>
                        </fieldset>
                    </div>

                    <fieldset><legend align="left">Detalle</legend>
                        <textarea rows="6" id="detalleProducto" placeholder="Ej. Zapatillas Nike Originales de Excelente Canlidad" defaultValue={this.state.productoSeleccionado.descripcion||""}></textarea>
                    </fieldset>

                   
                    <fieldset><legend align="left">Imagen</legend>
                        <div className="negocio_agregar_producto_imagen">
                            {this.state.archivoImagenTempo===null?null:
                            <div className="centrado">
                                <img src={this.state.archivoImagenTempo} alt="Imagen Producto"/>
                            </div>}

                            <div className="negocio_agregar_producto_imagen_boton">
                                <input type="file" id="imagenProducto" accept="image/*" onChange={(e)=> this.setFileMedia(e)}/>
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


/*


<div>
    <label for="mediaProducto"> Imagen:</label>
    <div class="custom-file">
        <input type="file" class="custom-file-input" id="customFileLang" lang="es"
            onChange = { e => this.setFileMedia(e) }
        />
        <label data-browse="Buscar" class="custom-file-label" for="customFileLang">{ this.state.nombreFile}</label>
    </div>
</div>

<div>
    <img src={this.state.fileTemporal} alt={this.state.producto.descripcionProducto} className="imagenProducto"/>
</div>


*/
