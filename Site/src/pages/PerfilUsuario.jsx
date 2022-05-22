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

    useEffect(() => {
        trazDadosUsuario();
    });

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
        })
        .catch((error) => {
            console.log("Erro ao buscar usuário!");
            console.log(error);
        })
    }

    const [localizacao, setLocalizacao] = useState(new Array());

    useEffect(() => {
        pegaLocalizacaoPorCEP();
      }, []);

      const [cidade, setCidade] = useState("");
      const [uf, setUf] = useState("");
      const [cidadeUF, setCidadeUF] = useState("");

    function pegaLocalizacaoPorCEP() {

        if(userCep != null) {

        apiCEP
        .get(`/${userCep}/json/`)
        .then((cepBuscado) => {

            setCidade(cepBuscado.data.localidade);
            setUf(cepBuscado.data.uf);

            setLocalizacao(cepBuscado.data);
        }).then(() => {
            setCidadeUF(`${cidade}, ${uf}`);
        })
        .catch(function (erroOcorrido) {
            console.log(erroOcorrido);
        });
        }
        else{
            setCidadeUF("Localização não informada");
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
                <p className="title-user">Editar informações</p>
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
                    <input defaultValue={userNome} className="input-user-small" type="text" />
                </div>

                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Localização</p>
                    <input defaultValue={cidadeUF} className="input-user-small" type="text" />
                </div>
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-long">
                    <p className="bigTitleUserProfile">Descrição</p>
                    <textarea defaultValue={userDescricao} className="input-user-long" type="text" cols="40" rows="5"/>
                </div>
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-long">
                    <p className="bigTitleUserProfile">Tags</p>
                    <input defaultValue={user} className="input-user-long" type="text" />
                </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Email</p>
                        <input defaultValue={userEmail} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Nascimento</p>
                        <input defaultValue={userDataNascimento} className="input-user-small" type="date" />
                    </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">CPF</p>
                        <input defaultValue={userCpf} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Telefone</p>
                        <input defaultValue={userTelefone} className="input-user-small" type="text" />
                    </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">CEP</p>
                        <input defaultValue={userCep} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Endereço</p>
                        <input defaultValue={userEndereco} className="input-user-small" type="text" />
                    </div>
            </div>
        </div>
        </>
    )
}

export default PerfilUsuario;