import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

import LandingPage from "./pages/LandingPage";
import Validate from "./pages/Validate";

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
import Profile from "./pages/Profile";

import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/validate/:token" component={Validate} exact />
        <PrivateRoute
          path="/dashboard"
          componentOwner={DashboardLeader}
          componentColab={DashboardColab}
        />
        <PrivateRoute
          path="/times"
          componentOwner={TeamsLeader}
          componentColab={TeamsColab}
          exact
        />
        <PrivateRoute
          path="/times/detalhes/:name"
          componentOwner={DetailsTeamsLeader}
          componentColab={DetailsTeamColab}
          exact
        />

        <PrivateRoute
          path="/times/daily/:name"
          componentColab={DailyColab}
          componentOwner={Unauthorized}
          exact
        />
        <PrivateRoute
          path="/times/dailylog/:name"
          componentColab={DailyLog}
          componentOwner={Unauthorized}
          exact
        />
        <PrivateRoute
          path="/times/tarefas/:name"
          componentColab={TasksColab}
          componentOwner={Unauthorized}
          exact
        />
        <PrivateRoute
          path="/times/kanban/:name/:boardTitle"
          componentColab={TeamKanban}
          componentOwner={Unauthorized}
          exact
        />
        <PrivateRoute
          path="/perfil"
          componentColab={Profile}
          componentOwner={Profile}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
