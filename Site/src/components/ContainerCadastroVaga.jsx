import React, { useState } from "react";
import VagasCss from "../css/cadastroVaga.css"


function ContainerCadastoVaga() {
    function publicar() {
        if (atividades === "" || requisitos === "") {
            alert("Favor completar todos os dados.");
            return;
        }
        window.location = "http://localhost:3000/html/feedVagas.html";
    }

    function avancar1() {
        if (titulo === "" || tipo === "" || localizacao === "") {
            alert("Favor completar todos os dados.");
            return;
        }
        setPhaseOneStyle({display: 'none'});
        setPhaseTwoStyle({display: 'block'});
    }

    function avancar2() {
        if (minimo === "" || maximo === "" || descricao === "") {
            alert("Favor completar todos os dados.");
            return;
        }
        setPhaseTwoStyle({display: 'none'});
        setPhaseThreeStyle({display: 'block'});
    }

    const [phaseOneStyle, setPhaseOneStyle] = useState({
        display: 'block'
    });

    const grayButtonDivStyle = {
        textAlign: 'center'
    }

    const [phaseTwoStyle, setPhaseTwoStyle] = useState({
        display: 'none'
    });

    const descricaoStyle = {
        margin: '30px 0 0 0'
    }

    const divButtonStyle = {
        textAlign: 'center'
    }

    const buttonAvancarDoisStyle = {
        margin: '10px 0 0 0'
    }

    const textAreaStyle = {
        height: '70px'
    }

    const [phaseThreeStyle, setPhaseThreeStyle] = useState({
        display : 'none'
    })

    const publicarButtonStyle = {
        margin: '20px 0 0 0',
        backgroundColor: '#1E9CD7'
    }

    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    const [minimo, setMinimo] = useState("");
    const [maximo, setMaximo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [atividades, setAtividades] = useState("");
    const [requisitos, setRequisitos] = useState("");


    return (
        <>
            <div id="container-vg">
                <div id="mainBox-vg">
                    <div id="content-vg">
                        <span className="title-vg">Cadastrar uma nova vaga</span>

                        {/* FASE 1  */}
                        <div id="phaseOne-vg" className="subContent-vg" style={phaseOneStyle}>
                            <div>
                                <div className="smallTitle-vg">Título da vaga</div>
                                <input onInput={(event) => {setTitulo(event.target.value)}} type="text" placeholder="Digite um título para a vaga" />
                            </div>
                            <div>
                                <div className="smallTitle-vg">Tipo de Contrato</div>
                                <select onChange={(event) => {setTipo(event.target.value)}} name="" id="">
                                    <option value="none">Selecione o tipo de contrato</option>
                                    <option value="remoto">Remoto</option>
                                    <option value="hibrido">Híbrido</option>
                                    <option value="presencial">Presencial</option>
                                </select>
                            </div>
                            <div>
                                <div className="smallTitle-vg">Localização</div>
                                <input onInput={(event) => {setLocalizacao(event.target.value)}} type="text" placeholder="Digite a localização" />
                            </div>
                            <div id="text-vg">caso seja uma vaga remota, a localização ficará como “remota”</div>
                            <br />
                            <div style={grayButtonDivStyle}>
                                <button className="grayButton-vg" onClick={avancar1}>Avançar</button>
                            </div>
                        </div>

                        {/* FASE 2 */}
                        <div id="phaseTwo-vg" style={phaseTwoStyle} className="subContent-vg">
                            <div>
                                <div className="smallTitle-vg">Tags da vaga</div>
                                <select name="" id="">
                                    <option value="">Procure por uma tag</option>
                                    <option value="">Java</option>
                                    <option value="">Html</option>
                                    <option value="">CSS</option>
                                    <option value="">React</option>
                                </select>
                            </div>
                            <div id="inputSalario-vg">
                                <div className="smallTitle-vg">Faixa salarial</div>
                                <input type="text" onInput={(event) => {setMinimo(event.target.value)}} className="inputPequeno-vg" placeholder="Valor mínimo" />
                                <input type="text" onInput={(event) => {setMaximo(event.target.value)}} className="inputPequeno-vg" placeholder="Valor máximo" />
                            </div>
                            <div id="text-vg">caso não deseje informar, não insira valores (opcional)</div>

                            <div>
                                <div style={descricaoStyle} className="smallTitle-vg">Breve descrição</div>
                                <textarea style={textAreaStyle} onInput={(event) => {setDescricao(event.target.value)}} name="" id="" cols="30" rows="10" placeholder="Descreva a vaga de forma resumida."></textarea>
                            </div>
                            <div style={divButtonStyle}>
                                <button style={buttonAvancarDoisStyle} onClick={avancar2} className="grayButton-vg">Avançar</button>
                            </div>
                        </div>

                        {/* FASE 3 */}
                        <div id="phaseThree-vg" style={phaseThreeStyle} className="subContent-vg">
                            <div>
                                <div className="smallTitle-vg">Atividades</div>
                                <textarea onInput={(event) => setAtividades(event.target.value)} style={textAreaStyle} name="" id="" cols="30" rows="10" placeholder="Descreva as principais atividades que serão exercídas na vaga, exemplo: “criar páginas web”"></textarea>
                            </div>
                            <div>
                                <div className="smallTitle-vg">Requisitos</div>
                                <textarea style={textAreaStyle} onInput={(event) => setRequisitos(event.target.value)} name="" id="" cols="30" rows="10" placeholder="Descreva os requisitos para a vaga"></textarea>
                            </div>
                            <div style={divButtonStyle}>
                                <button style={publicarButtonStyle} onClick={publicar} className="grayButton-vg">Publicar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerCadastoVaga;