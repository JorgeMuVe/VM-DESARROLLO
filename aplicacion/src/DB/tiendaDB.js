import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/tienda/';

// AGREGAR TIENDA
export function agregarTienda_DB(Tienda){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Tienda),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// EDITAR TIENDA
export function editarTienda_DB(Tienda){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "editar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Tienda),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// ELIMINAR TIENDA
export function eliminarTienda_DB(Tienda){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "eliminar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Tienda),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTA TIENDAS DE NEGOCIO
export function listarTiendasNegocio_DB(Negocio){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/tiendas",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Negocio),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTA NEGOCIOS POR TIPO
export function listarNegociosTipo_DB(Tipo){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/negocios",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Tipo),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTA TIPOS DE NEGOCIO
export function listarTiposNegocio_DB(){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/tipos")
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}