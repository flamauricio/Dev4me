import React, { useState, useEffect } from "react";
import imgUserDefault from "../img/user-default.png";
import apiCEP from "../apiCEP";

function CardPessoa(props) {

    const [localizacao, setLocalizacao] = useState(new Array());

    useEffect(() => {
        pegaLocalizacaoPorCEP();
      }, []);

      const [cidade, setCidade] = useState("");
      const [uf, setUf] = useState("");

    function pegaLocalizacaoPorCEP() {

        if(props.cep != null) {

        apiCEP
        .get(`/${props.cep}/json/`)
        .then((cepBuscado) => {

            setCidade(cepBuscado.data.localidade);
            setUf(cepBuscado.data.uf);

            setLocalizacao(cepBuscado.data);
        })
        .catch(function (erroOcorrido) {
            console.log(erroOcorrido);
        });
        }

        }

    return (
        <>
        <div className="cardBody">
                    <div className="divAlignLeft2">
                        <img className="imagePerson" src={imgUserDefault}/>
                        <div className="divTextOrganizer">
                            <p className="namePerson">{props.nome}</p>
                            <p className="textInfo">{cidade}, {uf}</p>
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
                                {props.descricao}
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