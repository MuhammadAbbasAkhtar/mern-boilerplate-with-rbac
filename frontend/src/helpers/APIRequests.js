import axios from 'axios'
import * as auth from './UserAuth'
export const apiBaseUrl = "http://localhost:51235"
export const production = false
export function getCommonHeaders(h) {
    var headers = {
       "Access-Control-Allow-Origin": "*",
       "Content-Type": "application/json"
    };
    var token = auth.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (h) headers = { ...h, ...headers };
    return headers;
}

export function apiPost(endpoint, body, onSuccess, headers) {
    axios
    .post(apiBaseUrl + endpoint, body, {
        headers: getCommonHeaders(headers)
    })
    .then(response => {
        
        //if (onSuccess)
         onSuccess(response.data);
        // console.log(response)
        // return response
    })
    .catch(error => {
        
        if (error.StatusCode === 401) {
          // localStorage.clear();
          //localStorage.setItem('tokenExpire', 'true');
          //window.location.href = '/?tokenExpire=true';
          
        }
        return error
       
    })
     
}

export function apiGet(endpoint, onSuccess, onFailure, headers) {
    axios
    .get(apiBaseUrl + endpoint, {
        headers: getCommonHeaders(headers)
    })
    .then(response => {
        if (onSuccess) onSuccess(response.data);
    })
    .catch(error => {
        // console.log(`error`, error)
        // if (error.response) {
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        // }else if(error.request) {
             // The request was made but no response was received
        //     console.log(error.request);
        // } else {
             // Something happened in setting up the request that triggered an Error
        //     console.log('Error', error.message);
        // }

        if (error.response.status === 403) auth.logOut()
          
        if (onFailure) onFailure(error);
    });
}
export function apiDelete(endpoint, onSuccess, onFailure, headers) {
    axios
    .delete(apiBaseUrl + endpoint,{
        headers: getCommonHeaders(headers)
    })
    .then( response => {
        if(onSuccess) onSuccess(response.data)
    })
    .catch(error => {
        if (error.response.status === 403) auth.logOut()
          
        if (onFailure) onFailure(error);
    });
}