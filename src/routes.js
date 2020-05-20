import React from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute'

import Timeline from './components/Timeline'
import Login from './components/login'
import Register from './components/register'
import AddPlace from './components/AddPlace'
import EditPlace from './components/EditPlace'

export default function Routes() {
  
  return (
    <Switch>
     <Route path="/" component={Timeline} exact/>
     <Route path="/register" component={Register} exact/>
     <Route path="/login" component={Login} exact/>
     <Route path="/add/:user" component={AddPlace} exact/>
     <Route path="/edit/:user/:place" component={EditPlace} exact/>
     <ProtectedRoute path="/dashboard" component={Login} exact/>
    </Switch>
  );
}
