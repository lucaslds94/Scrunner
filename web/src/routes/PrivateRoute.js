import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {isAuth} from '../utils/auth';
import {isOwner} from '../utils/isOwner';

export default function PrivateRoute({
  componentOwner: ComponentOwner,
  componentColab: ComponentColab,
  ...rest 
  }){
  return(
    <Route 
      {...rest}
      render={props => 
        isAuth() 
        ? 
          isOwner() ?  <ComponentOwner {...props} /> : <ComponentColab {...props} />
        : <Redirect to={{pathname: '/', state: { from: props.location }}} />
      }
    />
  )
}
