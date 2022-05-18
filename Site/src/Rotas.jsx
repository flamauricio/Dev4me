import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import FeedEmpresa from "./pages/FeedEmpresa";
import FeedVagas from "./pages/FeedVagas";
import FeedVagasVaga from "./pages/FeedVagasVaga";
import CadastroVaga from "./pages/CadastroVaga";
import Page404 from "./pages/Page404";

function Rotas()
{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/cadastro" element={<Cadastro/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/feed-empresa" element={<FeedEmpresa/>}/>
                    <Route path="/feed-vagas" element={<FeedVagas/>}/>
                    <Route path="/vaga" element={<FeedVagasVaga/>}/>
                    <Route path="/post-vaga" element={<CadastroVaga/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Rotas;
