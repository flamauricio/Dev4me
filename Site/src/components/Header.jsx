import React from "react";
import logoNomeSimples from "../Logo-Dev4Me/logo-nome-simples-dev4me.png";
import buttonWhite from "../img/home-button-white.png";

function Header(props) {
    return (
        <>
            <div className="divHeaderFather">
                <div className="divHeaderContainer">
                    <a href="../html/homePage.html">
                        <img id="img" className="logo" src={logoNomeSimples} 
                        onMouseOver={() => {document.getElementById('img').src="../Logo-Dev4Me/logo-nome-degrade-dev4me.png"}} 
                        onMouseOut={() => {document.getElementById('img').src="../Logo-Dev4Me/logo-nome-simples-dev4me.png"}} alt="" />
                    </a>

                    <div className="divButtons">
                        <button className="buttonHeader"><a className="li-comum"
                            href={props.encaminharTo}>{props.nomeBotao}</a></button>
                        <a href="../html/feedVagas.html">
                            <img id="img2" className="imgIcon" src={buttonWhite} 
                            onMouseOver={() => {document.getElementById('img2').src="'../img/home-button-blue.png"}} 
                            onMouseOut={() => {document.getElementById('img2').src="../img/home-button-white.png"}} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;