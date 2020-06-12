/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};
var canvas;
var context
var imagen;
var archivo;

export class Imagen extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    inicialImagen =()=> {
        context.clearRect(0, 0, canvas.width, canvas.height);
        imagen = new Image();
        imagen.onload =()=> this.dibujarImagenes(false);
        imagen.src = this.props.archivoImagen||"/img/clientes/sin_foto.jpg";
    }

    obtenerImagen =()=> {
        imagen = new Image();
        imagen.onload =()=> this.dibujarImagenes(true);
        imagen.src = URL.createObjectURL(archivo.files[0]);
    }

    dibujarImagenes =(actualizar)=> {
        if(window.mainLoop !== null) { clearInterval(window.mainLoop) }

        var px = (canvas.width - imagen.width) / 2; //Posicion x inicial en el medio
        var py = (canvas.height - imagen.height) / 2; //Posicion y inicial en el medio
        var sx = imagen.width; //tamano de imagen en x
        var sy = imagen.height; //tamano de imagen en y
    
        //Si la imagen es muy grande la encogemos un poco
        if(sx > 350 || sy > 350) {
            sx = sx * 0.7
            sy = sy * 0.7;
            px = (canvas.width - sx) / 2;
            py = (canvas.height - sy) / 2;
        } else if(sx < 200 || sy < 200){ //Agrandamos la imagen si es muy pequena
            sx = sx * 1.7
            sy = sy * 1.7;
            px = (canvas.width - sx) / 2;
            py = (canvas.height - sy) / 2;
        }
        context.fillStyle = 'darkgray';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imagen, px, py, sx, sy);
        if(actualizar){ this.props.controlNuevaImagen(true) }
    
        //Mover imagen:****************************************************
        var presionando = false
        var moviendo = false;
    
        canvas.onmousedown = (event)=> { 
            presionando = true 
        }
    
        canvas.onmouseup = (event)=>{
            presionando = false;
            moviendo = false
            contador = 0;//Recargamos el contador
        }
    
        var intervalo;
        var mx = 0; //posicion del mouse en x
        var my = 0; //posicion del mouse en y
    
        var pdx = 0; //posicion delta del mouse en x
        var pdy = 0; //posicion delta del mouse en y;
        var amx = 0; //posicion anterior del mouse en x
        var amy = 0; //posicion anterior del mouse en y
        var contador = 0; //Se necesita para obtener la posicion inicial cuando se empieza el swipeo
        
        canvas.onmousemove =(event)=> { 
            clearInterval(intervalo);
            moviendo = true;
            mx = event.clientX;
            my = event.clientY;
            intervalo = setInterval(()=>{moviendo = false;}, 1000/60)
        }
    
        /************************************************************* */
        window.mainLoop = setInterval(()=>{
            if(presionando === true && moviendo === true){
                //Obtenemos la posicion actual del mouse el rpimer frame
                if(contador === 0){
                    amx = px;
                    amy = py;
                }
            
                if(contador > 1) {
                    //Calculamos la posicion delta del mouse y se lo agregamos a la posicion de la imagen
                    pdx = mx - amx;
                    pdy = my - amy;
                    px += pdx;
                    py += pdy;
    
                    //Limpiamos el canvas y dibujamos la imagen con la nueva posicion
                    context.fillStyle = 'darkgray';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(imagen, px, py, sx, sy);
                    this.props.controlNuevaImagen(true);  
                }
                amx = mx;
                amy = my;
                contador++;
            }
        }, 1000/60)//60 = 60FPS
        /************************************************************** */
        //Resizar imagen
        var porcentajeResizado = 0.1;//Se usa para scalar la imagen sin perder el aspect ratio
        canvas.onmousewheel = (event)=>{
            if(event.deltaY > 0) {
                //limitamos al usuario para que no haga la imagen demasiado pequena
                if(sx > canvas.width || sy > sy.height) {
                    //Calcular el nuevo size de la imagen y ponerla en el centro
                    sx -= sx * porcentajeResizado;
                    sy -= sy * porcentajeResizado;
                    px = (canvas.width - sx) / 2;
                    py = (canvas.height - sy) / 2;
                    /******************************************************** */
                    context.fillStyle = 'darkgray';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(imagen, px, py, sx, sy);
                    this.props.controlNuevaImagen(true);
                }  
            } else {
                //Calcular el nuevo size de la imagen y ponerla en el centro
                sx += sx * porcentajeResizado;
                sy += sy * porcentajeResizado;
                px = (canvas.width - sx) / 2;
                py = (canvas.height - sy) / 2;
                /********************************************************** */
                context.fillStyle = 'darkgray';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.drawImage(imagen, px, py, sx, sy);
                this.props.controlNuevaImagen(true);
            }
        }        
    }

    guardarResultado =()=> {
        canvas.toBlob((blob)=>{
            this.props.guardarImagen(blob);
        })   
    }

    componentDidMount(){
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        archivo = document.getElementById('archivo');
        this.inicialImagen();
    }

    render(){
        return(
            <div className="Imagen">
                <canvas id="canvas" width="250" height="250"></canvas>
                {!this.props.nuevaImagen?
                <label htmlFor="archivo" id="archivoFile">Seleccionar Imagen</label>
                :
                <div onClick={()=>this.guardarResultado()} id="mostrar">Guardar Imagen</div>}
                <input onChange={()=>this.obtenerImagen()} type="file" id="archivo"/>
            </div>
        )
    }
}

export default Imagen;