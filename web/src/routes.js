import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LandingPage from './pages/LandingPage';

import DashboardLider from './pages/DashboardLider';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/lider/dashboard" component={DashboardLider} />
      </Switch>
    </BrowserRouter>
  )
}