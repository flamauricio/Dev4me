import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import imgReload from "../img/reload.png";
import CardVaga from "../components/CardVaga";
import api from "../api";

function FeedVagas() {

    const [vagas, setVagas] = useState(new Array());

    useEffect(() => {
        trazerVagas();
      }, []);

    function trazerVagas() {

      api
      .get("/vagas")
      .then((vagasBuscadas) => {

        console.log("Dados da resposta: ");
        console.log(vagasBuscadas.data);

        setVagas(vagasBuscadas.data);
      })
      .catch(function (erroOcorrido) {
        console.log(erroOcorrido);
      });

    }

    const divMobileOrganizer = {
        marginLeft: "5%"
    }

    const colorChanger = {
        color: "#383838"
    }

return (
    <>
    <HeaderLogadoDois nomeBotao="Cadastrar" encaminharTo="http://localhost:3000/cadastro" />

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

                    <div className="boxInline">
                    <div className="boxCheckbox">
                        <p className="smallText">remoto</p>
                        <input className="checkbox" type="checkbox" checked />
                    </div>

                    <div className="boxCheckbox">
                        <p className="smallText">híbrido</p>
                        <input className="checkbox" type="checkbox" checked />
                    </div>

                    <div className="boxCheckbox">
                        <p className="smallText">presencial</p>
                        <input className="checkbox" type="checkbox" checked />
                    </div>
                </div>

                    <div className="divAlignLeft">
                        <a className="li-comum">
                            <button className="alternativeButton">Buscar</button>
                        </a>
                    </div>
                </div>
            </div>



        <div className="divSideBar" id="divSideBar">
            <div className="divSideBarContainer">
                <div className="divSpaceBetween">
                    <p className="bigTitle">Filtrar Busca</p>
                    <img className="imgIcon2" src="../img/reload.png" />
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

                <div className="marginBox">

                </div>

                <div className="boxInline">
                    <div className="boxCheckbox">
                        <p className="smallText">remoto</p>
                        <input className="checkbox" type="checkbox" checked />
                    </div>

                    <div className="boxCheckbox">
                        <p className="smallText">híbrido</p>
                        <input className="checkbox" type="checkbox" checked />
                    </div>

                    <div className="boxCheckbox">
                        <p className="smallText">presencial</p>
                        <input className="checkbox" type="checkbox" checked />
                    </div>
                </div>

                <div className="divAlignLeft">
                        <p className="subtitle"></p>
                        <a className="li-comum">
                            <button className="alternativeButton">Buscar</button>
                        </a>
                    </div>

                {/* <div className="divAlignLeft">
                    <p className="subtitle">Buscar por Faixa Salarial</p>
                    <div className="divSpaceBetween2">
                        <p className="subtitle">de:</p>
                        <input className="searchBarSmall" type="search" placeholder="R$ 4000,00" />
                    </div>
                    <div className="divSpaceBetween2">
                        <p className="subtitle">até:</p>
                        <input className="searchBarSmall" type="search" placeholder="R$ 6500,00" />
                    </div>
                </div> */}
            </div>
        </div>

        <div className="divFeedFormatter">
        <div className="divFeedMargin"></div>

        {
        vagas.map((item) => {

              return (
                <CardVaga
                  key={item.id}
                  titulo={item.titulo}
                  contrato={item.contrato}
                  localizacao={item.localizacao}
                  salarioMin={item.faixaSalarialMin}
                  salarioMax={item.faixaSalarialMax}
                  descricao={item.descricao}
                  atividades={item.atividades}
                  requisitos={item.requisitos}
                  empresa={item.fk_empresa}
                />
              );
            })
        }

        <div className="divFeedMargin"></div>
        
        </div>
    </>
)
}

export default FeedVagas;