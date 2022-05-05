import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import FeedEmpresa from "./pages/FeedEmpresa";
import FeedVagasVaga from "./pages/FeedVagasVaga";
import CadastroVaga from "./pages/CadastroVaga";

function Rotas()
{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/cadastro" element={<Cadastro/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/feed-empresa" element={<FeedEmpresa/>}/>
                    <Route path="/vaga" element={<FeedVagasVaga/>}/>
                    <Route path="/post-vaga" element={<CadastroVaga/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Rotas;
