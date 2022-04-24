import React from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";

function ContainerLogin() {
    return(
    <>
        <div id="container">
            <div class="box">
                <div id="content">
                    <Title conteudo="Login"></Title>

                    <InputTexto placeholder="Email"></InputTexto>
                    <InputTexto placeholder="Senha"></InputTexto>

                    <DivCheckboxes></DivCheckboxes>

                    <BotaoCadastroLogin conteudo="Entrar"></BotaoCadastroLogin>

                    <SmallText conteudo="Esqueci minha senha."></SmallText>
                </div>
            </div>
        </div>
    </>
    );
}

export default ContainerLogin;