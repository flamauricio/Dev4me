import React from "react";
import ContainerCadastro from "../components/ContainerCadastro";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Cadastro() {
    return (
        <>
            <Header nomeBotao = "Entrar" to="/login"/>
            <ContainerCadastro/>
            <Footer/>
        </>
    )
}

export default Cadastro;