import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import DashboardLider from './pages/DashboardLider';
import TimesLider from './pages/TimesLider';
import DetailedTeam from './pages/DetailedTeam';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/lider/dashboard" component={DashboardLider} />
        <Route path="/lider/times" exact component={TimesLider} />
        <Route path="/lider/times/detalhes" component={DetailedTeam} />
      </Switch>
    </BrowserRouter>
  )
}