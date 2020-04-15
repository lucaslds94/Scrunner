import React from 'react';

import { FaSlackHash as Hash } from 'react-icons/fa';

import './styles.css';

export default function CardTeam({
    teamName = "No name",
    teamCategory = "Development",
    teamCode = "No code",
    teamMembers = []
}) {

    // createListUsers = () => {

        
    // }


    return (

        <div className="cardTeam-container">
            <h2> {teamName} </h2>
            <div className="cardteam-divider"></div>

            <div className="cardteam-category">
                <p> Categoria </p>
                <span> {teamCategory} </span>
            </div>

            <p> Código </p>
            <span className="cardteam-code"> 
                <Hash 
                    style={ { color: '#737FF3' } }
                    size={24} />
                {teamCode} 
            </span>

            <div className="cardteam-divider"></div>

            <div className="cardteam-members">
                <p> Membros </p>
                <p> {teamMembers.length} </p>
            </div>

            <div className="cardteam-names">
                { teamMembers.slice(0, 2).map(member =>  { 
                    return (
                        <p> {member} </p>
                    )
                })}

                {/* <p> Ana Fonseca </p>
                <p> José Afonso </p> */}
                {teamMembers.length !== 0 ? 
                    <span> E mais { teamMembers.length - 2  } outros... </span>
                    : 
                    <span> Esse time ainda não possui membros... </span>
                }
                
            </div>
            


        </div>
    )
}