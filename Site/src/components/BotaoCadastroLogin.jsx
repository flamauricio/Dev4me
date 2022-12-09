import React from "react";
import ContainerLogin from "./ContainerLogin";

function BotaoCadastroLogin(props)
{
    return (
        <button type="submit" onClick={props.method}>{props.conteudo}</button>
    );
}

export default BotaoCadastroLogin;