import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

import DashboardLeader from "./pages/Leader/DashboardLeader";
import TeamsLeader from "./pages/Leader/TeamsLeader";
import DetailsTeamsLeader from "./pages/Leader/DetailsTeamsLeader";

import DashboardColab from "./pages/Collaborator/DashboardColab";
import TeamsColab from "./pages/Collaborator/TeamsColab";
import DetailsTeamColab from "./pages/Collaborator/DetailsTeamColab";
import TasksColab from "./pages/Collaborator/TasksColab";
import DailyColab from "./pages/Collaborator/DailyColab";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard" component={DashboardLeader} exact />
        <Route path="/times" component={TeamsLeader} exact />
        <Route
          path="/times/detalhes/:id/:name"
          component={DetailsTeamsLeader}
          exact
        />

        <Route path="/dashboard/colaborador" component={DashboardColab} />
        <Route path="/times/colaborador" component={TeamsColab} exact />
        <Route
          path="/times/detalhes/:id/:name/colaborador"
          component={DetailsTeamColab}
        />
        <Route path="/times/colaborador/tarefa/:name" component={TasksColab} />
        <Route path="/times/colaborador/daily/:name" component={DailyColab} />
      </Switch>
    </BrowserRouter>
  );
}
