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

    abrirSection = (idSection) => {
        var section = document.getElementById(idSection);
        if(section.style.maxHeight){
            section.style.maxHeight=null
        } else { section.style.maxHeight='150px' }
    }
    
    
    render() {
        return (
            <div className="Contacto">
                <div className="faq">
                    <h2>PREGUNTAS FRECUENTES.</h2>
                    <div><button className="accordion" onClick={()=>this.abrirSection('section1')}>Section 1</button></div>
                    <div className="panel" id="section1">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <button className="accordion" onClick={()=>this.abrirSection('section2')}>Section 2</button>
                    <div className="panel" id="section2">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <button className="accordion" onClick={()=>this.abrirSection('section3')}>Section 3</button>
                    <div className="panel" id="section3">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <button className="accordion" onClick={()=>this.abrirSection('section4')}>Section 4</button>
                    <div className="panel" id="section4">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>    

                    <button className="accordion" onClick={()=>this.abrirSection('section5')}>Section 5</button>
                    <div className="panel" id="section5">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>                    
                </div>

                <div className="Contact">
                    <div className="info_contacto">
                        <h2>CONTÁCTENOS</h2>
                        <div className="contacto1">
                            <div>
                                <span className="title">Celular</span>
                                <strong>987654321</strong>
                            </div>
                            <div>
                                <span className="title">Correo Electrónico</span>
                                <strong>Correo@electronico.com</strong>
                            </div>
                        </div>
                        <div className="direccion">
                            <span className="title">Dirección</span>
                            <strong>121, Calle Los Girasoles, Victoria 3000 Cusco</strong>
                        </div>
                    </div>

                    <div className="formulario">
                        <h2>Formulario de Contacto</h2>
                        <p style={{ marginBottom: '-10px' }}>Te invitamos a contactarnos, te responderemos a la brevedad.</p>
                        <p className="obligatorio">*Todos los campos son obligatorios</p>
                        <form className="formulario1" action="">
                            <div className="info">
                                <label htmlFor="nombres">Nombres*</label>
                                <input type="text" name="nombres" id="nombres" required></input>
                            </div>
                            <div className="info">
                                <label htmlFor="apellidos">Apellidos*</label>
                                <input type="text" name="apellidos" id="apellidos" required></input>
                            </div>
                            <div className="info">
                                <label htmlFor="email">email*</label>
                                <input type="email" name="email" id="email" required></input>
                            </div>
                            <div className="info">
                                <label htmlFor="telefono">telefono:</label>
                                <input type="text" name="telefono" id="telefono"></input>
                            </div>
                            <div className="mensaje">
                                <label htmlFor="mensaje">mensaje*</label>
                                <textarea rows="6" id="mensaje" name="mensaje" required></textarea>
                            </div>
                            <div>
                                <button type="submit">Enviar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
        )
    }
}

export default Contacto;
