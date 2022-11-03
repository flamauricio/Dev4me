import React from "react";
import Header from "../components/Header";
import ContainerLogin from "../components/ContainerLogin"
import Footer from "../components/Footer";

function Login()
{
    sessionStorage.clear();

    return(
        <>
            <Header nomeBotao = "Cadastrar" encaminharTo="http://dev4me.ddns.net:3000/cadastro"/>
            <ContainerLogin/>
            <Footer/>
        </>
    )
}

export default Login;