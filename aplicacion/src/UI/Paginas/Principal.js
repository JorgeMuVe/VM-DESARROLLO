/*
-- Description:      Pantalla Principal de Aplicacion TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Ciudad extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }

    render(){
        return(
            <div className="Principal centrado">
                <div className="principal_ciudades">
                    <label>REACTIVA PERÚ</label>
                    <div className="principal_ciudades_opciones">
                        <div className="principal_ciudad_lima" onClick={()=>this.props.history.push("/lima")}>LIMA</div>
                        <div className="principal_ciudad_cusco" onClick={()=>this.props.history.push("/cusco")}>CUSCO</div>
                        <div className="principal_ciudad_arequipa"onClick={()=>this.props.history.push("/arequipa")} >AREQUIPA</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ciudad;