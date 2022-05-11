import React from "react";
import Header from "../components/Header";
import imgReload from "../img/reload.png";

function FeedVagas() {
return (
    <>
    <Header nomeBotao="Cadastrar" encaminharTo="http://localhost:3000/cadastro" />

                <div className="divMobile">
                    <div className="divMobileOrganizer" style="margin-left: 5%;">
                        <div className="divSpaceBetween">
                            <p className="bigTitle">Filtrar Busca</p>
                            <img className="imgIcon2" src={imgReload} />
                        </div>
        
                        <div className="divAlignLeft">
                            <p className="subtitle">Buscar por Localização</p>
                            <input className="searchBarMobile" type="search" placeholder="Digite uma localização" />
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
                    </div>
        
                    <div className="divMobileOrganizer" style="margin-right: 5%;">
                        <div className="divSpaceBetween">
                            <p className="bigTitle" style="color: #383838;">Filtrar Busca</p>
                        </div>
                        <div className="divAlignLeft">
                            <p className="subtitle">Buscar por Tags</p>
                            <input className="searchBarMobile" type="search" placeholder="Digite uma tag" />
                        </div>
        
                        <div className="divAlignLeft">
                            <p className="subtitle">Buscar por Faixa Salarial</p>
                            <div className="divSpaceBetween2">
                                <p className="subtitle">de:</p>
                                <input className="searchBarSmall" type="search" placeholder="R$ 4000,00" />
                            </div>
                            <div className="divSpaceBetween2">
                                <p className="subtitle">até:</p>
                                <input className="searchBarSmall" type="search" placeholder="R$ 6500,00" />
                            </div>
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
                    <p className="subtitle">Buscar por Faixa Salarial</p>
                    <div className="divSpaceBetween2">
                        <p className="subtitle">de:</p>
                        <input className="searchBarSmall" type="search" placeholder="R$ 4000,00" />
                    </div>
                    <div className="divSpaceBetween2">
                        <p className="subtitle">até:</p>
                        <input className="searchBarSmall" type="search" placeholder="R$ 6500,00" />
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

export default FeedVagas;