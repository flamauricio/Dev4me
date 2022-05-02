import React from "react";
import logoNomeSimples from "../Logo-Dev4Me/logo-nome-simples-dev4me.png";
import buttonWhite from "../img/home-button-white.png";
import buttonProfile from "../img/user-profile-white.png";

function HeaderLogado() {
    return (
        <>
            <div className="divHeaderFather">
                <div className="divHeaderContainer">
                    <a href="../html/homepageAlt.html">
                        <img id="img" className="logo" src={logoNomeSimples} 
                        onMouseOver={() => {document.getElementById('img').src="../Logo-Dev4Me/logo-nome-degrade-dev4me.png"}} 
                        onMouseOut={() => {document.getElementById('img').src="../Logo-Dev4Me/logo-nome-simples-dev4me.png"}} />
                    </a>

                    <div className="divButtons">
                        <a href="../html/feedVagas.html">
                            <img id="img2" className="imgIcon" src={buttonWhite} 
                            onMouseOver={() => {document.getElementById('img2').src="'../img/home-button-blue.png"}} 
                            onMouseOut={() => {document.getElementById('img2').src="../img/home-button-white.png"}} />
                        </a>

                        <a href="../html/perfilCandidato.html">
                            <img id="img3" className="imgIcon" src={buttonProfile} 
                            onMouseOver={() => {document.getElementById('img3').src="'../img/user-profile-blue.png"}} 
                            onMouseOut={() => {document.getElementById('img3').src="../img/user-profile-white.png"}} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderLogado;