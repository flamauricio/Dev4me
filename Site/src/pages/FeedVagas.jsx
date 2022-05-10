import React from "react";
import Header from "../components/Header";
import imgReload from "../img/reload.png";

function FeedVagas() {
return (
    <>
    <Header nomeBotao="Cadastrar" encaminharTo="http://localhost:3000/cadastro" />

                <div class="divMobile">
                    <div class="divMobileOrganizer" style="margin-left: 5%;">
                        <div class="divSpaceBetween">
                            <p class="bigTitle">Filtrar Busca</p>
                            <img class="imgIcon2" src="../img/reload.png" />
                        </div>
        
                        <div class="divAlignLeft">
                            <p class="subtitle">Buscar por Localização</p>
                            <input class="searchBarMobile" type="search" placeholder="Digite uma localização" />
                        </div>
        
                        <div class="boxInline">
                            <div class="boxCheckbox">
                                <p class="smallText">remoto</p>
                                <input class="checkbox" type="checkbox" checked />
                            </div>
        
                            <div class="boxCheckbox">
                                <p class="smallText">híbrido</p>
                                <input class="checkbox" type="checkbox" checked />
                            </div>
        
                            <div class="boxCheckbox">
                                <p class="smallText">presencial</p>
                                <input class="checkbox" type="checkbox" checked />
                            </div>
                        </div>
                    </div>
        
                    <div class="divMobileOrganizer" style="margin-right: 5%;">
                        <div class="divSpaceBetween">
                            <p class="bigTitle" style="color: #383838;">Filtrar Busca</p>
                        </div>
                        <div class="divAlignLeft">
                            <p class="subtitle">Buscar por Tags</p>
                            <input class="searchBarMobile" type="search" placeholder="Digite uma tag" />
                        </div>
        
                        <div class="divAlignLeft">
                            <p class="subtitle">Buscar por Faixa Salarial</p>
                            <div class="divSpaceBetween2">
                                <p class="subtitle">de:</p>
                                <input class="searchBarSmall" type="search" placeholder="R$ 4000,00" />
                            </div>
                            <div class="divSpaceBetween2">
                                <p class="subtitle">até:</p>
                                <input class="searchBarSmall" type="search" placeholder="R$ 6500,00" />
                            </div>
                        </div>
                    </div>
                </div>



        <div class="divSideBar" id="divSideBar">
            <div class="divSideBarContainer">
                <div class="divSpaceBetween">
                    <p class="bigTitle">Filtrar Busca</p>
                    <img class="imgIcon2" src="../img/reload.png" />
                </div>

                <div class="divAlignLeft">
                    <p class="subtitle">Buscar por Tags</p>
                    <input class="searchBar" type="search" placeholder="Digite uma tag" />
                </div>

                <div class="marginBox">

                </div>

                <div class="divAlignLeft">
                    <p class="subtitle">Buscar por Localização</p>
                    <input class="searchBar" type="search" placeholder="Digite uma localização" />
                </div>

                <div class="boxInline">
                    <div class="boxCheckbox">
                        <p class="smallText">remoto</p>
                        <input class="checkbox" type="checkbox" checked />
                    </div>

                    <div class="boxCheckbox">
                        <p class="smallText">híbrido</p>
                        <input class="checkbox" type="checkbox" checked />
                    </div>

                    <div class="boxCheckbox">
                        <p class="smallText">presencial</p>
                        <input class="checkbox" type="checkbox" checked />
                    </div>
                </div>

                <div class="divAlignLeft">
                    <p class="subtitle">Buscar por Faixa Salarial</p>
                    <div class="divSpaceBetween2">
                        <p class="subtitle">de:</p>
                        <input class="searchBarSmall" type="search" placeholder="R$ 4000,00" />
                    </div>
                    <div class="divSpaceBetween2">
                        <p class="subtitle">até:</p>
                        <input class="searchBarSmall" type="search" placeholder="R$ 6500,00" />
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

export default FeedVagas;