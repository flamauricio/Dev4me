import React from "react";
import Header from "../components/Header";
import ContainerLogin from "../components/ContainerLogin"
import Footer from "../components/Footer";

function Login()
{
    sessionStorage.clear();

    return(
        <>
            <Header nomeBotao = "Cadastrar" encaminharTo="https://dev4me.ddns.net/cadastro"/>
            <ContainerLogin/>
            <Footer/>
        </>
    )
}

export default Login;