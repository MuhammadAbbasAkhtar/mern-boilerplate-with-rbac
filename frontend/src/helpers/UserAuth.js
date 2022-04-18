// eslint-disable-next-line no-unused-vars
import { apiPost, apiGet,apiBaseUrl } from './APIRequests';
// import Logout from '../Custom/Logout';
 import pathLocations from '../data/pathLocations'


export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const setUser = (data) => {
  localStorage.setItem('user', JSON.stringify(data))
};



export const getUser = () => {
if (localStorage.getItem('user') === null) {
    return {};
}
return JSON.parse(localStorage.getItem('user'));
};

export const validateToken = async () => {
  await apiGet('/auth/validate-token', response =>  window.localStorage.setItem('loginValidated',response),  error => logOut() )

  // if(window.localStorage.getItem('loginValidated')){
  //   window.location.href = "/login"
  // }

}

export const isLoggedIn = () => {
    if (getToken() === null) {
      return false;
    // eslint-disable-next-line no-else-return
    } else if (getToken() === undefined) {
      return false;
    } else {
      return true;
    }
};

export const LoggedInRedirect = () => {
  console.log(isLoggedIn());
  if(isLoggedIn()){
    const lastUrl = localStorage.getItem('lastVisitedPage')
    
    
    if(lastUrl && lastUrl !== null && lastUrl !== 'null'){
      // localStorage.removeItem('lastVisitedPage');
      // window.location.href = lastUrl;
      window.location.href = pathLocations.dashboard;
    }
    else{
      //window.location.href = '/dashboard/';
      // window.location.href = pathLocations.createNewBanner;
      window.location.href = pathLocations.dashboard;
    }

    return true
  }
  return false
}
export const logOut = () => {


  //enhancing user logout/login experience
    localStorage.removeItem('loginValidated')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // localStorage.clear();
    localStorage.setItem('lastVisitedPage', window.location.href)
    
  window.location.href = pathLocations.login;
  
};

