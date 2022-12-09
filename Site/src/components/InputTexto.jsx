import React from "react";

function InputTexto(props)
{
    return (
        <>
            <input 
                type={props.type}
                className="input" 
                name={props.name} 
                placeholder={props.placeholder}
                onInput={props.setter}>    
            </input>
        </>
    )
}

export default InputTexto;