import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import api from "../api";
import alertImage from "../img/warning.png"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function PerfilEmpresa() {

    const idEmpresa = sessionStorage.getItem("idEmpresa");

    const [empresa, setEmpresa] = useState();

    // useEffect(() => {
    //     trazDadosEmpresa();
    // }, ['']);

    // ------------------------------
    // Traz dados do usuário
    // ------------------------------
    function trazDadosEmpresa() {

        api.get(`/empresas/perfil/${idEmpresa}`)
        .then((resposta) => {
            setEmpresa(resposta.data);

            console.log(empresa);
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
        paddingBottom : '5%',
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

        document.getElementById('divEditTags').style.display = 'block';
        document.getElementById('divDisplayTags').style.display = 'none';
    }

    // ------------------------------
    // Valida salva os dados
    // ------------------------------
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

    return(
        <>
        <HeaderLogadoDois 
        encaminharTo="http://localhost:3000/perfil-usuario"
        encaminharToFeed="http://localhost:3000/feed-vagas"
        />
        <div className="sidebar-user">
            <div className="sidebar-container-user">
                <div className="div-image-alert">
                    <img alt="" className="image-alert" src={alertImage} />
                </div>
                <p className="bigTitleUserProfile">Configurações</p>
                <p onClick={turnOnEditMode} className="title-user">Editar informações</p>
                <p className="title-user">Upload de Arquivo</p>

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
                    <input id="inputNome" disabled={true}  className="input-user-small" type="text" />
                </div>

                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Email</p>
                    <input id="inputEmail" disabled={true}  className="input-user-small" type="text" />
                </div>
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">CNPJ</p>
                    <input id="inputCnpj" disabled={true}  className="input-user-small" type="text" />
                </div>

                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Arquivo de vagas</p>
                    <input id="inputUpload" disabled={true}  className="input-user-small" type="text" />
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

export default PerfilEmpresa;