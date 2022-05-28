import React, { useState, useEffect } from "react";
import BotaoCadastroLogin from "./BotaoCadastroLogin";
import DivCheckboxes from "./DivCheckboxes";
import InputTexto from "./InputTexto";
import SmallText from "./SmallText";
import Title from "./Title";
import api from "../api";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function ContainerLogin(props) {

    const [inputEmail, setEmail] = useState("");
    const [inputSenha, setSenha] = useState("");

    const loadingDiv = {
        display: 'none'
    }

    const botaoDisplay = {}

    // loadingDiv = {
    //     display: 'block'
    // }

    // botaoDisplay = {
    //     display: 'none'
    // }

    function setarEmail(e) {
        setEmail(e.target.value);
    }

    function setarSenha(e) {
        setSenha(e.target.value);
    }

    // function successMessage() {
    //     const MySwal = withReactContent(Swal)

    //                     MySwal.fire({
    //                         title: <strong>Cadastro realizado com sucesso</strong>,
    //                         icon: 'success'
    //                     }).then(() => {
                            
    //                         window.location = "http://localhost:3000/feed-empresa";
                        
    //                         startLoadingGif();
    //                     })
    // }

    function infoMessage() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Favor selecionar uma opção</strong>,
                            icon: 'info'
                        })
    }

    function errorMessage() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Não foi possível realizar o login</strong>,
                            icon: 'error'
                        })
    }

    function errorMessageLogin() {
        const MySwal = withReactContent(Swal)

                        MySwal.fire({
                            title: <strong>Email e/ou senha incorretos!</strong>,
                            icon: 'error'
                        })
    }

    function entrar(e) {

        // loadingDiv = {
        //     display: 'block'
        // }

        // botaoDisplay = {
        //     display: 'none'
        // }

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

                        startLoadingGif();
                        
                        sessionStorage.setItem("idEmpresa", response.data)

                        window.location = "http://localhost:3000/feed-empresa";
                        
                    } else {
                        errorMessage();
                        console.log("Código do erro: ", response.status);
                    }
                })

                .catch((error) => {

                    console.log(error);

                    errorMessageLogin();
                })

        }
        else if (document.getElementById('inputUsuario').checked) {

            api.post("/usuarios/login", usuario)

                .then((response) => {
                    if (response.status === 200) {

                        startLoadingGif();

                        sessionStorage.setItem("idUsuario", response.data)

                        window.location = "http://localhost:3000/feed-vagas";
                        
                    } else {
                        errorMessage();
                        console.log("Código do erro: ", response.status);
                    }
                })

                .catch((error) => {

                    console.log(error);

                    errorMessageLogin();
                })
        } 
        else {
            infoMessage();
        }

    }

    function startLoadingGif() {

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

                            <BotaoCadastroLogin conteudo="Entrar" style={botaoDisplay}></BotaoCadastroLogin>

                            <div className="c-loader" style={loadingDiv}></div>
                        </form>
                        <SmallText conteudo="Esqueci minha senha."></SmallText>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerLogin;