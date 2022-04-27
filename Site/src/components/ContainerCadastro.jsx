import React from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";
import api from "../api";

function ContainerCadastro() {
    function cadastrar(event) {

        event.preventDefault();
        
        window.location = "http://localhost:3000/login";
        // if (document.getElementById("inputUsuario").checked) {
        //     api.post("/usuarios").
        //     then((response) => {
        //         console.log(response);
        //     })
        // } else {
            
        //     api.post("/empresas").
        //     then((response) => {
        //         console.log(response);
        //     })
        // }
    }

    return (
        <>
            <div id="container">
                <div className="box">
                    <div id="content">
                        <Title conteudo="Cadastro"></Title>
                        <form onSubmit={cadastrar} method="post">
                            <InputTexto name="nome" placeholder="Nome Completo"></InputTexto>
                            <InputTexto name="email" placeholder="Email"></InputTexto>
                            <InputTexto name="senha" placeholder="Senha"></InputTexto>

                            <DivCheckboxes></DivCheckboxes>

                            <BotaoCadastroLogin conteudo="Cadastrar"></BotaoCadastroLogin>

                            <SmallText conteudo="Já possui cadastro? Clique aqui."></SmallText>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContainerCadastro;