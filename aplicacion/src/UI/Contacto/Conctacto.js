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
    render() {
        return (
            <div className="Contacto">
                <div className="faq">
                    <h2>PREGUNTAS FRECUENTES.</h2>
                    <button class="accordion">Section 1</button>
                    <div class="panel">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <button class="accordion">Section 2</button>
                    <div class="panel">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <button class="accordion">Section 3</button>
                    <div class="panel">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    {/* <script>
                        var acc = document.getElementsByClassName("accordion");
                        var i;

                        for (i = 0; i < acc.length; {
                            acc[i].addEventListener("click", function () {
                                this.classList.toggle("active");
                                var panel = this.nextElementSibling;
                                if (panel.style.maxHeight) {
                                    panel.style.maxHeight = null;
                                } else {
                                    panel.style.maxHeight = panel.scrollHeight + "px";
                                }
                            });
                        }
                    </script> */}
                </div>

                <div className="Contact">
                    <div className="info_contacto">
                        <h2>CONTÁCTENOS</h2>
                        <div className="contacto1">
                            <div>
                                <span class="title">Celular</span>
                                <strong>987654321</strong>
                            </div>
                            <div>
                                <span class="title">Correo Electrónico</span>
                                <strong>Correo@electronico.com</strong>
                            </div>
                        </div>
                        <div className="direccion">
                            <span class="title">Dirección</span>
                            <strong>121, Calle Los Girasoles, Victoria 3000 Cusco</strong>
                        </div>
                    </div>

                    <div className="formulario">
                        <h2>Formulario de Contacto</h2>
                        <p style={{ marginBottom: '-10px' }}>Te invitamos a contactarnos, te responderemos a la brevedad.</p>
                        <p className="obligatorio">*Todos los campos son obligatorios</p>
                        <form className="formulario1" action="">
                            <div className="info">
                                <label for="nombres">Nombres *</label>
                                <input type="text" name="nombres" id="nombres" required></input>
                            </div>
                            <div className="info">
                                <label for="apellidos">Apellidos *</label>
                                <input type="text" name="apellidos" id="apellidos" required></input>
                            </div>
                            <div className="info">
                                <label for="email">email:</label>
                                <input type="email" name="email" id="email" required></input>
                            </div>
                            <div className="info">
                                <label for="telefono">telefono:</label>
                                <input type="text" name="telefono" id="telefono"></input>
                            </div>
                            <div className="mensaje">
                                <label for="mensaje">mensaje:</label>
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
