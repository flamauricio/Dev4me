import React, { useState, useEffect } from "react";
import imgCompanyDefault from "../img/company-profile.png";
import Tag from "./Tag";
import api from "../api";

function CardVaga(props) {

    const [tags, setTags] = useState(new Array());

    useEffect(() => {
        trazerTags();
      }, []);

    function trazerTags() {

      api
      .get("/tags")
      .then((tagsBuscadas) => {

        // console.log("Dados da resposta: ");
        // console.log(tagsBuscadas.data);

        setTags(tagsBuscadas.data);

      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

    }

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
