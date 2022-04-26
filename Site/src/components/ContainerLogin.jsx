import React, { useState } from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";
import api, {apiUser, apiEmp} from "../api";

function ContainerLogin() {

    const inputEmail = useState('');
    const inputSenha = useState('');

function enviaDadosDoInput(event) {

    event.preventDefault();

    if (document.getElementById('inputUsuario').checked) {
    // apiUser
    apiUser.post("/autenticar", inputEmail, inputSenha).then((response) => {
        console.log(response);
        });
    } else {
    // apiEmp
    apiEmp.post("/autenticar", inputEmail, inputSenha).then((response) => {
        console.log(response);
        });
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