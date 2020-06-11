import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoutesLogout = ({component: Component,...rest}) => {
  let isAuth;
     const loginAuth = JSON.parse(localStorage.getItem("loginData"));
     if(loginAuth=== null)
     {
        isAuth = false
     } else{ isAuth=loginAuth }
    
  return (
    <Route  {...rest} render={prp => {
        if (!isAuth) {
           return (<Redirect to={{pathname: "/login",state: {from: prp.location}}}/>)
        } else {
          return <Component {...prp} />
        }
      }}
    />
  );
}


export default ProtectedRoutesLogout
