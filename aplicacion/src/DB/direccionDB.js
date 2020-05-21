import { urlServidorDesarrollo } from '../Componentes/Funciones';
//import { urlServidorPublica } from '../Componentes/Funciones';
const Url = urlServidorDesarrollo + '/api/direccion/';

// LISTAR DIRECCIONES
export function listarDirecciones_DB(idCliente){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "lista/"+idCliente)
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