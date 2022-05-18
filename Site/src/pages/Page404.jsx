import React from "react";
import HeaderLogadoDois from "../components/HeaderLogadoDois";
import page404css from "../css/page404.css"
import { useNavigate } from 'react-router-dom';

function Page404() {

    const navigate = useNavigate();

    const bodyBackgroundColor = {
        backgroundColor: '#EAF7FA',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center'
    }

    const containerDiv = {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between'
    }

    const halfDiv = {
        width: '45%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }

    const halfDivImg = {
        width: '45%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center'
    }

    const img404 = {
        width: '100%',
    }

    return (
        <>
        <HeaderLogadoDois />
        <div style={bodyBackgroundColor}>
            <div style={containerDiv}>
                <div style={halfDiv}>
                    <span className="pageTitle">
                        Opa, página <br />
                        não encontrada
                    </span>
                    <button className="button404" onClick={() => navigate(-1)}>Voltar</button>
                </div>
                <div style={halfDivImg}>
                    <img style={img404} src="https://cdn.dribbble.com/users/2446071/screenshots/6903453/404.gif" />
                </div>
            </div>
        </div>
        </>
    )
}

export default Page404;