import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/detalle/';

// AGREGAR NUEVO DETALLE
export function agregarPedidoDetalle_DB(PedidoDetalle){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(PedidoDetalle),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTA DETALLES DE PEDIDO CLIENTE
export function listarDetallesPedidoCliente_DB(Pedido){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/cliente",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Pedido),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTA DETALLES DE PEDIDO TIENDA
export function listarDetallesPedidoTienda_DB(Pedido){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/tienda",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Pedido),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}