/* COMPONENTES */
import React from 'react';
import { withRouter } from 'react-router';

/* VARIABLES GLOBALES */
const estadoInicial = {
    listaProductos: [
        { idDprod: 2, producto: '/img/productos/un_cuarto_pollo_a_la_brasa.jpg', nombreProducto: '1/4 pollo a la brasa', descripcionProducto: '1/4 pollo a la brasa + papas fritas + cremas', Negocio: 'La Granja', precio: 'S/. 13.90', descuento: '-20%' },
        { idDprod: 3, producto: '/img/productos/medio_pollo_a_la_brasa.jpeg', nombreProducto: '1/2 pollo a la brasa', descripcionProducto: '1/2 pollo a la brasa + papas fritas + cremas', Negocio: 'La Granja', precio: 'S/. 26.90', descuento: '-20%' },
        { idDprod: 4, producto: '/img/productos/pollo_a_la_brasa.jpeg', nombreProducto: '1 pollo a la brasa', descripcionProducto: '1 pollo a la brasa + papas fritas + cremas', Negocio: 'La Granja', precio: 'S/. 46.90', descuento: '-20%' },
        { idDprod: 5, producto: '/img/productos/pollo_parrillero.jpeg', nombreProducto: 'Pollo parrillero', descripcionProducto: '1/4 pollo, mollejitas, chorizo parrillero, papas fritas y cremas', Negocio: 'La Granja', precio: 'S/. 22.90', descuento: '-25%' },
        { idDprod: 6, producto: '/img/productos/pollo_chaufa.jpg', nombreProducto: 'Pollo a la brasa con chaufa', descripcionProducto: '1/4 Pollo a la Brasa + Papas Fritas + Porción de Arroz Chaufa + cremas', Negocio: 'La Granja', precio: 'S/. 16.90', descuento: '-15%' },
        { idDprod: 7, producto: '/img/productos/filete_pollo.jpg', nombreProducto: 'Filete de pollo', descripcionProducto: 'Filete de pechuga + papas fritas + ensalada.', Negocio: 'La Granja', precio: 'S/. 16.90', descuento: '-10%' },
        { idDprod: 8, producto: '/img/productos/pizza_hawaiana.jpg', nombreProducto: 'Pizza hawaiana', descripcionProducto: '1/4 pollo a la brasa + papas fritas + cremas', Negocio: 'Supermercados Orion', precio: 'S/. 13.90', descuento: '-18%' },
        { idDprod: 9, producto: '/img/productos/pizza_chorizo.jpg', nombreProducto: 'Pizza de chorizo', descripcionProducto: '1/4 pollo a la brasa + papas fritas + cremas', Negocio: 'Supermercados Orion', precio: 'S/. 9.90', descuento: '-18%' },
    ]
};

// Recortador imagen

var canvas = document.getElementById('canvas')
var context
var imagen;
var archivo

window.onload = (event) => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    archivo = document.getElementById('archivo');
}

// Recortador imagen

export class DiseñoProductos extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => {
        //this.props.history.push("/productos/buscador/TODO/_"+ruta)
        window.location.href = "/productos/buscador/TODO/_" + ruta;
    }

    // Recortador imagen

    obtenerImagen = () => {

        //cargar imagen********************************************
        imagen = new Image;
        imagen.onload = () => {
            console.log('imagen cargada!')
            this.dibujarImagenes();
        }
        imagen.src = URL.createObjectURL(archivo.files[0]);
        /********************************************************/
    }

    dibujarImagenes = () => {
        //Parar el mainLoop anterior
        if (window.mainLoop !== null) {
            //console.log('PARO!')
            clearInterval(window.mainLoop)
        }
        //Dibujar imagen por primera vez**************************
        var px = (canvas.width - imagen.width) / 2//Posicion x inicial en el medio
        var py = (canvas.height - imagen.height) / 2//Posicion y inicial en el medio
        var sx = imagen.width;//tamano de imagen en x
        var sy = imagen.height;//tamano de imagen en y
        //Si la imagen es muy grande la encogemos un poco
        if (sx > 350 || sy > 350) {
            sx = sx * 0.7
            sy = sy * 0.7;

            px = (canvas.width - sx) / 2;
            py = (canvas.height - sy) / 2;
        } else if (sx < 200 || sy < 200)//Agrandamos la imagen si es muy pequena
        {
            sx = sx * 1.7
            sy = sy * 1.7;

            px = (canvas.width - sx) / 2;
            py = (canvas.height - sy) / 2;
        }
        context.fillStyle = 'darkgray';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imagen, px, py, sx, sy);
        //****************************************************** */
        //Mover imagen:****************************************************
        var presionando = false
        var moviendo = false;

        canvas.onmousedown = (event) => {
            presionando = true
        }
        canvas.onmouseup = (event) => {
            presionando = false;
            moviendo = false
            contador = 0;//Recargamos el contador
        }
        var intervalo;
        var mx = 0;//posicion del mouse en x
        var my = 0;//posicion del mouse en y

        var pdx = 0;//posicion delta del mouse en x
        var pdy = 0;//posicion delta del mouse en y;
        var amx = 0;//posicion anterior del mouse en x
        var amy = 0;//posicion anterior del mouse en y
        var contador = 0;//Se necesita para obtener la posicion inicial cuando se empieza el swipeo
        canvas.onmousemove = (event) => {

            clearInterval(intervalo);
            moviendo = true;
            mx = event.clientX;
            my = event.clientY;
            intervalo = setInterval(() => { moviendo = false; }, 1000 / 60)
        }

        /************************************************************* */

        window.mainLoop = setInterval(() => {
            if (presionando == true && moviendo == true) {
                //Obtenemos la posicion actual del mouse el rpimer frame
                if (contador == 0) {
                    amx = px;
                    amy = py;
                }
                if (contador > 1) {
                    //Calculamos la posicion delta del mouse y se lo agregamos a la posicion de la imagen
                    pdx = mx - amx;
                    pdy = my - amy;
                    px += pdx;
                    py += pdy;

                    //Limpiamos el canvas y dibujamos la imagen con la nueva posicion
                    context.fillStyle = 'darkgray';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(imagen, px, py, sx, sy);

                }
                amx = mx;
                amy = my;
                contador++;
            }
        }, 1000 / 60)//60 = 60FPS
        /************************************************************** */

        //Resizar imagen
        var porcentajeResizado = 0.1;//Se usa para scalar la imagen sin perder el aspect ratio
        canvas.onmousewheel = (event) => {
            if (event.deltaY == 100) {
                //console.log('para abajo')
                //limitamos al usuario para que no haga la imagen demasiado pequena
                if (sx > canvas.width || sy > sy.height) {
                    //Calcular el nuevo size de la imagen y ponerla en el centro
                    sx -= sx * porcentajeResizado;
                    sy -= sy * porcentajeResizado;
                    px = (canvas.width - sx) / 2;
                    py = (canvas.height - sy) / 2;
                    /******************************************************** */
                    context.fillStyle = 'darkgray';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(imagen, px, py, sx, sy);
                }

            } else {
                //Calcular el nuevo size de la imagen y ponerla en el centro
                sx += sx * porcentajeResizado;
                sy += sy * porcentajeResizado;
                px = (canvas.width - sx) / 2;
                py = (canvas.height - sy) / 2;
                /********************************************************** */
                context.fillStyle = 'darkgray';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imagen, px, py, sx, sy);
                //console.log('para arriba');
            }
            //console.log(event);
        }
    }

    mostrarResultado = () => {
        var imagenAMostrar = document.getElementById('imagenMostrada');
        canvas.toBlob((blob) => {
            imagenAMostrar.setAttribute('src', URL.createObjectURL(blob));
            imagenAMostrar.style.display = 'block';
        })
    }

    // Recortador imagen

    render() {
        return (
            <div className="DiseñoProductos">
                <h2>DiseñoProductos</h2>
                <div className="centrar_lista">
                    <div className="lista_DiseñoProductos no-seleccionable">
                        {(this.state.listaProductos || []).map((Dprod, i) =>
                            <div className="lista_DiseñoProductos_item" key={i} onClick={() => { this.redireccionar(Dprod.idDprod) }}>
                                <div className="DiseñoProductos_item_imagen">
                                    <img className="imagenR" alt="Imagen Producto" width="255px" height="193px" src={Dprod.producto}></img>
                                </div>
                                <div className="DiseñoProductos_item_datos">
                                    <h4 className="Dprod_nombreProducto">{Dprod.nombreProducto}</h4>
                                    <h4 className="Dprod_descripcionProducto">{Dprod.descripcionProducto}</h4>
                                    <h5 className="Dprod_Negocio">{Dprod.Negocio}</h5>
                                    <h3 className="Dprod_precio">{Dprod.precio}</h3>
                                    <div className="centrado Dprod_descuento">{Dprod.descuento}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <canvas id="canvas" width="220" height="220"></canvas>
                    <label for="archivo" id="archivoFile">Seleccionar imagen</label>
                    <input onchange="obtenerImagen()" type="file" id="archivo" />
                    <div onclick="mostrarResultado()" id="mostrar">Mostrar resultado</div>
                    <img id="imagenMostrada" />
                </div>
            </div>
        )
    }
}

export default withRouter(DiseñoProductos);