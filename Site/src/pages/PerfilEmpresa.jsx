import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import api from "../api";
import alertImage from "../img/warning.png"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function PerfilEmpresa() {

    const idEmpresa = sessionStorage.getItem("idEmpresa");

    const [empresa, setEmpresa] = useState();
    const [empresaNome, setEmpresaNome] = useState();
    const [empresaEmail, setEmpresaEmail] = useState();
    const [empresaCnpj, setEmpresaCnpj] = useState();
    const fileText = 'Faça upload do arquivo';

    useEffect(() => {
        trazDadosEmpresa();
    }, [empresa]);

    // ------------------------------
    // Traz dados do usuário
    // ------------------------------
    function trazDadosEmpresa() {

        api.get(`/empresas/perfil/${idEmpresa}`)
        .then((resposta) => {
            setEmpresa(resposta.data);
            setEmpresaNome(resposta.data.nome);
            setEmpresaEmail(resposta.data.email);
            setEmpresaCnpj(resposta.data.cnpj);

        })
        .catch((error) => {
            console.log("Erro ao buscar usuário!");
            console.log(error);
        })
    }

    // ------------------------------
    // Edit Mode & CSS Adjustments
    // ------------------------------
    const buttonCriarVaga = {
        width : '90%',
        marginTop : '5%',
        padding : '1.5rem'
    }

    const divCenter = {
        width : '95%',
        display : 'none',
        justifyContent : 'left',
        marginLeft : '5%',
        paddingBottom : '5%'
    }

    function direcionarParaCadastroVaga() {
        window.location = "http://localhost:3000/post-vaga";
    }

    const inputNames = ['inputNome', 'inputEmail', 'inputCnpj'];

    function turnOnEditMode() {

        document.getElementById('divButton').style.display = 'block';

        for (let index = 0; index < inputNames.length; index++) {

            document.getElementById(`${inputNames[index]}`).disabled = false;
            document.getElementById(`${inputNames[index]}`).style.border = 'solid';
            document.getElementById(`${inputNames[index]}`).style.cursor = 'text';
        }
    }

    function turnOnFileUpload() {

        document.getElementById('divButton2').style.display = 'block';

        for (let index = 0; index < inputNames.length; index++) {

            document.getElementById(`inputUpload`).disabled = false;
            document.getElementById(`inputUpload`).style.border = 'solid';
            document.getElementById(`inputUpload`).style.cursor = 'text';
            document.getElementById(`inputUpload`).type = 'file';
        }
    }

    // ------------------------------
    // Valida salva os dados
    // ------------------------------
    function downloadFile() {

        api.get("/vagas/gravacao/relatorio-txt")
 
                 .then((response) => {
                     if (response.status === 200 || response.status === 201) {
 
                         successMessage2();
                     } 
                     else {
                         errorMessage2();
                         console.log("Código do erro: ", response.status);
                     }
                 })
                 .catch((error) => {
                     console.log(error);
                     errorMessage2();
                 })
    }

    function saveInfo() {

        if(document.getElementById('inputNome').value && document.getElementById('inputEmail').value
        && document.getElementById('inputCnpj').value) {

            // Parte visual
            document.getElementById('divButton').style.display = 'none';

            for (let index = 0; index < inputNames.length; index++) {
    
                document.getElementById(`${inputNames[index]}`).disabled = true;
                document.getElementById(`${inputNames[index]}`).style.border = 'none';
                document.getElementById(`${inputNames[index]}`).style.cursor = 'default';
            }

             // Parte integração
             const nomeInserido = document.getElementById('inputNome').value;
             const emailInserido = document.getElementById('inputEmail').value;
             const cnpjInserido = document.getElementById('inputCnpj').value;
 
             // Altera dados do usuário
             let empresa = {
                 idEmpresa: idEmpresa,
                 nome: nomeInserido,
                 email: emailInserido,
                 cnpj: cnpjInserido
             }
 
             api.patch("/empresas/alterar-dados", empresa)
 
                 .then((response) => {
                     if (response.status === 200 || response.status === 201) {
 
                         successMessage();
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
        else {
            alertMessegeFieldsIncomplete();
        }
    }

    function saveInfo2() {

        if(document.getElementById('inputUpload').value) {

            // Parte visual
            document.getElementById('divButton2').style.display = 'none';

            for (let index = 0; index < inputNames.length; index++) {
    
                document.getElementById(`inputUpload`).disabled = true;
                document.getElementById(`inputUpload`).style.border = 'none';
                document.getElementById(`inputUpload`).style.cursor = 'default';
            }

            var input = document.querySelector('input[type="file"]');

            var file = new FormData();
            file.append(".txt", input.files[0]);

            api.post("/vagas/upload", file)
 
                 .then((response) => {
                     if (response.status === 200 || response.status === 201) {
 
                         successMessage();
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
        else {
            alertMessegeFieldsIncomplete();
        }
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

    function successMessage2() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Arquivo baixado com sucesso!</strong>,
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

    function errorMessage2() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Não foi possível baixar o arquivo!!</strong>,
                            icon: 'error'
                        })
    }

    // ------------------------------
    // ------------------------------
    // ------------------------------

    useEffect(() => {
        let empresa = sessionStorage.getItem("idEmpresa") ? sessionStorage.getItem("idEmpresa") : null;

        if (empresa == null) {
            window.location = "http://localhost:3000/login";
        }
    }, [])

    function sair()
    {
        sessionStorage.removeItem("idEmpresa");
        window.location = "http://localhost:3000/login";
    }

    return(
        <>
        <HeaderLogadoDois 
        encaminharTo="http://localhost:3000/perfil-empresa"
        encaminharToFeed="http://localhost:3000/feed-empresa"
        />
        <div className="sidebar-user">
            <div className="sidebar-container-user">
                <div className="div-image-alert">
                    <img alt="" className="image-alert" src={alertImage} />
                </div>
                <p className="bigTitleUserProfile">Configurações</p>
                <p onClick={turnOnEditMode} className="title-user">Editar informações</p>
                <p onClick={turnOnFileUpload} className="title-user">Upload de Arquivo</p>
                <p onClick={downloadFile} className="title-user">Download Arquivo</p>
                <p onClick={sair} className="title-user">Sair</p>

                    <a className="li-comum">
                            <button onClick={direcionarParaCadastroVaga} style={buttonCriarVaga} className="alternativeButton">Criar vaga</button>
                    </a>
            </div>
        </div>

        <div className="main-div-user">

            <div className="div-image-alert">
                <img alt="" className="image-alert-invisible" src={alertImage} />
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Nome</p>
                    <input id="inputNome" disabled={true} defaultValue={empresaNome} className="input-user-small" type="text" />
                </div>

                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Email</p>
                    <input id="inputEmail" disabled={true} defaultValue={empresaEmail} className="input-user-small" type="text" />
                </div>
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">CNPJ</p>
                    <input id="inputCnpj" disabled={true} defaultValue={empresaCnpj} className="input-user-small" type="text" />
                </div>
            </div>

            <form onSubmit={saveInfo2}>
                <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Arquivo de vagas</p>
                        <input id="inputUpload" name="fileName" disabled={true} defaultValue={fileText} accept=".txt" className="input-user-small" type="text" />
                    </div>
                </div>

                <div id="divButton2" style={divCenter}>
                            <a className="li-comum">
                                    <button className="alternativeButton">Enviar</button>
                            </a>
                </div>
            </form>

            <div id="divButton" style={divCenter}>
                        <a className="li-comum">
                                <button onClick={saveInfo} className="alternativeButton">Salvar</button>
                        </a>
            </div>
        </div>
        </>
    )
}

export default PerfilEmpresa;