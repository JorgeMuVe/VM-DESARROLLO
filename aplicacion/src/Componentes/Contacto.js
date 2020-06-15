/*
-- Description:      Pagina de Contacto
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {
    preguntaActiva:''
};

export class Contacto extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    controlPregunta = (idSection) => {
        const {preguntaActiva} = this.state;

        if(idSection!==preguntaActiva){
            this.setState({preguntaActiva:idSection},()=>{
                if(preguntaActiva!==''){
                    var preguntaAnterior = document.getElementById(preguntaActiva);
                    preguntaAnterior.style.maxHeight=null;
                }
                var preguntaNueva = document.getElementById(idSection);
                preguntaNueva.style.maxHeight='150px'
            });
        }else {
            this.setState({preguntaActiva:''},()=>{
                var preguntaCerrar = document.getElementById(idSection);
                preguntaCerrar.style.maxHeight=null;
            })
        }
    }
    
    
    render() {
        return (
            <div className="Contacto">
                <div className="preguntas_frecuentes">
                    <h2>PREGUNTAS FRECUENTES.</h2>
                    <div className="preguntas_frecuentes_lista">
                        <div className="preguntas_frecuentes_item">
                            <button onClick={() => this.controlPregunta('pregunta1')}>¿Qué es Reactiva-Peru?</button>
                            <div id="pregunta1">
                                <p>Es un sitio de compras por internet donde encontraras los producto de las tiendas mas icónicas de tu ciudad.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={() => this.controlPregunta('pregunta2')}>¿Por qué hacer tus compras en Reactiva-Peru?</button>
                            <div id="pregunta2">
                                <p>Porque puedes acceder cómodamente a los mismos productos del local, desde cualquier lugar y en el momento que tú decidas sin salir de casa evitando las colas y sin poner en riesgo tu salud. Además de recibir un servicio de calidad, puntual y personalizado, ahorras tiempo y dinero al acceder a las ofertas y promociones exclusivas de Reactiva-Peru. También, hemos diseñado el sitio con información clara, de modo de lograr una compra fácil y rápida.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={() => this.controlPregunta('pregunta3')}>¿Que encontraras en Reactiva-Peru?</button>
                            <div id="pregunta3">
                                <p>Una gran variedad de productos de las diferentes tiendas con la calidad y marcas que ya conoces.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={() => this.controlPregunta('pregunta4')}>¿Cuales son los horarios de despacho de productos?</button>
                            <div id="pregunta4">
                                <p>Los horarios de despacho de cada tienda así como información util la encontraras en su perfil princial, para que puedas hacer de tu compra, una COMPRA confiable.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={() => this.controlPregunta('pregunta5')}>¿Qué productos puedo comprar en Reactiva-Peru?</button>
                            <div id="pregunta5">
                                <p>Nuestro objetivo es que encuentres todos los productos que necesitas para tu hogar, y estamos trabajando para actualizar nuestro catálogo de ofertas y productos de forma constante.
                                Con tus consejos podremos satisfacerte más rápido y mejor, por lo que te pedimos escribirnos a Gerenciageneral@worldconnectperu.com en caso tengas alguna sugerencia de nuevos productos.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={() => this.controlPregunta('pregunta6')}>¿Es resguardada la confidencialidad de mis datos?</button>
                            <div id="pregunta6">
                                <p>Sí. Garantizamos que los datos ingresados son utilizados exclusivamente para generar tu pedido y lograr una comunicación personal contigo, con el objetivo de brindar un mejor servicio.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contacto_informacion" style={{
                        
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        backgroundSize: "100%",
                        backgroundImage: "rgba(76, 175, 80, 0.3)"
                }}>

                    <h3>FORMULARIO DE CONTACTO</h3>
                    <p>Te invitamos a contactarnos, te responderemos a la brevedad.</p>
                    <p style={{color:"#e51b1b"}}>* (Campo Obligatorio)</p>
                    <form className="contacto_formulario" action="">
                        <div className="contacto_formulario_info">
                            <label htmlFor="nombres">Nombres *</label>
                            <input type="text" id="nombres" required></input>
                        </div>
                        <div className="contacto_formulario_info">
                            <label htmlFor="apellidos">Apellidos *</label>
                            <input type="text" id="apellidos" required></input>
                        </div>
                        <div className="contacto_formulario_info">
                            <label htmlFor="email">Email *</label>
                            <input type="email" id="email" required></input>
                        </div>
                        <div className="contacto_formulario_info">
                            <label htmlFor="telefono">Telefono:</label>
                            <input type="text" id="telefono"></input>
                        </div>
                        <div className="contacto_formulario_mensaje">
                            <label htmlFor="mensaje">Mensaje *</label>
                            <textarea rows="6" id="mensaje" required></textarea>
                        </div>
                        <div>
                            <button className="boton_contacto" type="submit">Enviar</button>
                        </div>
                    </form>

                </div>
            </div >
        )
    }
}

export default Contacto;
