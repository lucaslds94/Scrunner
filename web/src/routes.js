import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DashboardLider from "./pages/DashboardLider";
import TimesLider from "./pages/TimesLider";
import TimesColaborador from "./pages/TimesColaborador";
import DetalhesTime from "./pages/DetalhesTime";
import DashboardColaborador from './pages/DashboardColaborador';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard" exact component={DashboardLider} />
        <Route path="/times" exact component={TimesLider} />
        <Route path="/times/detalhes/:id/:name" component={DetalhesTime} />

        <Route path="/dashboard/colaborador" component={DashboardColaborador} />
        <Route path="/times/colaborador" component={TimesColaborador} />
      </Switch>
    </BrowserRouter>
  );
}
