import React, { useEffect, useState } from "react";
import VagasCss from "../css/cadastroVaga.css"
import feedVagasCss from "../css/feedVagas.css"
import api from "../api"

function ContainerCadastoVaga() {
    const [bodyStyleCursor, setBodyStyleCursor] = useState();

    const [tagsRequisicao, setTagsRequisicao] = useState([]);

    useEffect(() => {
        api.get("/tags")

        .then((response) => {
            if (response.status === 204) {
                alert("Tags não estão cadastradas no banco de dados!")
            } else if(response.status === 200) {
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

    function plotarOptions()
    {
        return tagsRequisicao.map((tag) => <option value={tag.nome}>{tag.nome}</option>);
    }

    
    const [tags, setTags] = useState([]);
    const [quantidadeElementos, setQuantidadeElementos] = useState(0);
    const [tagDaVez, setTagDaVez] = useState("");

    useEffect(() => {
        plotarTags();
      }, [quantidadeElementos]);

    function adicionaNoVetor(vetorTag)
    {
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

    function plotarTags()
    {
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

    function adicionarTag()
    {
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

    function desfazer()
    {
        if (quantidadeElementos === 0) {
            return alert("Você precisa adicionar uma tag primeiro!");
        }

        retiraNoVetor(tags);
        console.log(quantidadeElementos);
        console.log(tags);
    }

    function retiraNoVetor(vetor)
    {
        let vetorTag = vetor;
        vetor[quantidadeElementos - 1] = null;
        setQuantidadeElementos(quantidadeElementos - 1);
        setTags(vetorTag);
    }

    function publicar() {
        if (atividades === "" || requisitos === "") {
            alert("Favor completar todos os dados.");
            return;
        }
        setBodyStyleCursor({"cursor": "wait"})

        const vaga = {
            "titulo": titulo,
            "contrato": tipo,
            "localizacao": localizacao,
            "faixaSalarialMin": minimo,
            "faixaSalarialMax": maximo,
            "descricao": descricao,
            "atividades": atividades,
            "requisitos": requisitos,
            "disponivel": true,
            "fkEmpresa": {
                "idEmpresa": sessionStorage.getItem('idEmpresa')
            }
        }

        api.post("/vagas", vaga)

            .then((resposta) => {
                if (resposta.status === 201) {
                    console.log("Vaga cadastrada com sucesso!");
                    
                    const tagVaga = {
                        'tags': tags,
                        'vaga': resposta.data
                    }

                    api.post("/tags-vagas", tagVaga)

                        .then((resposta) => {
                            if (resposta.status === 201) {
                                setBodyStyleCursor({"cursor": "default"});
                                alert("Vaga cadastrada com sucesso!");
                                window.location = "http://localhost:3000/feed-empresa";
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            setBodyStyleCursor({"cursor": "default"});
                            alert("Erro ao cadastrar as tags");
                        })

                
                } 
            }).catch((error) => {
                console.log(error);
                setBodyStyleCursor({"cursor": "default"});
                alert("Erro ao criar vaga");
            })

    }

    function avancar1() {
        if (titulo === "" || tipo === "" || localizacao === "") {
            alert("Favor completar todos os dados.");
            return;
        }
        setPhaseOneStyle({display: 'none'});
        setPhaseTwoStyle({display: 'block'});
    }

    function avancar2() {
        if (descricao === "") {
            alert("Favor inserir uma descrição!.");
            return;
        }
        setPhaseTwoStyle({display: 'none'});
        setPhaseThreeStyle({display: 'block'});
    }

    function avancar3() {
        if (tags.length === 0) {
            alert("Favor inserir pelo menos uma tag!");
            return;
        }
        setPhaseThreeStyle({display: 'none'});
        setPhaseFourStyle({display: 'block'});
    }

    const [phaseOneStyle, setPhaseOneStyle] = useState({
        display: 'block'
    });

    const grayButtonDivStyle = {
        textAlign: 'center'
    }

    const [phaseTwoStyle, setPhaseTwoStyle] = useState({
        display: 'none'
    });

    const descricaoStyle = {
        margin: '30px 0 0 0'
    }

    const divButtonStyle = {
        textAlign: 'center'
    }

    const buttonAvancarDoisStyle = {
        margin: '10px 0 0 0'
    }

    const textAreaStyle = {
        height: '70px'
    }

    const [phaseThreeStyle, setPhaseThreeStyle] = useState({
        display : 'none'
    })

    const [phaseFourStyle, setPhaseFourStyle] = useState({
        display : 'none'
    })


    const publicarButtonStyle = {
        margin: '20px 0 0 0',
        backgroundColor: '#1E9CD7'
    }

    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    const [minimo, setMinimo] = useState("");
    const [maximo, setMaximo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [atividades, setAtividades] = useState("");
    const [requisitos, setRequisitos] = useState("");


    return (
        <>
            <div style={bodyStyleCursor} id="container-vg">
                <div id="mainBox-vg">
                    <div id="content-vg">
                        <span className="title-vg">Cadastrar uma nova vaga</span>

                        {/* FASE 1  */}
                        <div id="phaseOne-vg" className="subContent-vg" style={phaseOneStyle}>
                        <div>
                                <div className="smallTitle-vg">Título da vaga</div>
                                <input onInput={(event) => {setTitulo(event.target.value)}} type="text" placeholder="Digite um título para a vaga" />
                            </div>
                            <div>
                                <div className="smallTitle-vg">Tipo de Contrato</div>
                                <select onChange={(event) => {setTipo(event.target.value)}} name="" id="">
                                    <option value="none">Selecione o tipo de contrato</option>
                                    <option value="remoto">Remoto</option>
                                    <option value="hibrido">Híbrido</option>
                                    <option value="presencial">Presencial</option>
                                </select>
                            </div>
                            <div>
                                <div className="smallTitle-vg">Localização</div>
                                <input onInput={(event) => {setLocalizacao(event.target.value)}} type="text" placeholder="Digite a localização" />
                            </div>
                            <div id="text-vg">caso seja uma vaga remota, a localização ficará como “remota”</div>
                            <br />
                            <div style={grayButtonDivStyle}>
                                <button className="grayButton-vg" onClick={avancar1}>Avançar</button>
                            </div>
                        </div>

                        {/* FASE 2 */}
                        <div id="phaseTwo-vg" style={phaseTwoStyle} className="subContent-vg">
                            <div id="inputSalario-vg">
                                <div className="smallTitle-vg">Faixa salarial</div>
                                <input type="text" onInput={(event) => {setMinimo(event.target.value)}} className="inputPequeno-vg" placeholder="Valor mínimo" />
                                <input type="text" onInput={(event) => {setMaximo(event.target.value)}} className="inputPequeno-vg" placeholder="Valor máximo" />
                            </div>
                            <div id="text-vg">caso não deseje informar, não insira valores (opcional)</div>

                            <div>
                                <div style={descricaoStyle} className="smallTitle-vg">Breve descrição</div>
                                <textarea style={textAreaStyle} onInput={(event) => {setDescricao(event.target.value)}} name="" id="" cols="30" rows="10" placeholder="Descreva a vaga de forma resumida."></textarea>
                            </div>
                            <div style={divButtonStyle}>
                                <button style={buttonAvancarDoisStyle} onClick={avancar2} className="grayButton-vg">Avançar</button>
                            </div>
                        </div>

                        {/* FASE 3 */}
                        <div id="phaseThree-vg" style={phaseThreeStyle} className="subContent-vg">
                            <div>
                                <div className="smallTitle-vg">Tags da vaga</div>
                                    <select onChange={(event) => {setTagDaVez(event.target.value)}} name="" id="combo-tags">
                                        <option value="">Procure por uma tag</option>
                                        {plotarOptions()}
                                    </select>
                                <div/>

                                <div className="divButtonsTag-cv">
                                    <button onClick={desfazer} className="buttonTag-vg">Desfazer</button>
                                    <button onClick={adicionarTag} className="buttonTag-vg">Adicionar</button>
                                </div>

                                <div id="tags-vg">
                                    {plotarTags()}
                                </div>

                                <div style={grayButtonDivStyle}>
                                <button className="grayButton-vg" onClick={avancar3}>Avançar</button>
                                </div>
                            </div>
                        </div>
                        
                        {/* FASE 4 */}
                        <div id="phaseFour-vg" style={phaseFourStyle} className="subContent-vg">
                            <div>
                                <div className="smallTitle-vg">Atividades</div>
                                <textarea onInput={(event) => setAtividades(event.target.value)} style={textAreaStyle} name="" id="" cols="30" rows="10" placeholder="Descreva as principais atividades que serão exercídas na vaga, exemplo: “criar páginas web”"></textarea>
                            </div>
                            <div>
                                <div className="smallTitle-vg">Requisitos</div>
                                <textarea style={textAreaStyle} onInput={(event) => setRequisitos(event.target.value)} name="" id="" cols="30" rows="10" placeholder="Descreva os requisitos para a vaga"></textarea>
                            </div>
                            <div style={divButtonStyle}>
                                <button style={publicarButtonStyle} onClick={publicar} className="grayButton-vg">Publicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerCadastoVaga;