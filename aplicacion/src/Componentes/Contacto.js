/*
-- Description:      Pagina de Contacto
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Contacto extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }

    controlPregunta = (idSection) => {
        var section = document.getElementById(idSection);
        if(section.style.maxHeight){
            section.style.maxHeight=null
        } else { section.style.maxHeight='150px' }
    }
    
    
    render() {
        return (
            <div className="Contacto">
                <div className="preguntas_frecuentes">
                    <h2>PREGUNTAS FRECUENTES.</h2>
                    <div className="preguntas_frecuentes_lista">
                        <div className="preguntas_frecuentes_item">
                            <button onClick={()=>this.controlPregunta('pregunta1')}>Pregunta 1</button>
                            <div id="pregunta1">
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={()=>this.controlPregunta('pregunta2')}>Pregunta 2</button>
                            <div id="pregunta2">
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={()=>this.controlPregunta('pregunta3')}>Pregunta 3</button>
                            <div id="pregunta3">
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={()=>this.controlPregunta('pregunta4')}>Pregunta 4</button>
                            <div id="pregunta4">
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="preguntas_frecuentes_item">
                            <button onClick={()=>this.controlPregunta('pregunta5')}>Pregunta 5</button>
                            <div id="pregunta5">
                                <p>Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>
                               
                </div>

                <div className="contacto_informacion">
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
                            <button type="submit">Enviar</button>
                        </div>
                    </form>

                </div>
            </div >
        )
    }
}

export default Contacto;
