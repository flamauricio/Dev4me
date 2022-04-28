import React from "react";
import Header from "../components/Header";
import CardPessoa from "../components/CardPessoa";
import imgReload from "../img/reload.png";

function FeedEmpresa() {
    return (
        <>
        <Header nomeBotao = "Cadastrar" encaminharTo="http://localhost:3000/cadastro"/>

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
                
                <CardPessoa />
                <CardPessoa />
                <CardPessoa />
                <CardPessoa />
                <CardPessoa />
                <CardPessoa />
                <CardPessoa />
                <CardPessoa />
            </div></>
    )
}

export default FeedEmpresa;
 