import React, { useState } from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";
import api from "../api";
import cadastrocss from "../css/cadastro.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ContainerCadastro() {

    const [inputNome, setNome] = useState("");
    const [inputEmail, setEmail] = useState("");
    const [inputSenha, setSenha] = useState("");

    function setarNome(e) {
        setNome(e.target.value);
    }

    function setarEmail(e) {
        setEmail(e.target.value);
    }

    function setarSenha(e) {
        setSenha(e.target.value);
    }

    function successMessage() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Cadastro realizado com sucesso</strong>,
                            icon: 'success'
                        }).then(() => {

                            window.location = "http://localhost:3000/login";
                        
                        })
    }

    function errorMessage() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Não foi possível realizar o cadastro</strong>,
                            icon: 'error'
                        })
    }

    function errorMessageEmailAlreadyExists() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>O email informado já está em uso</strong>,
                            icon: 'error'
                        })
    }

    function cadastrar(e) {

        e.preventDefault();

        let usuario = {
            nome: inputNome,
            email: inputEmail,
            senha: inputSenha
        }

        if (document.getElementById("inputEmpresa").checked) {

            api.post("/empresas", usuario)
            .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        successMessage();
                    } 
                    else if (response.status === 203) {
                        errorMessageEmailAlreadyExists();
                    }
                    else {
                        errorMessage();
                        console.log("Código do erro: ", response.status);
                    }
                })

                .catch((error) => {
                    console.log(error);
                    errorMessage();
                })

        }
        else if (document.getElementById('inputUsuario').checked) {

            api.post("/usuarios", usuario)

                .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                        successMessage();
                    } 
                    else if (response.status === 203) {
                        errorMessageEmailAlreadyExists();
                    }
                    else {
                        errorMessage();
                        console.log("Código do erro: ", response.status);
                    }
                })

                .catch((error) => {
                    console.log(error);
                    errorMessage();
                })
        } 
        else {
            alert("Favor selecionar uma opção.");
        }

    }

    function levarParaLogin() {
        window.location = "http://localhost:3000/login";
    }

    function startLoadingGif() {

    }

    return (
        <>
            <div id="container">
                <div className="box">
                    <div id="content">
                        <Title conteudo="Cadastro"></Title>
                        <form onSubmit={cadastrar} method="post">
                           <InputTexto setter={setarNome} type="text" name="nome" placeholder="nome"></InputTexto>

                            <InputTexto setter={setarEmail} type="text" name="email" placeholder="email"></InputTexto>

                            <InputTexto setter={setarSenha} type="password" name="senha" placeholder="senha"></InputTexto>

                            <DivCheckboxes></DivCheckboxes>

                            <BotaoCadastroLogin conteudo="Cadastrar"></BotaoCadastroLogin>

                            <SmallText onClick={levarParaLogin} conteudo="Já possui cadastro? Clique aqui."></SmallText>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContainerCadastro;