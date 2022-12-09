import React from "react";

function Tag(props) {

    let mudaCorTag = {
        borderColor : '#FFFFFF',
        color: '#FFFFFF'
    }

    defineCorTag();

    function defineCorTag() {

        if (props.tipo === 'cargo') {
            mudaCorTag = {
                borderColor : '#fa2abf',
                color: '#fa2abf'
            }
        }
        else if (props.tipo === 'linguagens e frameworks') {
            mudaCorTag = {
                borderColor : '#69E3E8',
                color: '#69E3E8'
            }
        }
        else if (props.tipo === 'banco de dados') {
            mudaCorTag = {
                borderColor : '#FFC700',
                color: '#FFC700'
            }
        }
        else if (props.tipo === 'negocios') {
            mudaCorTag = {
                borderColor : '#4c2dfa',
                color: '#4c2dfa'
            }
        }
    }

    return(
        <button style={mudaCorTag} className="tagArea">{props.nome}</button>
    )
}

export default Tag;