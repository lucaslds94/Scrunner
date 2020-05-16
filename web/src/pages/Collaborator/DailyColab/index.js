import React from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

import Header from "../../../components/Header";
import MenuLateral from "../../../components/MenuLateral";
import Container from "../../../components/Container";
import ButtonChangeScreen from "../../../components/ButtonChangeScreen";

import CardDaily from "../../../components/CardDaily";

export default function DailyColab() {
  let { name } = useParams();

  return (
    <div className="detalhes-times-daily">
      <Header userName={"Ana Fonseca"} />
      <MenuLateral homeActive={false} />

      <Container>
        <div className="header-times-daily">
          <div className="header-titles">
            <h2>Dailys</h2>
            <Link to={`/times/detalhes/2/${name}`}>{name}</Link>
          </div>
          <div className="header-buttons">
            <ButtonChangeScreen
              titleButton={"Dailys"}
              to={`/times/daily/${name}`}
              active
            />
            <ButtonChangeScreen
              titleButton={"Tarefas"}
              to={`/times/tarefa/${name}`}
            />
          </div>
        </div>
        <div className="divider" />
        <div className="container-boards">
          <CardDaily 
            date={"01/04"}   
            to={`/times/dailylog/${name}/01-04`}/>
          <CardDaily
            date={"26/03"}
            isComplete={true}
            yourDaily={true}
            leaderDaily={true}
            to={`/times/dailylog/${name}/26-03`}
          />
        </div>
      </Container>
    </div>
  );
}
