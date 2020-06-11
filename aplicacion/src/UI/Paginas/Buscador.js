
import React from 'react';

/* ICONOS SVG */
import IconoAndroid from '../../SVG/aplicacion/IconoAndroid';
import IconoIphone from '../../SVG/aplicacion/IconoIphone';
import IconoWeb from '../../SVG/aplicacion/IconoWeb';



/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Principal extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    componentDidMount(){
        //this.props.history.push("/cusco");
    }

    render(){
        return(
            <div className="Principal centrado">
                <div className="principal_titulo">
                    <label>REACTIVA PERÚ</label>
                </div>
                <div className="principal_aplicaciones">
                    <div onClick={()=>window.location.href="https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.myapp"}>
                        <IconoAndroid/>
                        <label>Play Store</label>
                    </div>
                    <div onClick={()=>this.props.history.push("/cusco")} style={{background:'rgba(160,0,0,0.4)'}}>
                        <IconoWeb/>
                        <label>Web App</label>
                    </div>
                    <div onClick={()=>window.location.href="https://itunes.apple.com/app/id378458261"}>
                        <IconoIphone/>
                        <label>App Store</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Principal;