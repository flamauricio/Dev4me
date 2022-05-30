import React, { useEffect, useState } from "react";
import HeaderLogado from "../components/HeaderLogado";
import feedVagasVagscss from "../css/feedVagasVaga.css";
import imgLocal from "../img/local.png";
import imgContract from "../img/contract.png";
import imgPayment from "../img/payment.png";
import api from "../api";
import Tag from "../components/Tag";

function FeedVagasVaga() {
    const [vaga, setVaga] = useState("");
    const [tags, setTags] = useState("");
    const idVaga = sessionStorage.getItem("idVaga");

    React.useEffect(() => {
        api.get(`/vagas/${idVaga}`)
        .then((resposta) => {
                setTags(resposta.data.tags);
                setVaga(resposta.data.vaga);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    function plotarTags()
    {
        if (tags == "") {
            setTimeout(() => {
                plotarTags();
            }, 2000);
            return;
        }
        return (
            tags.map((item) => {
                return (
                    <Tag
                        nome={item.nome}
                        tipo={item.tipo}
                    />
                )
            })
        )
    }

    function candidatar()
    {
        let idUsuario = sessionStorage.getItem("idUsuario");
        let idVaga = sessionStorage.getItem("idVaga");
        api.post(`/candidatos/${idVaga}/${idUsuario}`)
        .then((resposta) => {
            if (resposta.status === 201) {
                alert("Você se candidatou para esta vaga, boa sorte!");
                window.location = "http://localhost:8080/feed-vagas";
            } else if (resposta.status === 200) {
                alert("Você já se candidatou para essa vaga.");
            }
        })
        .catch((error) => {
            alert("Erro ao candidatar-se.");
        })
    }

    return (
        <>
                <HeaderLogado />
                <div className="divVagaFather">
                    <div className="divVagaBody">
                        <div className="divVagaContent">

                            <div className="divPageTitle">
                                <p className="pageTitle">{vaga.titulo}</p>
                            </div>

                            <div className="divSpaceBetween">
                                <div className="divSmallBox">
                                    <div className="divTitle">
                                        <p className="subtitle">Localização</p>
                                        <img src={imgLocal} />
                                    </div>
                                    <div className="divInputFormatter">
                                        <div className="divInput">
                                            <p className="smallText">{vaga.localizacao}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="divSmallBox">
                                    <div className="divTitle">
                                        <p className="subtitle">Contrato</p>
                                        <img src={imgContract} />
                                    </div>
                                    <div className="divInputFormatter">
                                        <div className="divInput">
                                            <p className="smallText">{vaga.contrato}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="divSmallBox">
                                    <div className="divTitle">
                                        <p className="subtitle">Salário</p>
                                        <img src={imgPayment} />
                                    </div>
                                    <div className="divInputFormatter">
                                        <div className="divInput">
                                            <p className="smallText">{vaga.faixaSalarialMin} até {vaga.faixaSalarialMax}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Descrição</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInput">
                                        <p className="smallText">{vaga.descricao}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Tags</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInputWrap">
                                        {
                                            plotarTags()
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Requisitos</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInput">
                                        <p className="smallText">{vaga.requisitos}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divBigBox">
                                <div className="divTitle">
                                    <p className="subtitle">Atividades</p>
                                </div>
                                <div className="divInputFormatter">
                                    <div className="divBigInput">
                                        <p className="smallText">{vaga.atividades}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="divPageButton">
                                <button onClick={() => {candidatar()}} className="bigButton">Candidatar-se</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default FeedVagasVaga;