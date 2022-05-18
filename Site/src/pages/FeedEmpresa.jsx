import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import CardPessoa from "../components/CardPessoa";
import imgReload from "../img/reload.png";
import api from "../api";

function FeedEmpresa() {

    const [candidatos, setCandidatos] = useState(new Array());

    useEffect(() => {
        trazerCandidatos();
      }, []);

    function trazerCandidatos() {

      api
      .get("/usuarios")
      .then((candidatosBuscados) => {

        console.log("Dados da resposta: ");
        console.log(candidatosBuscados.data);

        setCandidatos(candidatosBuscados.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

    }

    return (
        <>
        <HeaderLogadoDois />

            <div className="divMobile">
                <div className="divMobileOrganizer2" >
                    <div className="divSpaceBetweenEmpresa">
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
                    <div className="divSpaceBetweenEmpresa">
                        <p className="bigTitleInvisible">Filtrar Busca</p>
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

                        <div className="marginBox"></div>

                    <div className="divAlignLeft">
                        <p className="subtitle"></p>
                        <a className="li-comum" href="../html/cadastroVaga.html" target="_blank">
                            <button className="alternativeButton">Criar vaga</button>
                        </a>
                    </div>

                </div>
            </div>
        <div className="divFeedMargin"></div>
        <div className="divCardsFormatter">

        {
        candidatos.map((item) => {

              return (
                <CardPessoa
                  cep={item.cep}
                  descricao={item.descUsuario}
                  email={item.email}
                  nome={item.nome}
                />
              );
            })
        }
            </div>
            </>
    )
}

export default FeedEmpresa;
 