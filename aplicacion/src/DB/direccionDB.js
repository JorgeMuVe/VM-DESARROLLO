import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/direccion/';

// LISTAR DIRECCIONES
export function listaDirecciones_DB(Direccion){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Direccion),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTAR DIRECCIONES
export function paginadoDirecciones_DB(Direccion){
    return new Promise((resolver,rechazar) => {
        fetch(Url + "paginado",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Direccion),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// AGREGAR NUEVA DIRECCION
export function agregarDireccion_DB(Direccion){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Direccion),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// EDITAR DIRECCION
export function editarDireccion_DB(Direccion){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "editar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Direccion),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}