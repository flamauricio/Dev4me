import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import InputTexto from "../components/InputTexto";
import Title from "../components/Title";
import DivCheckboxes from "../components/DivCheckboxes";
import BotaoCadastroLogin from "../components/BotaoCadastroLogin";
import SmallText from "../components/SmallText";

function Cadastro() {
    return (
        <>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="../html-css-template/css/cadastro.css" />
            <title>Document</title>
        </head>
        <body>
        <Header></Header>
            <Container>
                <Title conteudo = "Cadastro"></Title>

                <InputTexto placeholder = "Nome"></InputTexto>
                <InputTexto placeholder = "Email"></InputTexto>
                <InputTexto placeholder = "Senha"></InputTexto>

                <DivCheckboxes></DivCheckboxes>

                <BotaoCadastroLogin></BotaoCadastroLogin>
                
                <SmallText conteudo = "Já possui cadastro? Clique aqui."></SmallText>
            </Container> 
        </body>
        </html>
        </>
    )
}

export default Cadastro;