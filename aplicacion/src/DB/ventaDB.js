import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/venta/';


// AGREGAR NUEVA VENTA
export function agregarVenta_DB(Venta){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Venta),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTA PEDIDO CLIENTE
export function listarVentaTienda_DB(Tienda){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/tienda",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Tienda),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}
