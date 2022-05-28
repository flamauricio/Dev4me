import React, { useState, useEffect } from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import api from "../api";
import alertImage from "../img/warning.png"

function PerfilEmpresa() {

    const buttonCriarVaga = {
        width : '90%',
        marginTop : '5%',
        padding : '1.5rem'
    }

    function direcionarParaCadastroVaga() {
        window.location = "http://localhost:3000/post-vaga";
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
                    <img alt="" className="image-alert" src={alertImage} />
                </div>
                <p className="bigTitleUserProfile">Configurações</p>
                <p className="title-user">Editar informações</p>
                <p className="title-user">Mudar senha</p>
                <p className="title-user">Sair</p>

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
                    <p className="bigTitleUserProfile">Nome Empresa</p>
                    <input id="inputNome" disabled={true}  className="input-user-small" type="text" />
                </div>
            </div>
            </div>
        </>
    )
}

export default PerfilEmpresa;