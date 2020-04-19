import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DashboardLider from "./pages/DashboardLider";
import TimesLider from "./pages/TimesLider";
import DetailedTeam from "./pages/DetailedTeam";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard" component={DashboardLider} />
        <Route path="/times" exact component={TimesLider} />
        <Route path="/times/detalhes/:id/:name" component={DetailedTeam} />
      </Switch>
    </BrowserRouter>
  );
}
