/*
-- Description:      Condiciones de Promociones DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class CondicionesPromociones extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => { window.location.href = (this.props.urlAplicacion + ruta) }

    render() {
        return (
            <div className="CondicionesPromociones">
                <h1 className="texto_temaRojo centrado">Terminos y condiciones para cupones y promociones</h1>
                <div>
                    <p>Al utilizar Reactiva-peru.com, usted acepta todas las condiciones de venta, así como la actualización regular de sus servicios. Le recomendamos consultar de manera regular esta página para tomar en cuenta cualquier modificación de las condiciones de venta.</p>
                    <p>Los cupones no aplican a tarifas de envío. Todos los precios son en Soles. Precios pueden variar sin previo aviso debido a factores externos: devaluaciones monetarias, alteraciones drásticas en el tipo de cambio, entre otras.</p>
                    <p><strong>PUBLICIDAD EN Reactiva Perú</strong></p>
                    <p>Todos los productos son sujetos a disponibilidad. Las imágenes de los banners son ilustrativas. Estos legales cubren todas las publicaciones hechas en todos los medios.</p>
                    <p><strong>PROMOCIONES</strong></p>
                    <p>Todas las promociones no son acumulable con otras promociones. Aplican hasta agotar existencias y están restringidas a una por persona.</p>
                    <p><strong>CUPONES</strong></p>
                    <ol>
                        <li>El uso de cupones es personal, solo un cupón por usuario. Cupón por orden. Cada cupón puede tener restricciones particulares que serán comunicadas en el banner.</li><br/>
                        <li>Los cupones de descuento pueden ser utilizados para el pago a partir de un cierto importe mínimo de compra. Este importe está especificado en las condiciones que regulan cada cupón y que se incluyen en el email de envío,  y se aplica sobre el precio final de venta (IVA incluido), sin incluir los gastos de envío.</li>
                    </ol>
                </div>
            </div>
        )
    }
}

export default CondicionesPromociones;