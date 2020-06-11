import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoutesLogin = ({component: Component,...rest}) => {
  let isAuth;
     const loginAuth = JSON.parse(localStorage.getItem("loginData"));
     if(loginAuth=== null)
     {
        isAuth = false
     } else{ isAuth=loginAuth }
    
  return (
    <Route  {...rest} render={prp => {
        if (!isAuth) {
           return (<Redirect to={{pathname: "/",state: {from: prp.location}}}/>)
        } else {
          return <Component {...prp} />
        }
      }}
    />
  );
}


export default ProtectedRoutesLogin
