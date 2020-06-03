import { urlServidor } from '../Componentes/Funciones';
const Url = urlServidor + '/api/archivo/';

//ELIMINAR ARCHIVO
export function eliminarArchivo_DB(urlMedia){
    return new Promise((resolve,reject)=>{
        fetch(Url + urlMedia,{
            method:'DELETE',
            headers: new Headers({'Content-type':'application/json'})
        })
        .then(response=>response.json())
        .then(responseJson=>resolve(responseJson))
        .catch(error=>reject(error))
    });
}

//GUARDAR ARCHIVO
export function guardarArchivo_DB(Archivo,Carpeta){
    const imagen = new FormData();
    imagen.append('imagen',Archivo);
    return new Promise((resolve, reject)=>{
        fetch(Url+"guardar/"+Carpeta,{
            method:'POST', body:imagen
        })
        .then(response=>response.json())
        .then(responseJson=>resolve(responseJson))
        .catch(error=>reject(error));
    });
}
