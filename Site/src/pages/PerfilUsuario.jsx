import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import api from "../api";
import alertImage from "../img/warning.png"

function PerfilUsuario() {

    const idUser = sessionStorage.getItem("idUsuario");

    const [user, setUser] = useState();

    useEffect(() => {
        trazDadosUsuario();
    });

    function trazDadosUsuario()
    {
        api.get(`/usuarios/${idUser}`)
        .then((resposta) => {
            setUser(resposta.data);
            console.log(resposta);
        })
        .catch((error) => {
            console.log("Erro ao buscar usuário!");
            console.log(error);
        })
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
                    <input defaultValue={user} className="input-user-small" type="text" />
                </div>

                <div className="div-input-user-small">
                    <p className="bigTitleUserProfile">Localização</p>
                    <input defaultValue={user} className="input-user-small" type="text" />
                </div>
            </div>

            <div className="divSpaceBetween2">
                <div className="div-input-user-long">
                    <p className="bigTitleUserProfile">Descrição</p>
                    <input defaultValue={user} className="input-user-long" type="text" />
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
                        <input defaultValue={user} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Nascimento</p>
                        <input defaultValue={user} className="input-user-small" type="date" />
                    </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">CPF</p>
                        <input defaultValue={user} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Telefone</p>
                        <input defaultValue={user} className="input-user-small" type="text" />
                    </div>
            </div>

            <div className="divSpaceBetween2">
                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">CEP</p>
                        <input defaultValue={user} className="input-user-small" type="text" />
                    </div>

                    <div className="div-input-user-small">
                        <p className="bigTitleUserProfile">Endereço</p>
                        <input defaultValue={user} className="input-user-small" type="text" />
                    </div>
            </div>
        </div>
        </>
    )
}

export default PerfilUsuario;