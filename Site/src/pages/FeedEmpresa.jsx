import React from "react";
import Header from "../components/Header";
import imgReload from "../img/reload.png";
import imgReload from "../img/reload.png";
import imgUserDefault from "../img/user-default.png";

function FeedEmpresa() {
    return (
        <>
        <Header nomeBotao = "Cadastrar" encaminharTo="http://localhost:3000/cadastro"/>

            <div className="divMobile">
                <div className="divMobileOrganizer2" >
                    <div className="divSpaceBetween">
                        <p className="bigTitle">Filtrar Busca</p>
                        <img className="imgIcon2" src={imgReload} />
                        </div>

                    <div className="divAlignLeft">
                        <p className="subtitle">Buscar por Localização</p>
                        <input className="searchBarMobile" type="search" placeholder="Digite uma localização" />
                        </div>
                    <div className="divAlignLeft">
                        <p className="subtitle">Buscar por Tags</p>
                        <input className="searchBarMobile" type="search" placeholder="Digite uma tag" />
                        </div>
                </div>

                <div className="divMobileOrganizer2">
                    <div className="divSpaceBetween">
                        <p className="bigTitle" style="color: #383838;">Filtrar Busca</p>
                    </div>
                    <div className="divAlignLeft">
                        <p className="subtitle">Criar nova vaga</p>
                        <a className="li-comum" href="../html/cadastroVaga.html" target="_blank">
                            <button className="alternativeButton">Criar vaga</button>
                        </a>
                    </div>
                </div>
            </div>

            <div className="divSideBar" id="divSideBar">
                <div className="divSideBarContainer">
                    <div className="divSpaceBetween">
                        <p className="bigTitle">Filtrar Busca</p>
                        <img className="imgIcon2" src={imgReload} />
                        </div>

                    <div className="divAlignLeft">
                        <p className="subtitle">Buscar por Tags</p>
                        <input className="searchBar" type="search" placeholder="Digite uma tag" />
                        </div>

                    <div className="marginBox">

                    </div>

                    <div className="divAlignLeft">
                        <p className="subtitle">Buscar por Localização</p>
                        <input className="searchBar" type="search" placeholder="Digite uma localização" />
                        </div>

                    <div className="divAlignLeft">
                        <p className="subtitle"></p>
                        <a className="li-comum" href="../html/cadastroVaga.html" target="_blank">
                            <button className="alternativeButton">Criar vaga</button>
                        </a>
                    </div>

                </div>
            </div>
        <div className="divFeedMargin"></div><div className="divCardsFormatter">
                <div className="cardBody">
                    <div className="divAlignLeft2">
                        <img className="imagePerson" src={imgUserDefault}/>
                        <div className="divTextOrganizer">
                            <p className="namePerson">Guilherme de Carvalho</p>
                            <p className="textInfo">Santo André, SP</p>
                            <p className="textInfo">Desenvolvedor</p>
                        </div>
                    </div>

                    <div className="divTagsFormatter">
                        <div className="divTags">
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

                    <div className="divDescriptionFormatterAlt">
                        <div className="divDescription">
                            <p className="contentText">
                                “ Trabalhei 2 anos com back-end em JavaScript na Accenture,
                                tenho conhecimento de arquitetura Cloud (iniciante),
                                utilizei React Native por 6 meses,
                                desenvolvi projetos na metodologia Agile na maior parte do tempo.
                                Me interesso por programação Web e Mobile.”
                            </p>
                        </div>
                    </div>

                    <a className="li-comum" href="./feedVagasVaga.html" target="_blank">
                        <button className="alternativeButton" style="float: right;">Ver mais</button></a>
                </div>

                <div className="cardBody">
                    <div className="divAlignLeft2">
                        <img className="imagePerson" src={imgUserDefault} />
                        <div className="divTextOrganizer">
                            <p className="namePerson">Guilherme de Carvalho</p>
                            <p className="textInfo">Santo André, SP</p>
                            <p className="textInfo">Desenvolvedor</p>
                        </div>
                    </div>

                    <div className="divTagsFormatter">
                        <div className="divTags">
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

                    <div className="divDescriptionFormatterAlt">
                        <div className="divDescription">
                            <p className="contentText">
                                “ Trabalhei 2 anos com back-end em JavaScript na Accenture,
                                tenho conhecimento de arquitetura Cloud (iniciante),
                                utilizei React Native por 6 meses,
                                desenvolvi projetos na metodologia Agile na maior parte do tempo.
                                Me interesso por programação Web e Mobile.”
                            </p>
                        </div>
                    </div>

                    <a className="li-comum" href="./feedVagasVaga.html" target="_blank">
                        <button className="alternativeButton" style="float: right;">Ver mais</button></a>
                </div>

                <div className="cardBody">
                    <div className="divAlignLeft2">
                        <img className="imagePerson" src={imgUserDefault} />
                        <div className="divTextOrganizer">
                            <p className="namePerson">Guilherme de Carvalho</p>
                            <p className="textInfo">Santo André, SP</p>
                            <p className="textInfo">Desenvolvedor</p>
                        </div>
                    </div>

                    <div className="divTagsFormatter">
                        <div className="divTags">
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

                    <div className="divDescriptionFormatterAlt">
                        <div className="divDescription">
                            <p className="contentText">
                                “ Trabalhei 2 anos com back-end em JavaScript na Accenture,
                                tenho conhecimento de arquitetura Cloud (iniciante),
                                utilizei React Native por 6 meses,
                                desenvolvi projetos na metodologia Agile na maior parte do tempo.
                                Me interesso por programação Web e Mobile.”
                            </p>
                        </div>
                    </div>

                    <a className="li-comum" href="./feedVagasVaga.html" target="_blank">
                        <button className="alternativeButton" style="float: right;">Ver mais</button></a>
                </div>

                <div className="cardBody">
                    <div className="divAlignLeft2">
                        <img className="imagePerson" src={imgUserDefault} />
                        <div className="divTextOrganizer">
                            <p className="namePerson">Guilherme de Carvalho</p>
                            <p className="textInfo">Santo André, SP</p>
                            <p className="textInfo">Desenvolvedor</p>
                        </div>
                    </div>

                    <div className="divTagsFormatter">
                        <div className="divTags">
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

                    <div className="divDescriptionFormatterAlt">
                        <div className="divDescription">
                            <p className="contentText">
                                “ Trabalhei 2 anos com back-end em JavaScript na Accenture,
                                tenho conhecimento de arquitetura Cloud (iniciante),
                                utilizei React Native por 6 meses,
                                desenvolvi projetos na metodologia Agile na maior parte do tempo.
                                Me interesso por programação Web e Mobile.”
                            </p>
                        </div>
                    </div>

                    <a className="li-comum" href="./feedVagasVaga.html" target="_blank">
                        <button className="alternativeButton" style="float: right;">Ver mais</button></a>
                </div>
            </div></>
    )
}

export default FeedEmpresa;
 