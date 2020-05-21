import React, { Component } from 'react';
let map;

export class Map extends Component {
    constructor(props){
        super(props);
        this.state = { };
    }

    iniciarMapa(){
        this.mostrarMapa();
        window.google.maps.event.addListener(map,'click',this.mostrarPosicion);
    }

    mostrarMapa = () => {
        var posicionDireccion = {
            lat: this.props.direccionSeleccionado.lat || "-13.5353412",
            lng: this.props.direccionSeleccionado.lng||"-71.9223142"
        };
        map = new window.google.maps.Map(document.getElementById('map'),{
            center: new window.google.maps.LatLng(posicionDireccion.lat,posicionDireccion.lng),
            zoom: 14,
            mapTypeId: 'roadmap'
        });
        map = new window.google.maps.Marker({position:posicionDireccion});
    }

    mostrarPosicion = (event) => {
        console.log(event.latLng);
    }

    cambiarUbicacion =()=> { }

    componentDidMount () {
        this.iniciarMapa();
    }

    render() {
        return(
        <div className="MapaCuadro">
            <div className="mapa_modal">
                <div className="mapa_modal_titulo">
                    <label> Mi Posición </label>
                </div>
                <div className="mapa_modal_contenido" id="mapa"></div>
            </div>
        </div>
        )
    }
}

export default Map;