import React from "react";
import ContainerCadastro from "../components/ContainerCadastro";
import Header from "../components/Header";
import InputTexto from "../components/InputTexto";
import Title from "../components/Title";
import DivCheckboxes from "../components/DivCheckboxes";
import BotaoCadastroLogin from "../components/BotaoCadastroLogin";
import SmallText from "../components/SmallText";
import Footer from "../components/Footer";

function Cadastro() {
    return (
        <>
            <Header nomeBotao = "Entrar" encaminharTo="http://localhost:3000/login"/>
            <ContainerCadastro/>
            <Footer/>
        </>
    )
}

export default Cadastro;