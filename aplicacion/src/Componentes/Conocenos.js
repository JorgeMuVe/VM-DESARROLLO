/*
-- Description:      Conocenos DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Conocenos extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => { window.location.href = (this.props.urlAplicacion + ruta) }

    render() {
        return (
            <div className="Conocenos">
                <h1 className="texto_temaRojo centrado">Conócenos</h1>
                <h2><strong>“Misión”</strong></h2>
                <p>Lograr a través de Reactiva-Perú, que el mundo del comercio minorista sea alcanzable a todos en Perú, y satisfacer las necesidades de compra que tenemos todos, a través de bienes de excelencia, originalidad y calidad. Nuestro modelo de negocio se basa en procesos de comercio electrónico, seguros y eficientes. Contamos con un equipo de trabajo altamente capacitado, con la mejor aptitud de servicio, sentido de la responsabilidad y ética, que busca dar un buen servicio y de calidad en el mejor tiempo posible.</p>
                <h2><strong>“Vision”</strong></h2>
                <p>Queremos que Reactiva-Perú en el 2025 sea una de las plataformas e-commerce líder en el mundo del comercio minorista, sea alcanzable a todas las personas en Perú, y ser líderes en experiencias de compra seguras posibilitando la compra o venta de cualquier producto o servicio. La confianza y seguridad transaccional nos permiten la consecución de objetivos, sin descuidar la rentabilidad de nuestros clientes, manteniendo estándares altos de satisfacción y capacitación permanente del personal.</p>
            </div>
        )
    }
}

export default Conocenos;