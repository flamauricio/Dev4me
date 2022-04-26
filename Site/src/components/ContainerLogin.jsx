import React, { useState } from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";
import api from "../api";

function ContainerLogin() {

    const inputEmail = useState('');
    const inputSenha = useState('');

function enviaDadosDoInput(event) {

    event.preventDefault();

    if (document.getElementById('inputUsuario').checked) {
    // api.post("usuarios/login", inputEmail, inputSenha).then((response) => {
    //     console.log(response);
    //     });
    window.location = "http://localhost:3000/html/feedVagas.html";
    } else {
    // api.post("empresas/login", inputEmail, inputSenha).then((response) => {
    //     console.log(response);
    //     });
    window.location = "http://localhost:3000/html/feedEmpresa.html";
    }
}

return(
<>
    <div id="container">
        <div className="box">
            <div id="content">
                <Title conteudo="Login"></Title>

                <form onSubmit={enviaDadosDoInput}>

                    <InputTexto onInput={(event) => {inputEmail(event.target.value)}} placeholder="Email"></InputTexto>

                    <InputTexto onInput={(event) => {inputSenha(event.target.value)}} placeholder="Senha"></InputTexto>

                    <DivCheckboxes></DivCheckboxes>

                    <BotaoCadastroLogin conteudo="Entrar"></BotaoCadastroLogin>

                </form>

                <SmallText conteudo="Esqueci minha senha."></SmallText>
            </div>
        </div>
    </div>
</>
);
}

export default ContainerLogin;