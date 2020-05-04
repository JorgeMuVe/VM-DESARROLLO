/*
-- Description:     PAGINA DE ENTREGA DE PEDIDO
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

/* **********       *****************/
export class Entrega extends React.Component {
    constructor(props){
        super(props);
        this.state = estadoInicial;
    }
    render(){
        return(
            <div className="Entrega">
                <div className="centrado">
                    <div className="entrega_encabezado">
                        <button onClick={()=>this.props.cambiarPagina("principal")}>{"<"}</button>
                        <div> ENTREGA DE PRODUCTOS </div>
                    </div>
                </div>

                <div className="centrado">
                    <div className="entrega_cuerpo">
                        <div>Hola! Aqui podras ver el estado de tu Pedido</div>
                        <div>
                            Para ver el estado de un pedido o hacer un reclamo,
                            Ingrese el codigo de su Pedido en el siguiente cuadro.
                        </div>
                        <div className="centrado">
                            <input style={{width:'35vh'}} placeholder="Codigo de Pedido" type='text'/>
                        </div>
                    </div>
                </div>

                <div className="centrado">
                    <button className="entrega_siguiente">
                        {"Buscar Pedido >"}
                    </button>
                </div>
            </div>
        )
    }
}

export default Entrega;
