import React from "react";

import { FaPlus } from 'react-icons/fa'

import './styles.css';

export default function ButtonAction({
    ButtonText = "None",
    ButtonIcon = FaPlus 
}) {

    return (
        <div>
            <button className="action-button"> 
                <ButtonIcon /> 
                <span> {ButtonText} </span>
            </button>
        </div>
    )
}