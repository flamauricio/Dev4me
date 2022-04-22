import React from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";

function Container() {
    return (
        <>
            <div id="container">
                <div class="box">
                    <div id="content">
                        <Title conteudo="Cadastro"></Title>

                        <InputTexto placeholder="Nome"></InputTexto>
                        <InputTexto placeholder="Email"></InputTexto>
                        <InputTexto placeholder="Senha"></InputTexto>

                        <DivCheckboxes></DivCheckboxes>

                        <BotaoCadastroLogin conteudo="Cadastrar"></BotaoCadastroLogin>

                        <SmallText conteudo="Já possui cadastro? Clique aqui."></SmallText>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Container;