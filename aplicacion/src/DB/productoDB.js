/* IMPORTAR URL */
import { urlServidorDesarrollo } from '../Componentes/Funciones';
//import { urlServidorPublica } from '../Componentes/Funciones';
const Url = urlServidorDesarrollo + '/api/producto/';

// BUSCAR USUARIO CLIENTE
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

