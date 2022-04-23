import React from "react";

function Header() {
    return (
        <>
            <div className="divHeaderFather">
                <div className="divHeaderContainer">
                    <a href="/html/homepage.html">
                        <img className="logo" src="../Logo-Dev4Me/logo-nome-simples-dev4me.png" onMouseOver="src='../Logo-Dev4Me/logo-nome-degrade-dev4me.png';" onMouseOut="src='../Logo-Dev4Me/logo-nome-simples-dev4me.png';" alt="" />
                    </a>

                    <div className="divButtons">
                        <button className="buttonHeader"><a className="li-comum"
                            href="./login.html">Entrar</a></button>
                        <a href="./feedVagas.html">
                            <img className="imgIcon" src="../img/home-button-white.png" onMouseOver="src='../img/home-button-blue.png';" onMouseOut="src='../img/home-button-white.png';" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;