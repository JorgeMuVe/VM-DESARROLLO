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
export function guardarArchivo_DB(fileMedia){
    const fd = new FormData();
    fd.append('fileMedia',fileMedia);
    return new Promise((resolve, reject)=>{
        fetch(Url+"guardar",{method:'POST',body:fd})
        .then(response=>response.json())
        .then(responseJson=>resolve(responseJson))
        .catch(error=>reject(error));
    });
}
