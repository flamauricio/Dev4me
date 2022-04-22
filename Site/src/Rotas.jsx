import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";

function Rotas()
{
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/cadastro" element={<Cadastro/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Rotas;
