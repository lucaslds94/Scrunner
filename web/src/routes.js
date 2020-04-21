import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DashboardLider from "./pages/DashboardLider";
import TimesLider from "./pages/TimesLider";
import DetalhesTime from "./pages/DetalhesTime";

import DashboardColaborador from "./pages/DashboardColaborador";
import TimesColaborador from "./pages/TimesColaborador";
import DetalhesTimeColaborador from "./pages/DetalhesTimeColaborador";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/dashboard" component={DashboardLider} exact />
        <Route path="/times" component={TimesLider} exact />
        <Route
          path="/times/detalhes/:id/:name"
          component={DetalhesTime}
          exact
        />

        <Route path="/dashboard/colaborador" component={DashboardColaborador} />
        <Route path="/times/colaborador" component={TimesColaborador} />
        <Route
          path="/times/detalhes/:id/:name/colaborador"
          component={DetalhesTimeColaborador}
        />
      </Switch>
    </BrowserRouter>
  );
}
