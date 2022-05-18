import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import imgReload from "../img/reload.png";
import CardVaga from "../components/CardVaga";
import api from "../api";

function FeedVagas() {

    const [tags, setTags] = useState([]);
    const [quantidadeElementos, setQuantidadeElementos] = useState(0);
    const [tagDaVez, setTagDaVez] = useState("");
    const [tagsRequisicao, setTagsRequisicao] = useState([]);

    useEffect(() => {
        plotarTags();
    }, [quantidadeElementos]);

    function adicionaNoVetor(vetorTag) {
        let vetor = vetorTag;

        if (tagDaVez === "") {
            return alert("Por favor, escolha uma tag!");
        }

        if (quantidadeElementos >= 8) {
            return alert("Desculpe, permitimos apenas 8 tags por vaga!")
        }

        vetor[quantidadeElementos] = tagDaVez;
        setQuantidadeElementos(quantidadeElementos + 1);
        setTags(vetor);
    }


    function retiraNoVetor(vetor) {
        let vetorTag = vetor;
        vetor[quantidadeElementos - 1] = null;
        setQuantidadeElementos(quantidadeElementos - 1);
        setTags(vetorTag);
    }

    function plotarOptions() {
        return tagsRequisicao.map((tag) => <option value={tag.nome}>{tag.nome}</option>);
    }

    function desfazer() {
        if (quantidadeElementos === 0) {
            return alert("Você precisa adicionar uma tag primeiro!");
        }

        retiraNoVetor(tags);
        console.log(quantidadeElementos);
        console.log(tags);
    }

    function adicionarTag() {
        for (let index = 0; index < tags.length; index++) {
            if (tags[index] === tagDaVez) {
                alert("Tag já inserida!");
                return;
            }
        }
        adicionaNoVetor(tags);
        console.log(quantidadeElementos);
        console.log(tags);
    }

    // api.post("/tags")
    //     .then((resposta) => {

    //     })

    function plotarTags() {
        return tags.map((item) => {

            if (item === "javascript" ||
                item === "node.js" ||
                item === "react" ||
                item === "react native" ||
                item === "angular" ||
                item === "vue.js" ||
                item === "java" ||
                item === "spring boot" ||
                item === "kotlin" ||
                item === "html" ||
                item === "css" ||
                item === "python" ||
                item === "typescript" ||
                item === "c" ||
                item === "c++" ||
                item === "c#" ||
                item === "php"
            ) {
                return <button className="tagDev">{item}</button>
            }

            else if (item === "azure" ||
                item === "aws" ||
                item === "google cloud" ||
                item === "oracle" ||
                item === "mysql" ||
                item === "mongoDB"
            ) {
                return <button className="tagPlatform">{item}</button>
            }

            else if (item === "desenvolvedor" ||
                item === "analista de sistemas" ||
                item === "gestor" ||
                item === "arquiteto de TI" ||
                item === "arquiteto de cloud" ||
                item === "dba" ||
                item === "engenheiro de software" ||
                item === "cientista de dados" ||
                item === "analista de redes" ||
                item === "front-end" ||
                item === "back-end") {
                return <button className="tagArea">{item}</button>
            }

            else if (item === "agile" ||
                item === "scrum" ||
                item === "cascata"
            ) {
                return <button className="tagBusyness">{item}</button>
            }

        })
    }

    useEffect(() => {
        api.get("/tags")

            .then((response) => {
                if (response.status === 204) {
                    alert("Tags não estão cadastradas no banco de dados!")
                } else if (response.status === 200) {
                    console.log(response.data);
                    setTagsRequisicao(response.data);
                } else {
                    alert("Erro não especificado ao fazer requisição das tags.");
                }
            })

            .catch((error) => {
                console.log(error);
            })
    }, []);

    const [vagas, setVagas] = useState(new Array());

    const alternativeButtonStyle = {
        "marginBottom": "30px"
    }

    const [arrayIdVagas, setArrayIdVagas] = useState("");


    const divMobileOrganizer = {
        marginLeft: "5%"
    }

    const colorChanger = {
        color: "#383838"
    }

    const [InputLocalizacao, setInputLocalizacao] = useState("");

    const [tipoContrato, setTipoContrato] = useState([]);

    function validaTipoContrato()
    {
        let contratos = []

        if (document.getElementById("presencial").checked) {
            contratos.push("presencial");
        } 
        
        if (document.getElementById("hibrido").checked) {
            contratos.push("hibrido");
        }

        if (document.getElementById("remoto").checked) {
            contratos.push("remoto");
        }

        setTipoContrato(contratos);
    }

    const [vagasLocalizacao, setVagasLocalizacao] = useState([]);
    const [vagasContrato, setVagasContrato] = useState([]);
    const [vagasTags, setVagasTags] = useState([]);

    function pegaVagasLocalizacao()
    {
        api.get(`/filtro/localizacao/${InputLocalizacao}`)
        .then((resposta) => {
            setVagasLocalizacao(resposta.data);
            console.log(resposta);
        })
        .catch((error) => {
            console.log("Erro ao requisitar vagas com localização personalidada.");
            console.log(error);
        })
    }

    function pegaVagasTags()
    {
        api.post(`/filtro/tags`, tags)
        .then((resposta) => {
            setVagasTags(resposta.data);
            console.log(resposta);
        })
        .catch((error) => {
            console.log("Erro ao requisitar vagas com tags personalizadas.")
            alert(error);
        })
    }

    function pegaVagasContrato()
    {
        api.post(`filtro/tipo-contrato/`, tipoContrato)
        .then((resposta) => {
            setVagasContrato(resposta.data);
            alert(resposta);
        })
        .catch((error) => {
            console.log("Erro ao requisitar vagas com tags personalizadas.");
            alert(error);
        })
    }

    const [filtrosEDados, setFiltrosEDados] = useState([]);
    

    function plotarVagas()
    {
        return vagas.map((item) => {

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
                    empresa={item.fkEmpresa.nome}
                />
            );
        })
    }

    function buscarVagasPorFiltro()
    {
        let vetorFiltros = [];

        if (InputLocalizacao.length > 1) {
            vetorFiltros.push("localizacao");
        }

        if (tags.length > 0) {
            vetorFiltros.push("tags");
        }

        if (tipoContrato.length > 0) {
            vetorFiltros.push("contratos");
        }

        setFiltrosEDados({
            "filtros": vetorFiltros.length === 0 ? [] : vetorFiltros,
            "tags": tags.length === 0 ? [] : tags,
            "localizacao": InputLocalizacao === "" ? "" : InputLocalizacao,
            "contratos": tipoContrato.length === 0 ? [] : tipoContrato
        });

        console.log(filtrosEDados);

        api.post("/vagas/filtros", filtrosEDados)
        .then((resposta) => {
            console.log(resposta);
            if (resposta.status === 204) {
                alert("Lamento, não encontramos nenhuma vaga com esses filtros!")
            } else if (resposta.status === 200) {
                setVagas(resposta.data);
                plotarVagas();
            } else {
                console.log("Erro não especificado.");
            }
        })
        .catch((error) => {
            if (error.status === 400) {
                console.log("mae");
            }
        })    
    }

    function plotarPrimeirasVags()
    {
        api.post("/vagas/filtros", {
            "filtros": [],
            "tags": [],
            "localizacao": "",
            "contratos": []
        })
        .then((resposta) => {
            setVagas(resposta.data);
            plotarVagas();
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        plotarPrimeirasVags()
    }, []);

    useEffect(() => {
        plotarVagas();
    }, [setVagas]);

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
                            <input className="checkbox" type="checkbox"/>
                        </div>

                        <div className="boxCheckbox">
                            <p className="smallText">híbrido</p>
                            <input className="checkbox" type="checkbox" />
                        </div>

                        <div className="boxCheckbox">
                            <p className="smallText">presencial</p>
                            <input className="checkbox" type="checkbox" />
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
                        <div className="smallTitle-vg">Tags da vaga</div>
                        <select onChange={(event) => { setTagDaVez(event.target.value) }} name="" id="combo-tags">
                            <option value="">Procure por uma tag</option>
                            {plotarOptions()}
                        </select>
                        <div />

                        <div className="divButtonsTag-cv">
                            <button onClick={desfazer} className="buttonTag-vg">Desfazer</button>
                            <button onClick={adicionarTag} className="buttonTag-vg">Adicionar</button>
                        </div>

                        <div id="tags-vg">
                            {plotarTags()}
                        </div>
                    </div>

                    <div className="marginBox">

                    </div>

                    <div className="divAlignLeft">
                        <p className="subtitle">Buscar por Localização</p>
                        <input className="searchBar" onInput={(event) => {setInputLocalizacao(event.target.value)}} type="search" placeholder="Digite uma localização" />
                    </div>

                    <div className="marginBox">

                    </div>

                    <div className="boxInline">
                        <div className="boxCheckbox">
                            <p className="smallText">remoto</p>
                            <input id="remoto" className="checkbox" type="checkbox" onChange={() => {validaTipoContrato()}} />
                        </div>

                        <div className="boxCheckbox">
                            <p className="smallText">híbrido</p>
                            <input id="hibrido" className="checkbox" type="checkbox" onChange={() => {validaTipoContrato()}} />
                        </div>

                        <div className="boxCheckbox">
                            <p className="smallText">presencial</p>
                            <input id="presencial" className="checkbox" type="checkbox" onChange={() => {validaTipoContrato()}} />
                        </div>
                    </div>

                    <div className="divAlignLeft">
                        <p className="subtitle"></p>
                        <a className="li-comum">
                            <button style={alternativeButtonStyle} onClick={() => {buscarVagasPorFiltro()}} className="alternativeButton">Buscar</button>
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

                {plotarVagas()}

                <div className="divFeedMargin"></div>

            </div>
        </>
    )
}

export default FeedVagas;