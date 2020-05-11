export const urlServidorDesarrollo = 'http://192.168.43.63/data';
export const urlAplicacionDesarrollo = 'http://192.168.43.63:3000';

export const urlServidorPublica = 'http://reactiva-peru.com/data';
export const urlAplicacionPublica = 'http://reactiva-peru.com/app';

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


