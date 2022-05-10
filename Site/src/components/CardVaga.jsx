import React from "react";

function CardVaga {
    return (
        <>
        <div className="divFeedMargin"></div>

        <div className="divFeedFormatter">
            <div className="divFeedMargin2"></div>
            <div className="divVaga">
                <p className="bigTitle2">Desenvolvedor Front-end Júnior</p>
                <div className="divRow">
                    <div className="divVagaCompany">
                        <img className="profilePicture"
                            src="https://7waves.me/wp-content/uploads/2021/08/Accenture-Logo-768x768-1.jpg" />
                    </div>
                    <div className="divVagaContent">
                        <div className="divDescriptionFormatter">
                            <div className="divDescription">
                                <p className="contentText">
                                    Empresa🏢: Accenture. <br /> <br />
                                    Localização📍: São Paulo, SP. <br /> <br />
                                    Contrato📑: Híbrido. <br /> <br />
                                    Desenvolvimento de aplicações front-end com React; <br />
                                    Participar ativamente em soluções para os aplicativos desenvolvidos; <br />
                                    Utilizará boas práticas e código limpo;
                                </p>
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

                        <div className="divSpaceBetween3">
                            <div className="divPayment" type="search">&nbsp&nbspSalário: R$ 4000,00 até R$ 6500,00</div>
                            <a className="li-comum" href="./feedVagasVaga.html" target="_blank"><button
                                    className="alternativeButton">Ver mais</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardVaga;
