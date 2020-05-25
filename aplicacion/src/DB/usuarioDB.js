//import { urlServidorDesarrollo } from '../Componentes/Funciones';
import { urlServidorPublica } from '../Componentes/Funciones';
//const Url_ = urlServidorDesarrollo + '/api/usuario/';
const Url = urlServidorPublica + '/api/usuario/';


// AGREGAR NUEVO USUARIO
export function agregarUsuario_DB(Usuario){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "agregar.php",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Usuario),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// INGRESAR USUARIO AL SISTEMA
export function ingresarSistema_DB(Usuario){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "ingresar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Usuario),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// BUSCAR USUARIO CLIENTE
export function buscarUsuarioCliente_DB(codigoUsuario){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "buscar/cliente/"+codigoUsuario)
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// BUSCAR USUARIO NEGOCIO
export function buscarUsuarioNegocio_DB(codigoUsuario){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "buscar/negocio/"+codigoUsuario)
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

// LISTAR USUARIOS
export function listarUsuarios_DB(){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "listar.php")
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}

