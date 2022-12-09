import React from "react";
import logoSimples from "../Logo-Dev4Me/logo-nome-simples-dev4me.png";
import whiteProfileImg from "../img/user-profile-white.png";
import whiteHomeImg from "../img/home-button-white.png";
import headerCss from "../css/headerInstitucional.css"

function HeaderLogado(props) {
    const divHeaderStyle = {
        position : 'unset'
    }

    const aStyle = {
        margin : '0 7% 0 0'
    }

    return (
        <>
            <div className="divHeaderFather" style={divHeaderStyle}>
                <div className="divHeaderContainer">
                    <a href={props.encaminharToFeed}><img id="img1" className="logo" src={logoSimples}
                        onMouseOver={() => document.getElementById("img1").src = "../Logo-Dev4Me/logo-nome-degrade-dev4me.png"}
                        onMouseOut={() => document.getElementById("img1").src = "../Logo-Dev4Me/logo-nome-simples-dev4me.png"}/></a>

                    <div className="divButtons">
                        <a href={props.encaminharTo} style={aStyle}><img id="img2" className="imgProfile"
                            src={whiteProfileImg} onMouseOver={() => {document.getElementById("img2").src = "../img/user-profile-blue.png"}}
                            onMouseOut={() => document.getElementById("img2").src = "../img/user-profile-white.png"}/></a>
                        <a href={props.encaminharToFeed}><img id="img3" className="imgIcon" src={whiteHomeImg}
                            onMouseOver={() => document.getElementById("img3").src = "../img/home-button-blue.png"}
                            onMouseOut={() => {document.getElementById("img3").src = "../img/home-button-white.png"}}/></a>
                    </div>
                </div>

            </div>
        </>
    );
}

export default HeaderLogado;