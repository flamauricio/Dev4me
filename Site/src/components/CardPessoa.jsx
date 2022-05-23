import React, { useState, useEffect } from "react";
import imgUserDefault from "../img/user-default.png";
import apiCEP from "../apiCEP";
import Tag from "../components/Tag";

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
                            {
                                props.vetorTags.map((item) => {
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