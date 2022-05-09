import React, { useState } from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";
import api from "../api";

function ContainerLogin(props) {

    const [inputEmail, setEmail] = useState("");
    const [inputSenha, setSenha] = useState("");

    function setarEmail(e) {
        setEmail(e.target.value);
    }

    function setarSenha(e) {
        setSenha(e.target.value);
    }

    function entrar(e) {
        e.preventDefault();

        // setEmail(sessionStorage.getItem("email"));
        // setSenha(sessionStorage.getItem("senha"));

        let usuario = {
            email: inputEmail,
            senha: inputSenha
        }

        if (document.getElementById("inputEmpresa").checked) {

            api.post("/empresas/login", usuario)

                .then((response) => {
                    if (response.status === 200) {
                        sessionStorage.setItem("idEmpresa", response.data)
                        window.location = "http://localhost:3000/feed-empresa";
                    } else {
                        alert("Erro não especificado.")
                        console.log("Código do erro: ", response.status);
                    }
                })

                .catch((error) => {
                    console.log(error);
                    alert("Email ou senha incorretos!")
                })

        }
        else if (document.getElementById('inputUsuario').checked) {

            api.post("/usuarios/login", usuario)

                .then((response) => {
                    if (response.status === 200) {
                        sessionStorage.setItem("idUsuario", response.data);
                        window.location = "http://localhost:3000/html/feedVagas.html";
                    } else {
                        alert("Erro não especificado.")
                        console.log("Código do erro: ", response.status);
                    }
                })

                .catch((error) => {
                    console.log(error);
                    alert("Email ou senha incorretos!");
                })
        } 
        else {
            alert("Favor selecionar uma opção.");
        }

    }

    return (
        <>
            <div id="container">
                <div className="box">
                    <div id="content">
                        <Title conteudo="Login"></Title>

                        <form action="" method="post" onSubmit={entrar}>
                            <InputTexto setter={setarEmail} type="text" name="email" placeholder="email"></InputTexto>

                            <InputTexto setter={setarSenha} type="password" name="senha" placeholder="senha"></InputTexto>

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