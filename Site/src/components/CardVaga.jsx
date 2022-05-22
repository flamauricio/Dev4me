import React, { useState, useEffect } from "react";
import imgCompanyDefault from "../img/company-profile.png";
import Tag from "./Tag";
import api from "../api";

function CardVaga(props) {

    const [tags, setTags] = useState(new Array());

    let salaryTextDefault = "Salário não informado";

    let localizationTextDefault = "remota";

    useEffect(() => {
        setTags(props.vetor);
    }, [])

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

    function verMais()
    {
        sessionStorage.setItem("idVaga", props.id);
        sessionStorage.setItem("tags", props.vetor);
        window.location = "http://localhost:3000/vaga";
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
                            {
                                tags.map((item) => {
                                    return(
                                        <Tag 
                                            key={item.idTag}
                                            nome={item.nome}
                                            tipo={item.tipo}
                                            url={item.url}
                                        />
                                    ); 
                                })    
                            }
                            </div>
                        </div>
{/* 
                        let arrayTags = [];

                                for (let index = 0; index < item.length; index++) {
                                    arrayTags.push(
                                        {
                                            "idTag": item[index].idTag,
                                            "nome": item[index].nome,
                                            "tipo": item[index].tipo,
                                            "url": item[index].url
                                        }
                                    )
                                }

                                return(
                                    <Tag 
                                        key={item.idTag}
                                        nome={item.nome}
                                        tipo={item.tipo}
                                        url={item.url}
                                    />
                                );     */}

                        <div className="divSpaceBetween3">
                            <div className="divPayment" type="search">
                                <span style={textSalary}>{salaryTextDefault}</span></div>
                            <a className="li-comum" target="_blank"><button
                                    className="alternativeButton" onClick={() => {verMais()}}>Ver mais</button></a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CardVaga;
