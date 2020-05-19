export const urlServidorDesarrollo = 'http://192.168.1.170:5000'; // SERVIDOR NODE JS
export const urlAplicacionDesarrollo = 'http://192.168.1.170:3000';

export const urlServidorPublica = 'http://reactiva-peru.com/data';
export const urlAplicacionPublica = 'http://reactiva-peru.com';


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
                default: break;
            }
        break;
        default:break;
    }
    return textoUnidad;
}


