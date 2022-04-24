import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";

function Rotas()
{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/cadastro" element={<Cadastro/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Rotas;
