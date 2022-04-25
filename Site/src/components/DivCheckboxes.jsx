import React from "react";

function DivCheckboxes() {
    return (
        <>
            <form id="checkboxes">
                <div>
                    <input type="radio" name="radioInput" id="inputEmpresa"/><span>Sou empresa</span>
                </div>
                <div>
                    <input type="radio" name="radioInput" id="inputUsuario"/><span>Sou candidato</span>
                </div>
            </form>
        </>
    )
}

export default DivCheckboxes;