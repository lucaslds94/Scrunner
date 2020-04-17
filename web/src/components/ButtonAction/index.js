import React from "react";

import { FaPlus } from 'react-icons/fa'

import './styles.css';

export default function ButtonAction({
    ButtonText = "None",
    ButtonIcon = FaPlus,
    onClick 
}) {

    return (
        <div>
            <button onClick={onClick} className="action-button"> 
                <ButtonIcon /> 
                <span> {ButtonText} </span>
            </button>
        </div>
    )
}