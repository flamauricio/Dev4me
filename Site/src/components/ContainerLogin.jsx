import React from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";
import {apiUser, apiEmp} from "../api";

function ContainerLogin() {

    function enviaDadosDoInput() {
        // let email = inputEmailLogin.value;
        // let senha = inputSenhaLogin.value;
    }

    return(
    <>
        <div id="container">
            <div class="box">
                <div id="content">
                    <Title conteudo="Login"></Title>

                    <InputTexto id="inputEmailLogin" placeholder="Email"></InputTexto>
                    <InputTexto id="inputSenhaLogin" placeholder="Senha"></InputTexto>

                    <DivCheckboxes></DivCheckboxes>

                    <BotaoCadastroLogin onClick={enviaDadosDoInput()} conteudo="Entrar"></BotaoCadastroLogin>

                    <SmallText conteudo="Esqueci minha senha."></SmallText>
                </div>
            </div>
        </div>
    </>
    );
}

export default ContainerLogin;