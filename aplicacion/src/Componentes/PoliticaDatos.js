/*
-- Description:      Politica de Datos DE APLICACION MERCADO VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class PoliticaDatos extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    redireccionar = (ruta) => { window.location.href = (this.props.urlAplicacion + ruta) }

    render() {
        return (
            <div className="PoliticaDatos">
                <h2 className="texto_temaRojo centrado">Política de Datos Personales</h2>
                <p>Reactiva-Perú está comprometido con la protección y privacidad de los Datos Personales de los Usuarios en cumplimiento de la Ley de Protección de Datos Personales – Ley N° 29733 y su Reglamento aprobado por el Decreto Supremo N° 003 – 2013 – JUS (*las Normas de Protección de Datos Personales*).<br/>Utilizamos los más altos niveles de seguridad para proteger tanto tus datos personales como los de tus pagos.<br/>
                Respetamos totalmente tu derecho de privacidad; la información que nos brindas es usada exclusivamente para el procesamiento de tus pedidos.<br/>
                A través de tu cuenta, puedes acceder en cualquier momento a tu información personal para editarla y actualizarla. Ten por seguro que, los únicos datos que compartimos con los vendedores son los necesarios para realizar el envío: tu nombre, dirección de entrega, número de teléfono y datos fiscales (en caso de haber solicitado factura al momento de realizar tu compra).<br/>
                Por favor, no compartas tu usuario ni la contraseña que te identifican en nuestro sitio web, pues son el acceso a tu cuenta y a toda tu información personal.</p>
                <h3 className="texto_temaRojo">Principios rectores</h3>
                <h4>Principio de consentimiento:</h4>
                <p>En atención al principio de consentimiento, el tratamiento de los datos personales es lícito cuando el titular del dato personal hubiere prestado su consentimiento libre, previo, expreso, informado e inequívoco. No se admiten fórmulas de consentimiento en las que éste no sea expresado de forma directa, como aquellas en las que se requiere presumir, o asumir la existencia de una voluntad que no ha sido expresa. Incluso el consentimiento prestado con otras declaraciones, deberá manifestarse en forma expresa y clara.</p>
                <h4>Principio de finalidad.</h4>
                <p>En atención al principio de finalidad se considera que una finalidad está determinada cuando haya sido expresada con claridad, sin lugar a confusión y cuando de manera objetiva se especifica el objeto que tendrá el tratamiento de los datos personales.<br/>
                Tratándose de banco de datos personales que contengan datos sensibles, su creación solo puede justificarse si su finalidad además de ser legítima, es concreta y acorde con las actividades o fines explícitos del titular del banco de datos personales.<br/>
                Los profesionales que realicen el tratamiento de algún dato personal, además de estar limitados por la finalidad de sus servicios, se encuentran obligados a guardar secreto profesional.</p>
                <h4>Principio de calidad.</h4>
                <p>En atención al principio de calidad, los datos contenidos en un banco de datos personales, deben ajustarse con precisión a la realidad. Se presume que los datos directamente facilitados por el titular de los mismos son exactos.</p>
                <h4>Principio de seguridad.</h4>
                <p>En atención al principio de seguridad, en el tratamiento de los datos personales deben adoptarse las medidas de seguridad que resulten necesarias a fin de evitar cualquier tratamiento contrario a la Ley o a su reglamento, incluyéndose en ellos a la adulteración, la pérdida, las desviaciones de información, intencionales o no, ya sea que los riesgos provengan de la acción humana o del medio técnico utilizado.</p>
            </div>
        )
    }
}

export default PoliticaDatos;