import React, { useState, useEffect } from "react";
import HeaderLogado from "../components/HeaderLogado";
import api from "../api";
import alertImage from "../img/warning.png"

function PerfilUsuario() {

    return(
        <>
        <HeaderLogado />
        <div className="sidebar-user">
            <div className="sidebar-container-user">
                <div className="div-image-alert">
                    <img className="image-alert" src={alertImage} />
                </div>
                <p className="bigTitle">Configurações</p>
                <p className="title-user">Editar informações</p>
                <p className="title-user">Mudar senha</p>
                <p className="title-user">Sair</p>
            </div>
        </div>

        <div className="main-div-user">
            <div className="divSpaceBetween4">
                <div className="div-input-user-small">
                    <p className="bigTitle">Nome</p>
                    <input className="input-user-small" type="text" />
                </div>
            </div>
        </div>
        </>
    )
}

export default PerfilUsuario;