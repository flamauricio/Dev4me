import React from "react";
import imgUserDefault from "../img/user-default.png";

function CardPessoa() {
    return (
        <>
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
                        <button className="alternativeButtonRight">Ver mais</button></a>
                </div>
        </>
    )
}

export default CardPessoa;