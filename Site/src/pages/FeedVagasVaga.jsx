import React from "react";
import HeaderLogado from "../components/HeaderLogado";
import feedVagasVagscss from "../css/feedVagasVaga.css";
import imgLocal from "../img/local.png";
import imgContract from "../img/contract.png";
import imgPayment from "../img/payment.png";

function FeedVagasVaga() {
    return (
        <>
                <HeaderLogado />
                <div className="divVagaFather">
                    <div className="divVagaBody">
                        <div className="divVagaContent">

                            <div className="divPageTitle">
                                <p className="pageTitle">Desenvolvedor Front-end Júnior</p>
                            </div>

                            <div className="divSpaceBetween">
                                <div className="divSmallBox">
                                    <div className="divTitle">
                                        <p className="subtitle">Localização</p>
                                        <img src={imgLocal} />
                                    </div>
                                    <div className="divInputFormatter">
                                        <div className="divInput">
                                            <p className="smallText">São Paulo, SP</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="divSmallBox">
                                    <div className="divTitle">
                                        <p className="subtitle">Contrato</p>
                                        <img src={imgContract} />
                                    </div>
                                    <div className="divInputFormatter">
                                        <div className="divInput">
                                            <p className="smallText">Híbrido</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="divSmallBox">
                                    <div className="divTitle">
                                        <p className="subtitle">Salário</p>
                                        <img src={imgPayment} />
                                    </div>
                                    <div className="divInputFormatter">
                                        <div className="divInput">
                                            <p className="smallText">R$ 3500,00 até 4500,00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Descrição</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInput">
                                        <p className="smallText">Desenvolvimento de aplicações front-end com React;
                                            <br /> <br />
                                            Participar ativamente em soluções para os aplicativos desenvolvidos;
                                            <br /> <br />
                                            Utilizará boas práticas e código limpo;
                                            <br /> <br />
                                            Conhecimento em Design Patterns.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Tags</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInputWrap">
                                        <button className="tagArea">Desenvolvedor</button>
                                        <button className="tagDev">JavaScript</button>
                                        <button className="tagDev">React</button>
                                        <button className="tagDev">NodeJS</button>
                                        <button className="tagPlatform">AWS</button>
                                        <button className="tagPlatform">Azure</button>
                                        <button className="tagBusyness">Agile</button>
                                        <button className="tagBusyness">Scrum</button>
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Requisitos</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInput">
                                        <p className="smallText">Participar ativamente em soluções para os aplicativos
                                            desenvolvidos;
                                            <br /> <br />
                                            Utilizará boas práticas e código limpo;
                                            <br /> <br />
                                            Conhecimento em Design Patterns;
                                            <br /> <br />
                                            Conhecimento básico de JavaScript e Cloud.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Atividades</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInput">
                                        <p className="smallText">Criar telas e ajudar em sua ideação;
                                            <br /> <br />
                                            Fazer diagramas para documentar códigos;
                                            <br /> <br />
                                            Utilizar ferramentas no Azure na AWS.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="divPageButton">
                                <button className="bigButton">Candidatar-se</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default FeedVagasVaga;