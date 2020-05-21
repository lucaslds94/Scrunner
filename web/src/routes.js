import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from './routes/PrivateRoute';

import LandingPage from "./pages/LandingPage";

import DashboardLeader from "./pages/Leader/DashboardLeader";
import TeamsLeader from "./pages/Leader/TeamsLeader";
import DetailsTeamsLeader from "./pages/Leader/DetailsTeamsLeader";

import DashboardColab from "./pages/Collaborator/DashboardColab";
import TeamsColab from "./pages/Collaborator/TeamsColab";
import DetailsTeamColab from "./pages/Collaborator/DetailsTeamColab";
import DailyColab from "./pages/Collaborator/DailyColab";
import DailyLog from "./pages/Collaborator/DailyLog";
import TasksColab from "./pages/Collaborator/TasksColab";
import TeamKanban from "./pages/Collaborator/TeamKanban";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <PrivateRoute
          path="/dashboard"
          componentLeader={DashboardLeader}
          componentColab={DashboardColab} />
        <PrivateRoute
          path="/times" 
          componentLeader={TeamsLeader} 
          componentColab={TeamsColab}
          exact
        />
        <PrivateRoute
          path="/times/detalhes/:name"
          componentLeader={DetailsTeamsLeader}
          componentColab={DetailsTeamColab}
          exact
        />

        <PrivateRoute 
          path="/times/daily/:name" 
          componentColab={DailyColab}
          componentLeader={() => <h1>Você não tem acesso a essa página</h1>} 
          exact
        />
        <PrivateRoute
          path="/times/dailylog/:name/:dailyDate"
          componentColab={DailyLog}
          componentLeader={() => <h1>Você não tem acesso a essa página</h1>} 
          exact
        />
        <PrivateRoute 
          path="/times/tarefa/:name" 
          componentColab={TasksColab}
          componentLeader={() => <h1>Você não tem acesso a essa página</h1>} 
          exact 
        />
        <PrivateRoute
          path="/times/kanban/:name/:boardTitle/:boardDate"
          componentColab={TeamKanban}
          componentLeader={() => <h1>Você não tem acesso a essa página</h1>} 
          exact 
        />
        <Route path="*" component={() => <h1>Page not found 404</h1>} /> 
      </Switch>
    </BrowserRouter>
  );
}
