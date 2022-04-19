import React from "react";

function InputTexto(props)
{
    return (
        <>
        <input type="text" className="input" placeholder={props.placeholder}></input>
        </>
    )
}

export default InputTexto;