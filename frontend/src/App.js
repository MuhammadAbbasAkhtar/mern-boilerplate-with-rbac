
import React, {  useEffect } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
// import * as auth from './helpers/UserAuth'
import Login from './components/Auth/SignIn'
import Signup from './components/Auth/SignUp'
import ForgotPassword from './components/Auth/ForgotPassword'
import Landing from './components/Landing'
import ApiDocs from './components/ApiDocs'
import PrivateRoute from './helpers/PrivateRoute'
import pathLocations from './data/pathLocations'
// import  from './containers/Dashboard'
// import Project from './containers/Project'
import { Dashboard, Project } from "./containers"
import {isLoggedIn} from './helpers/UserAuth'
import VerifyEmail from './components/Auth/VerifyEmail'
function App() {
  const path = pathLocations
  useEffect(() => {
    if(window.localStorage.getItem('token')){
      // auth.validateToken()
      
    }
    if(isLoggedIn){
      //window.location = '/dashboard'
    }
  },[])
  return (
    <Switch>
        <Route component={ApiDocs} exact path={path.apiDocs} />
        <Route component={Landing} exact path={path.root}/>
        <Route component={Login} exact path={path.login}/>
        <Route component={Signup} exact path={path.signup}/>
        <Route component={ForgotPassword} exact path={path.forgotPassword}/>
        <Route component={VerifyEmail} path={path.verifyEmail} />
        <PrivateRoute component={Dashboard}  path={path.dashboard} exact/>
        <PrivateRoute component={Project}  path={path.projects} exact/>
    </Switch>
  );
}

export default App;
