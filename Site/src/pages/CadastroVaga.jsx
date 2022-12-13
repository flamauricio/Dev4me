import React, { useState } from "react";
import HeaderLogado from "../components/HeaderLogado";
import ContainerCadastoVaga from "../components/ContainerCadastroVaga";

function CadastroVaga() {
    return (
        <>
            <HeaderLogado
             encaminharToFeed="/feed-empresa"
             encaminharTo="/perfil-empresa"
             />
            <ContainerCadastoVaga/>
        </>
    );
}

export default CadastroVaga;