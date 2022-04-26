import React from "react";

function InputTexto(props)
{
    return (
        <>
        <input type="text" className="input" name={props.name} placeholder={props.placeholder}></input>
        </>
    )
}

export default InputTexto;