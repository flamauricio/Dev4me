import React from "react";
import imgCompanyDefault from "../img/company-profile.png";

function CardVaga(props) {

    let salaryTextDefault = "Salário não informado";

    let localizationTextDefault = "remota";

    fraseSalario();

    fraseLocalizacao();

    function fraseSalario() {

        if (props.salarioMin != null) {

            salaryTextDefault = `Salário: R$ ${props.salarioMin}`;

            if (props.salarioMax != null) {

                salaryTextDefault = `Salário: R$ ${props.salarioMin} até R$ ${props.salarioMax}`;
            }
        }

        else if(props.salarioMax != null) {

            salaryTextDefault = `Salário: R$ ${props.salarioMax}`;
        }
    }

    function fraseLocalizacao() {

        if (props.localizacao != null) {
            localizationTextDefault = `${props.localizacao}`;
        }
    }

    const textSalary = {
        marginLeft: "3%"
    }

    return (
        <>
            <div className="divFeedMargin2"></div>
            <div className="divVaga">
                <p className="bigTitle2">{props.titulo}</p>
                <div className="divRow">
                    <div className="divVagaCompany">
                        <img className="profilePicture"
                            src={imgCompanyDefault} />
                    </div>
                    <div className="divVagaContent">
                        <div className="divDescriptionFormatter">
                            <div className="divDescription">
                                <p className="contentText">
                                    Empresa🏢: {props.empresa} <br /> <br />
                                    Localização📍: {localizationTextDefault}. <br /> <br />
                                    Contrato📑: {props.contrato}. <br /> <br />
                                    {props.descricao}
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
                            <div className="divPayment" type="search">
                                <span style={textSalary}>{salaryTextDefault}</span></div>
                            <a className="li-comum" href="./feedVagasVaga.html" target="_blank"><button
                                    className="alternativeButton">Ver mais</button></a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CardVaga;
