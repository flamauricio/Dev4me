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
        turnOffWarningSign();
    }, [cidadeUF]);

    function turnOffWarningSign() {

        if(userNome != "" && userNome != null
        && userDescricao != "" && userDescricao != null
        && userCep != "" && userCep != null
        && userCpf != "" && userCpf != null
        && userDataNascimento != "" && userDataNascimento != null
        && userEmail != "" && userEmail != null
        && userTelefone != "" && userTelefone != null
        && userEndereco != "" && userEndereco != null
        && tagsUsuario != "" && tagsUsuario != null) {

            document.getElementById('warningSign').style.opacity = '0';
            document.getElementById('warningSign').style.cursor = 'default';
        }
    }

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
        vetor.shift();
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
    }

    function adicionarTag() {
        for (let index = 0; index < tags.length; index++) {
            if (tags[index] === tagDaVez) {
                alert("Tag já inserida!");
                return;
            }
        }
        adicionaNoVetor(tags);
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

    // ------------------------------
    // Edit Mode & CSS Adjustments
    // ------------------------------
    const divCenter = {
        width : '95%',
        display : 'none',
        justifyContent : 'left',
        marginLeft : '5%',
        paddingBottom : '5%',
    }

    const divEditMode = {
        width : '96%',
        padding : '0.4rem',
        backgroundColor : '#383838',
        borderRadius : '0.2rem',
        border : 'solid',
        borderColor : '#FFFFFF'
    }

    const divEditMode2 = {
        width : '96%',
        padding : '0rem',
    }

    const divEditMode3 = {
        width : '96%',
        padding : '0rem',
        backgroundColor : '#383838',
        borderRadius : '0.2rem'
    }

    const divEditTags = {
        display : 'none'
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

        document.getElementById('divEditTags').style.display = 'block';
        document.getElementById('divDisplayTags').style.display = 'none';
    }

    // ------------------------------
    // Valida e salva os dados
    // ------------------------------
    function saveInfo() {

        if(document.getElementById('inputNome').value && document.getElementById('inputEmail').value
        && document.getElementById('inputDataNascimento').value && document.getElementById('inputCpf').value
        && document.getElementById('inputTelefone').value && document.getElementById('inputCep').value
        && document.getElementById('inputEndereco').value && document.getElementById('inputDescricao').value 
        && quantidadeElementos > 0) {

            // Parte visual
            document.getElementById('divButton').style.display = 'none';

            for (let index = 0; index < inputNames.length; index++) {
    
                document.getElementById(`${inputNames[index]}`).disabled = true;
                document.getElementById(`${inputNames[index]}`).style.border = 'none';
                document.getElementById(`${inputNames[index]}`).style.cursor = 'default';
            }
    
            document.getElementById('divEditTags').style.display = 'none';
            document.getElementById('divDisplayTags').style.display = 'block';

            // Parte integração
            const nomeUser = document.getElementById('inputNome').value;
            const emailUser = document.getElementById('inputEmail').value;
            const dataNascimentoUser =document.getElementById('inputDataNascimento').value ;
            const cpfUser = document.getElementById('inputCpf').value;
            const telefoneUser = document.getElementById('inputTelefone').value;
            const cepUser = document.getElementById('inputCep').value;
            const enderecoUser = document.getElementById('inputEndereco').value;
            const descricaoUser = document.getElementById('inputDescricao').value;

            // Altera dados do usuário
            let usuario = {
                id: idUser,
                nome: nomeUser,
                email: emailUser,
                dataNasc: dataNascimentoUser,
                descUsuario: descricaoUser,
                cpf: cpfUser,
                telefone: telefoneUser,
                cep: cepUser,
                endereco: enderecoUser
            }

            api.patch("/usuarios/alterar-dados", usuario)

                .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        successMessage();
                    } 
                    else {
                        errorMessage();
                        console.log("Código do erro: ", response.status);
                    }
                }).then(() => {

                    setNewTags();
                })

                .catch((error) => {
                    console.log(error);
                    errorMessage();
                })
        }
        else {
            alertMessegeFieldsIncomplete();
        }

    }

    // Altera tags do usuário
    function setNewTags() {

        let tagUsuarioEnviadas = {
            tags : tags,
                usuario : {
                id : idUser
                }
            }

        api.post("/usuarios/post-tag-usuario", tagUsuarioEnviadas)

        .then((response) => {
            if (response.status === 200 || response.status === 201) {

            } 
            else {
                errorMessage();
                console.log("Código do erro: ", response.status);
            }
        })
        .catch((error) => {
            console.log(error);
            errorMessage();
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
    // Pop-ups
    // ------------------------------
    function alertMessege() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Você precisa completar seu perfil</strong>,
                            icon: 'info'
                        })
    }

    function alertMessegeFieldsIncomplete() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Você precisa preencher todos<br />
                                           os campos antes de salvar</strong>,
                            icon: 'info'
                        })
    }

    function successMessage() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Dados atualizados com sucesso!</strong>,
                            icon: 'success'
                        }).then(() => {
                        })
    }

    function errorMessage() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Não foi possível atualizar os dados!</strong>,
                            icon: 'error'
                        })
    }
    // ------------------------------
    // ------------------------------
    // ------------------------------
    useEffect(() => {
        let usuario = sessionStorage.getItem("idUsuario") ? sessionStorage.getItem("idUsuario") : null;

        if (usuario == null) {
            window.location = "http://localhost:3000/login";
        }
    }, [])

    function sair()
    {
        sessionStorage.removeItem("idUsuario");
        window.location = "http://localhost:3000/login";
    }

    return(
        <>
        <HeaderLogadoDois 
        encaminharTo="http://localhost:3000/perfil-usuario"
        encaminharToFeed="http://localhost:3000/feed-vagas"
        />
        <div className="sidebar-user">
            <div className="sidebar-container-user">
                <div className="div-image-alert">
                    <img id="warningSign" alt="" className="image-alert" src={alertImage} onClick={alertMessege} />
                </div>
                <p className="bigTitleUserProfile">Configurações</p>
                <p onClick={turnOnEditMode} className="title-user">Editar informações</p>
                <p onClick={() => {sair()}} className="title-user">Sair</p>
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

            <div id='divDisplayTags' className="divSpaceBetween2">
                <div className="div-input-user-long">
                    <p className="bigTitleUserProfile">Tags</p>
                    <div className="divTagsFormatter">
                        {bringUserTagsToHTML()}
                    </div>
                </div>
            </div>

            <div id='divEditTags' style={divEditTags} className="div-input-user-long">
                <div className="divAlignLeft">
                    <p className="bigTitleUserProfile">Editar Tags</p>
                    <select style={divEditMode} onChange={(event) => { setTagDaVez(event.target.value) }} 
                    name="" id="combo-tags">
                        <option value="">Procure por uma tag</option>
                        {plotarOptions()}
                    </select>
                </ div>

                <div style={divEditMode2} className="divButtonsTag-cv">
                    <button onClick={desfazer} className="buttonTag-vg">Desfazer</button>
                    <button onClick={adicionarTag} className="buttonTag-vg">Adicionar</button>
                </div>

                    <div style={divEditMode3} id="tags-vg">
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