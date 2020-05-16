import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {isAuth} from '../utils/auth';
import {isLeader} from '../utils/isLeader';

export default function PrivateRoute({
  componentLeader: ComponentLeader,
  componentColab: ComponentColab,
  ...rest 
  }){
  return(
    <Route 
      {...rest}
      render={props => 
        isAuth() 
        ? 
          isLeader() ?  <ComponentLeader {...props} /> : <ComponentColab {...props} />
        : <Redirect to={{pathname: '/', state: { from: props.location }}} />
      }
    />
  )
}
