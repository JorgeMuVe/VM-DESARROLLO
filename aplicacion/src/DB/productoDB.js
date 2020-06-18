import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/producto/';

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

// EDITAR NUEVO PRODUCTO
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

// BUSCAR PRODUCTOS
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

// LISTAR PRODUCTO POR TIENDA
export function listarProductoPorTienda_DB(Tienda){ 
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

// LISTAR TIPOS DE PRODUCTO
export function listarTiposProducto_DB(){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "/lista/tipo")
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTAR UNIDADES DE PRODUCTO
export function listarUnidadesProducto_DB(){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "/lista/unidad")
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}


// LISTAR PRODUCTO POR CATEGORIA
export function listarProductoPorCategoria_DB(Producto){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/categoria",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Producto),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}


// LISTAR PRODUCTO POR TIPO
export function listarProductoPorTipo_DB(Producto){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "listar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Producto),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}


