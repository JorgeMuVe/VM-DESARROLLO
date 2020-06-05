import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/cliente/';

// EDITAR CLIENTE
export function editarCliente_DB(Cliente){ 
    return new Promise((resolver,rechazar) => {
        fetch(Url + "editar",{ // Fetch para consumir API de SERVER NODE JS
            method:'POST',
            body: JSON.stringify(Cliente),
            headers: new Headers({ 'Content-type':'application/json' })
        })
        .then(respuesta => resolver(respuesta.json()))
        .catch(error => rechazar(error));
    });
}
