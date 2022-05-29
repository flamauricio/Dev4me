import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import api from "../api";
import apiCEP from "../apiCEP";
import alertImage from "../img/warning.png";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Tag from "../components/Tag";

function PerfilUsuario() {

    const idUser = sessionStorage.getItem("idUsuario");

    const [user, setUser] = useState();
    const [userNome, setUserNome] = useState();
    const [userDescricao, setUserDescricao] = useState();
    const [userCep, setUserCep] = useState();
    const [userCpf, setUserCpf] = useState();
    const [userDataNascimento, setUserDataNascimento] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userTelefone, setUserTelefone] = useState();
    const [userEndereco, setUserEndereco] = useState();
    const [auxiliar, setAuxiliar] = useState();

    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cidadeUF, setCidadeUF] = useState("");

    useEffect(() => {
        trazDadosUsuario();
        bringUserTags();
    }, [cidadeUF]);

    // ------------------------------
    // Traz as opções de tags na div
    // ------------------------------
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

    // ------------------------------
    // Traz dados do usuário
    // ------------------------------

    function trazDadosUsuario() {

        api.get(`/usuarios/perfil/${idUser}`)
        .then((resposta) => {
            setUser(resposta.data);
            setUserNome(resposta.data.nome);
            setUserDescricao(resposta.data.descUsuario);
            setUserCep(resposta.data.cep);
            setUserCpf(resposta.data.cpf);
            setUserDataNascimento(resposta.data.dataNasc);
            setUserEmail(resposta.data.email);
            setUserTelefone(resposta.data.telefone);
            setUserEndereco(resposta.data.endereco);
            setAuxiliar('usado como métrica');
            pegaLocalizacaoPorCEP();
        })
        .catch((error) => {
            console.log("Erro ao buscar usuário!");
            console.log(error);
        })
    }

    function pegaLocalizacaoPorCEP() {

        if(userCep != null) {

        apiCEP
        .get(`/${userCep}/json/`)
        .then((cepBuscado) => {

            setCidade(cepBuscado.data.localidade);
            setUf(cepBuscado.data.uf);

        }).then(() => {
            setCidadeUF(`${cidade}, ${uf}`);
        })
        .catch((erroOcorrido) => {
            console.log(erroOcorrido);
        });
        }
        else{
            setCidadeUF("Localização não informada");
        }
        }

        const divCenter = {
            width : '95%',
            display : 'none',
            justifyContent : 'left',
            marginLeft : '5%',
            paddingBottom : '5%',
        }

    const inputNames = ['inputNome', 'inputEmail', 'inputDataNascimento',
    'inputCpf', 'inputTelefone', 'inputCep', 'inputEndereco', 'inputDescricao'];

    function turnOnEditMode() {

        document.getElementById('divButton').style.display = 'block';

        for (let index = 0; index < inputNames.length; index++) {

            document.getElementById(`${inputNames[index]}`).disabled = false;
            document.getElementById(`${inputNames[index]}`).style.border = 'solid';
            document.getElementById(`${inputNames[index]}`).style.cursor = 'text';
        }
    }

    function saveInfo() {

        document.getElementById('divButton').style.display = 'none';

        for (let index = 0; index < inputNames.length; index++) {

            document.getElementById(`${inputNames[index]}`).disabled = true;
            document.getElementById(`${inputNames[index]}`).style.border = 'none';
            document.getElementById(`${inputNames[index]}`).style.cursor = 'default';
        }
    }

    function alertMessege() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Você precisa completar seu perfil</strong>,
                            icon: 'info'
                        })
    }

    // ------------------------------
    // Tags Requests
    // ------------------------------
    const [tagsUsuario, setTagsUsuario] = useState("");


    function bringUserTags() {

        api.get(`/usuarios/tags-usuario/${idUser}`)
        .then((resposta) => {

            setTagsUsuario(resposta.data.tags);

        })
        .catch((error) => {
            console.log("Erro ao buscar tags do usuário!");
            console.log(error);
        })
    }

    function bringUserTagsToHTML() {

        if (tagsUsuario == "") {
            setTimeout(() => {
                bringUserTagsToHTML();
            }, 2000);
            return;
        }

            return(
                <div className="divTags">
                    {
                        tagsUsuario.map((item) => {
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
            )
    }
    // ------------------------------
    // ------------------------------
    // ------------------------------

    return(
        <>
        <HeaderLogadoDois 
        encaminharTo="http://localhost:3000/perfil-usuario"
        encaminharToFeed="http://localhost:3000/feed-vagas"
        />
        <div className="sidebar-user">
            <div className="sidebar-container-user">
                <div className="div-image-alert">
                    <img alt="" className="image-alert" src={alertImage} onClick={alertMessege} />
                </div>
                <p className="bigTitleUserProfile">Configurações</p>
                <p onClick={turnOnEditMode} className="title-user">Editar informações</p>
                <p className="title-user">Mudar senha</p>
                <p className="title-user">Sair</p>
            </div>
        </div>

        <div className="main-div-user">

            <div className="div-image-alert">
                <img alt="" className="image-alert-invisible" src={alertImage} />
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Nome</p>
                    <input id="inputNome" disabled={true} defaultValue={userNome} className="input-user-small" type="text" />
                </div>

                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Localização</p>
                    <input disabled={true} defaultValue={cidadeUF} className="input-user-small" type="text" />
                </div>
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-long">
                    <p className="bigTitleUserProfile">Descrição</p>
                    <textarea id="inputDescricao" disabled={true} defaultValue={userDescricao} className="input-user-long" type="text" cols="40" rows="5"/>
                </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Email</p>
                        <input id="inputEmail" disabled={true} defaultValue={userEmail} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Nascimento</p>
                        <input id="inputDataNascimento" disabled={true} defaultValue={userDataNascimento} className="input-user-small" type="date" />
                    </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">CPF</p>
                        <input id="inputCpf" disabled={true} defaultValue={userCpf} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Telefone</p>
                        <input id="inputTelefone" disabled={true} defaultValue={userTelefone} className="input-user-small" type="text" />
                    </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">CEP</p>
                        <input id="inputCep" disabled={true} defaultValue={userCep} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Endereço</p>
                        <input id="inputEndereco" disabled={true} defaultValue={userEndereco} className="input-user-small" type="text" />
                    </div>
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-long">
                    <p className="bigTitleUserProfile">Tags</p>
                    <div className="divTagsFormatter">
                        {bringUserTagsToHTML()}
                    </div>
                </div>
            </div>

            <div className="divAlignLeft">
                <p className="subtitle">Editar Tags</p>
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

            <div id="divButton" style={divCenter}>
                    <a className="li-comum">
                            <button onClick={saveInfo} className="alternativeButton">Salvar</button>
                        </a>
                    </div>
        </div>
        </>
    )
}

export default PerfilUsuario;