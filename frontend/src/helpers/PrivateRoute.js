/* This is used to determine if a user is authenticated and
if they are allowed to visit the page they navigated to.

If they are: they proceed to the page
If not: they are redirected to the login page. */
import React from 'react'

import * as auth from './UserAuth'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

 /*  Add your own authentication on the below line. */
//  console.log(`auth.isLoggedIn()`, auth.isLoggedIn())
  const isLoggedIn = auth.isLoggedIn()
  const token = localStorage.getItem('token')
  // console.log(token);
  if(!token) {
    // return ( 
    // <Redirect to={{ pathname: '/login'}} />
    // )
  }


  /* enhancing user logout/login experience */
  // if(isLoggedIn ) {
  //   localStorage.setItem('lastVisitedPage', window.location.pathname)
  // }
 
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ?  <Component {...props} />  :  <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> 
      }
    />
  )
}

export default PrivateRoute

