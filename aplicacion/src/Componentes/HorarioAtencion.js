/*
-- Description:      HORARIO DE ATENCION DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class HorarioAtencion extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => { window.location.href = (this.props.urlAplicacion + ruta) }

    render() {
        return (
            <div className="HorarioAtencion">
                <h2 className="texto_temaRojo centrado">Atención al Cliente</h2>
                <div className="HAtencion">
                    <div className="HAtencionImg centrado">
                        <img width="80%" alt="" src="/img/atencionCliente/callcenter.jpg"></img>
                    </div>
                    <div className="HAtencionInfo">
                        <h3>Horario de Atención Telefónica</h3>
                        <p>De lunes a viernes de 08:30 a 16:30</p>
                        <h3>Teléfono</h3>
                        <p>Cusco: 084-654651</p>
                        <h3>Tambien puede hacernos llegar sus inquietudes en el siguiente correo:</h3>
                        <a href="mailto:info@reactiva-peru.com">info@reactiva-peru.com</a>
                    </div>
                </div>
                <div id="cambiosDev" className="camDevoluciones">
                    <h3 className="texto_temaRojo centrado">Cambios y devoluciones en tienda</h3>
                    <p>Todo cambio o devolución de producto se efectuará hasta 00 días después de la compra; a excepción de los productos del área de electrodomésticos, cuyo cambio o devolución podrá ser efectivo hasta 00 días después de la compra. Los productos electrodomésticos a cambiar o devolver pasarán por una revisión técnica, la duración de dicha revisión será estipulada por la marca representante del producto.
                    <br />
                    No se aceptarán devoluciones sobre productos frescos y/o perecibles.
                    <br />
                    Para el cambio o devolución por fallas o averías de origen sobre productos sujetos a garantía, se aplicarán las condiciones establecidas en la misma.
                    <br />
                    Es obligatoria la presentación del comprobante de compra original y del documento nacional de identidad. El producto deberá estar en óptimo estado: sin uso, en empaques originales sellados, con accesorios y componentes completos.
                    <br />
                    Solo se procederá a la devolución del valor de la compra en efectivo cuando dicha compra haya sido efectuada en la misma forma.</p>
                </div>
            </div>
        )
    }
}

export default HorarioAtencion;