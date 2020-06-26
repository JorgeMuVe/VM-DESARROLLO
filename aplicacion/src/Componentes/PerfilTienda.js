/*
-- Description:      PIE DE PAGINA DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

import { buscarPerfilTienda_DB } from '../DB/tiendaDB'
import { listarProductoPorTienda_DB } from '../DB/productoDB'
import Paginado from '../Componentes/Paginado';

/* ICONOS */
import IconoTelContact from '../SVG/IconoTelContact';
import IconoUbiContact from '../SVG/IconoUbiContact';
import IconoFacebook from '../SVG/IconoFacebookContact';
import IconoIgContact from '../SVG/IconoIgContact';

/* VARIABLES GLOBALES */
const estadoInicial = {
    perfilTienda: {},
    paginaActual: 1,
    cantidadPaginas: 1,
    productosPorPagina: 10,
    tabActivo: "productos"
};

export class PiePagina extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    obtenerProductosTienda = () => {
        const Buscador = {
            codigoUsuario: this.state.perfilTienda.codigoUsuario,
            inicio: (this.state.paginaActual - 1) * this.state.productosPorPagina,
            cantidad: this.state.productosPorPagina
        };
        listarProductoPorTienda_DB(Buscador).then(res => {
            if (!res.error) {
                var cantidadPaginas = (res.cantidadProductos / this.state.productosPorPagina);
                cantidadPaginas = Math.ceil(cantidadPaginas || 1);
                this.setState({ cantidadPaginas, productosTienda: res.listaProductos })
            } else { console.log("ERROR >> LISTAR PRODUCTOS DEL TIENDA!!..") }
        });
    }

    paginaSiguiente = () => {
        const { paginaActual, cantidadPaginas } = this.state;
        if (paginaActual < cantidadPaginas) {
            this.setState({ paginaActual: paginaActual + 1 }, () => {
                this.obtenerProductosTienda();
            });
        }
    }

    paginaAtras = () => {
        const { paginaActual } = this.state;
        if (paginaActual > 1) {
            this.setState({ paginaActual: paginaActual - 1 }, () => {
                this.obtenerProductosTienda();
            });
        }
    }

    mostrarTabTienda = (tabActivo) => this.setState({ tabActivo })

    componentDidMount() {
        const Tienda = { idTienda: this.props.match.params.idTienda }
        buscarPerfilTienda_DB(Tienda).then(res => {
            this.setState({ perfilTienda: res, archivoImagenTempo: res.logo }, () => {
                this.obtenerProductosTienda()
            })
        })
    }

    render() {
        return (
            <div className="PerfilTienda">
                <div className="centrado">
                    <div className="tarjetaInfoPerfilTienda">
                        <div className="imagenPerfilTienda">
                        </div>
                        <figcaption><img alt="Logo Negocio" src='/img/negocios/logo_hampina.png'></img></figcaption>
                        <div className="datosPerfiltienda">
                            <h2 className="centrado texto_temaRojo">{this.state.perfilTienda.nombreTienda}</h2>
                            <div className="infoEncabezadoPerfilTienda">
                                <div className="centrado">
                                    <fieldset class="rating">
                                        <input type="radio" id="star5" name="rating" value="5" /><label class="full" for="star5" title="Awesome - 5 stars"></label>
                                        <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                                        <input type="radio" id="star4" name="rating" value="4" /><label class="full" for="star4" title="Pretty good - 4 stars"></label>
                                        <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                                        <input type="radio" id="star3" name="rating" value="3" /><label class="full" for="star3" title="Meh - 3 stars"></label>
                                        <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                                        <input type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                                        <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                                        <input type="radio" id="star1" name="rating" value="1" /><label class="full" for="star1" title="Sucks big time - 1 star"></label>
                                        <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                                    </fieldset>
                                </div>
                                <div className="datosContactoPerfilTienda">
                                    <a href="tel:975 538 733"><IconoTelContact fill="#e51b1b" width="15px" height="15px" /> 987 654 321</a>
                                    <a href="https://goo.gl/maps/nEw1a63DRQzjKqQi9"><IconoUbiContact fill="#e51b1b" width="15px" height="15px" /> Av. Garcilaso 182</a>
                                </div>
                                <div className="centrado redesSocialesPerfilTienda">
                                    <a href="https://www.facebook.com/"><IconoFacebook fill="#4267b2" /></a>
                                    <a href="https://www.instagram.com/"><IconoIgContact /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="perfilBox">
                    <div className="tabPerfilTienda">
                        <div className={this.state.tabActivo === "productos" ? "tablinks active" : "tablinks"} onClick={() => this.mostrarTabTienda("productos")}>
                            Productos
                        </div>
                        <div className={this.state.tabActivo === "perfil" ? "tablinks active" : "tablinks"} onClick={() => this.mostrarTabTienda("perfil")}>
                            Acerca de
                        </div>
                        <div className={this.state.tabActivo === "comentarios" ? "tablinks active" : "tablinks"} onClick={() => this.mostrarTabTienda("comentarios")}>
                            Comentarios
                        </div>
                    </div>

                    <div className="ContenidoPerfilTienda">
                        <div id="ProductosPerfilTienda" className={this.state.tabActivo === "productos" ? "tabContenido" : "ocultar"}>
                            <h3 className="centrado">Productos</h3>
                            <div className="TiendaProductos">
                                {(this.state.productosTienda || []).length > 0 ?
                                    <div className="usuario_tabla centrado">
                                        <div className="usuario_tabla_paginado">
                                            <Paginado
                                                paginaActual={this.state.paginaActual}
                                                cantidadPaginas={this.state.cantidadPaginas}
                                                paginaSiguiente={this.paginaSiguiente}
                                                paginaAtras={this.paginaAtras} />
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th> PRODUCTO </th>
                                                    <th> PRECIO<br />UNIDAD</th>
                                                </tr>
                                            </thead>
                                            {(this.state.productosTienda || []).map((producto, i) => {
                                                return (
                                                    <tbody key={i}>
                                                        <tr className={(i % 2 !== 0 ? " interlinea" : "")} onClick={() => this.props.seleccionarProductoCantidad(producto)}>
                                                            <td>
                                                                {producto.nombreTipoProducto}<br />
                                                                {producto.nombreProducto}
                                                            </td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                S/. {producto.precioPorUnidad} x {producto.unidadCantidad + " " + producto.tipoUnidad}
                                                            </td>
                                                        </tr>
                                                    </tbody>)
                                            })}
                                        </table>
                                        <div className="usuario_tabla_paginado">
                                            <Paginado
                                                paginaActual={this.state.paginaActual}
                                                cantidadPaginas={this.state.cantidadPaginas}
                                                paginaSiguiente={this.paginaSiguiente}
                                                paginaAtras={this.paginaAtras}
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div>No Hay Productos Registrados</div>}
                            </div>
                        </div>
                        <li id="TiendaPerfilTienda" className={this.state.tabActivo === "perfil" ? "tabContenido" : "ocultar"}>
                            <p>Productos Naturales para el cuidado de la salud, belleza y bienestar de toda la familia.<br />
                            Creemos que el cuidado de nuestro organismo debe hacerse con gran delicadeza, respeto, pero sobre todo naturalmente.<br />
                            Contamos con una amplia gama de productos naturales.<br />
                            Entre nuestros productos principales tenemos:<br />
                            - Aceites<br />
                            - Cosmética<br />
                            - Harinas<br />
                            - Mieles y jaleas<br />
                            - Vinagres<br />
                            - Cápsulas<br />
                            - Extractos<br />
                            - Batidos<br />
                            - Propóleos<br />
                            Si tienes alguna duda y/o quieres saber sobre nuestros productos no dudes en contactarnos a nuestros teléfonos o al correo electrónico, siempre estaremos encantados de atenderte.</p>
                        </li>
                        <div id="ComentariosPerfilTienda" className={this.state.tabActivo === "comentarios" ? "tabContenido" : "ocultar"}>
                            <h3>Comentarios</h3>
                            <p>Comentario 1</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PiePagina;