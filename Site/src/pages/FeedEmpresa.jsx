import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import CardPessoa from "../components/CardPessoa";
import imgReload from "../img/reload.png";
import api from "../api";

function FeedEmpresa() {

    //parte reservada para funções filtro de tag
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

    // **********************************************************************************

    const [candidatos, setCandidatos] = useState(new Array());

    useEffect(() => {
        buscar();
    }, []);

    const [tagsUsuarios, setTagsUsuarios] = useState();

    function buscar()
    {
        const filtro = {"tags": quantidadeElementos === 0 ? [] : tags}

        api.post("usuarios/filtros", filtro)
        .then((resposta) => {
            if (resposta.status === 200) {
                setCandidatos(resposta.data.usuarios);
                setTagsUsuarios(resposta.data.tags);
            } else if (resposta.status === 204) {
                alert("Não encontramos usuários com esse filtro!");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        let empresa = sessionStorage.getItem("idEmpresa") ? sessionStorage.getItem("idEmpresa") : null;

        if (empresa == null) {
            sessionStorage.removeItem("idEmpresa");
            window.location = "http://localhost:3000/login";
        }
    }, [])

    return (
        <>
            <HeaderLogadoDois 
            encaminharTo="http://localhost:3000/perfil-empresa"
            encaminharToFeed="http://localhost:3000/feed-empresa"
            />

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
                        <a className="li-comum" href="http://localhost:8080/post-vaga" target="_blank">
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

                    <div className="marginBox"></div>

                    <div className="divAlignLeft">
                        <p className="subtitle"></p>
                        <a className="li-comum" target="_blank">
                            <button onClick={() => {buscar()}} className="alternativeButton">Buscar</button>
                        </a>
                    </div>

                </div>
            </div>
            <div className="divFeedMargin"></div>
            <div className="divCardsFormatter">

                {
                    candidatos.map((item, index) => {

                        return (
                            <CardPessoa
                                vetorTags={tagsUsuarios[index]}
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