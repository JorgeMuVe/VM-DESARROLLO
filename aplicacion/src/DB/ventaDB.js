//import { urlServidorDesarrollo } from '../Componentes/Funciones';
import { urlServidorPublica } from '../Componentes/Funciones';
//const Url_ = urlServidorDesarrollo + '/api/venta/';
const Url = urlServidorPublica + '/api/venta/';


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
export function listarVentaNegocio_DB(Negocio){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/negocio",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Negocio),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}
