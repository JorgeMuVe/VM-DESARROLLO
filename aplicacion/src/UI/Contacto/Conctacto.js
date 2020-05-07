/*
-- Description:      ERROR EN ENCONTRAR RUTA TIEDA VIRTUAL
-- @Copyright        Jorge.Muvez - World Connect Perú - 2020-00-00
*/

/* COMPONENTES */
import React from 'react';

/* VARIABLES GLOBALES */
const estadoInicial = {};

export class Error404 extends React.Component {
    constructor(props) {
        super(props);
        this.state = estadoInicial;
    }
    render() {
        return (
            <div className="Contacto">
                <div>
                    <h2>PREGUNTAS FRECUENTES.</h2>
                    <div class="pxlr-club-faq">
                        <div class="content">
                            <div class="panel-group" id="accordion" role="tablist"
                                aria-multiselectable="true">
                                <div class="panel panel-default">
                                    <div class="panel-heading" id="headingOne" role="tab">
                                        <h4 class="panel-title">
                                            <a class="collapsed" role="button" data-toggle="collapse"
                                                data-parent="#accordion" href="#collapseOne"
                                                aria-expanded="false" aria-controls="collapseOne">01.
                                                Anonymous user won’t receive
                                                            email if question is private? <i
                                                    class="pull-right fa fa-plus"></i></a>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse collapse" id="collapseOne" role="tabpanel"
                                        aria-labelledby="headingOne">
                                        <div class="panel-body pxlr-faq-body">
                                            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life
                                            accusamus terry richardson ad squid. 3 wolf moon officia
                                            aute,
                                            non cupidatat skateboard dolor brunch. Food truck quinoa
                                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                            aliqua
                                            put a bird on it squid single-origin coffee nulla assumenda
                                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer
                                            labore
                                            wes anderson cred nesciunt sapiente ea proident. Ad vegan
                                            excepteur butcher vice lomo. Leggings occaecat craft beer
                                            farm-to-table, raw denim aesthetic synth nesciunt you
                                            probably
                                                            haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading" id="headingTwo" role="tab">
                                        <h4 class="panel-title">
                                            <a class="collapsed" role="button" data-toggle="collapse"
                                                data-parent="#accordion" href="#collapseTwo"
                                                aria-expanded="false" aria-controls="collapseTwo">02. How to
                                                have
                                                            an editor like this editor here for Q&A plugin? <i
                                                    class="pull-right fa fa-plus"></i></a>
                                        </h4>
                                    </div>
                                    <div class="panel-collapse collapse" id="collapseTwo" role="tabpanel"
                                        aria-labelledby="headingTwo">
                                        <div class="panel-body pxlr-faq-body">
                                            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life
                                            accusamus terry richardson ad squid. 3 wolf moon officia
                                            aute,
                                            non cupidatat skateboard dolor brunch. Food truck quinoa
                                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                            aliqua
                                            put a bird on it squid single-origin coffee nulla assumenda
                                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer
                                            labore
                                            wes anderson cred nesciunt sapiente ea proident. Ad vegan
                                            excepteur butcher vice lomo. Leggings occaecat craft beer
                                            farm-to-table, raw denim aesthetic synth nesciunt you
                                            probably
                                                            haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading" id="headingThree" role="tab">
                                        <h4 class="panel-title"><a class="collapsed" role="button"
                                            data-toggle="collapse"
                                            data-parent="#accordion"
                                            href="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree">03. Problem
                                                            with Knowledge base Article and knowledge base setting? <i
                                                class="pull-right fa fa-plus"></i></a></h4>
                                    </div>
                                    <div class="panel-collapse collapse" id="collapseThree" role="tabpanel"
                                        aria-labelledby="headingThree">
                                        <div class="panel-body pxlr-faq-body">
                                            <p>Anim pariatur cliche reprehenderit, enim eiusmod high life
                                            accusamus terry richardson ad squid. 3 wolf moon officia
                                            aute,
                                            non cupidatat skateboard dolor brunch. Food truck quinoa
                                            nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                                            aliqua
                                            put a bird on it squid single-origin coffee nulla assumenda
                                            shoreditch et. Nihil anim keffiyeh helvetica, craft beer
                                            labore
                                            wes anderson cred nesciunt sapiente ea proident. Ad vegan
                                            excepteur butcher vice lomo. Leggings occaecat craft beer
                                            farm-to-table, raw denim aesthetic synth nesciunt you
                                            probably
                                                            haven't heard of them accusamus labore sustainable VHS.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2>CONTÁCTENOS</h2>
                    <div className="Contacto1">
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
                    <div>
                        <h2>Get In Touch</h2>
                    </div>
                </div>
            </div >
        )
    }
}

export default Error404;
