//export const urlServidor ="http://127.0.0.1:5000";
export const urlServidor ="http://reactiva-peru.com/data";

export const obtenerUsuario =()=> {
    let usuarioAplicacion = JSON.parse(sessionStorage.getItem('usuarioAplicacion'));
    if(usuarioAplicacion) return usuarioAplicacion;
}

export const obtenerFechaHoy = () => {
    var fecha = new Date();
    
    var añoDate = fecha.getFullYear();
    var mesDate = fecha.getMonth() + 1;
    var diaDate = fecha.getDate();

    var hora = fecha.getHours();
    var minuto = fecha.getMinutes();

    var fechaRespuesta = añoDate + "-";

    if(mesDate < 10){ fechaRespuesta = fechaRespuesta + "0" + mesDate; }
    else { fechaRespuesta = fechaRespuesta + mesDate }
    fechaRespuesta = fechaRespuesta + "-";
    if(diaDate < 10){ fechaRespuesta = fechaRespuesta + "0" + diaDate; }
    else { fechaRespuesta = fechaRespuesta + diaDate; }

    if(hora < 10){ fechaRespuesta = fechaRespuesta+" 0"+hora}
    else { fechaRespuesta = fechaRespuesta + " " +hora}
    if(minuto < 10){ fechaRespuesta = fechaRespuesta+":0"+minuto}
    else { fechaRespuesta = fechaRespuesta + ":" +minuto} 

    return fechaRespuesta;
}

export const unidadMedidaProducto =(unidadCantidad,tipoUnidad)=> {
    
    var textoUnidad = unidadCantidad + " " + tipoUnidad;

    var cantidad = parseFloat(unidadCantidad).toFixed(0);

    switch (tipoUnidad) {
        case "GR":
            switch (cantidad) {
                case '1000': textoUnidad = "1 KG"; break;
                case '500': textoUnidad = "1/2 KG"; break;
                case '250': textoUnidad = "1/4 KG"; break;
                case '125': textoUnidad = "1/8 KG"; break;
                default:if(cantidad>1000)textoUnidad=(cantidad/1000)+" KG"; break;
            }
        break;
        case "ML":
            switch (cantidad) {
                case '2000': textoUnidad = "2 LT"; break;
                case '1000': textoUnidad = "1 LT"; break;
                case '500': textoUnidad = "1/2 LT"; break;
                case '250': textoUnidad = "1/4 LT"; break;
                case '125': textoUnidad = "1/8 LT"; break;
                default:if(cantidad>1000)textoUnidad=(cantidad/1000)+" KG"; break;
            }
        break;
        default:break;
    }
    return textoUnidad;
}