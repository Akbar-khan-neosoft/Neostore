import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedLoginRoutes = ({component: Component,...rest}) => {
  let isAuth;
     const loginAuth = localStorage.getItem("loginAuth");
     console.log(loginAuth);
     if(loginAuth=== null)
     {
        isAuth = false
     } else{ isAuth=loginAuth }
    
  return (
    <Route  {...rest} render={prp => {
      
      
        if (isAuth) {
           return (<Redirect to={{pathname: "/",state: {from: prp.location}}}/>)
        } else {
          return <Component {...prp} />
        }
      }}
    />
  );
}


export default ProtectedLoginRoutes
