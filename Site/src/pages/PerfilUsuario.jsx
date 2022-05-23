import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import api from "../api";
import apiCEP from "../apiCEP";
import alertImage from "../img/warning.png"

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
    }, [cidadeUF]);

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
            document.getElementById(`${inputNames[index]}`).style.cursor = 'pointer';
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

    return(
        <>
        <HeaderLogadoDois />
        <div className="sidebar-user">
            <div className="sidebar-container-user">
                <div className="div-image-alert">
                    <img alt="" className="image-alert" src={alertImage} />
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
                <div className="div-input-user-long">
                    <p className="bigTitleUserProfile">Tags</p>
                    <input disabled={true} defaultValue={user} className="input-user-long" type="text" />
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