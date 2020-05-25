//import { urlServidorDesarrollo } from '../Componentes/Funciones';
import { urlServidorPublica } from '../Componentes/Funciones';
//const Url_ = urlServidorDesarrollo + '/api/producto/';
const Url = urlServidorPublica + '/api/producto/';


// AGREGAR NUEVO PRODUCTO
export function agregarProducto_DB(Producto){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Producto),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// EDIDTAR NUEVO PRODUCTO
export function editarProducto_DB(Producto){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "editar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Producto),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// EDIDTAR NUEVO PRODUCTO
export function buscarProducto_DB(Producto){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "buscar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Producto),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTAR PRODUCTO POR NEGOCIO
export function listarProductoPorNegocio_DB(Negocio){ 
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

// LISTAR TIPOS DE PRODUCTO
export function listarTiposProducto_DB(Negocio){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "/lista/tipo")
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTAR UNIDADES DE PRODUCTO
export function listarUnidadesProducto_DB(Negocio){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "/lista/unidad")
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}




// LISTAR PRODUCTO POR TIPO
export function listarProductoPorTipo_DB(Producto){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "listar.php",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Producto),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}


