import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/pedido/';


// AGREGAR NUEVO PEDIDO
export function agregarPedido_DB(Pedido){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Pedido),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// AGREGAR NUEVO PEDIDO
export function agregarPedidoDetalle_DB(PedidoDetalle){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar/detalle",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(PedidoDetalle),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTA PEDIDO CLIENTE
export function listarPedidoCliente_DB(Pedido){ 
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

// LISTA PEDIDO NEGOCIO
export function listarPedidoNegocio_DB(Pedido){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/negocio",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Pedido),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

