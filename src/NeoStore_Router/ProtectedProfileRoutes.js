import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedProfileRoutes = ({component: Component,...rest}) => {
  let isAuth;
     const loginAuth = localStorage.getItem("loginAuth");
     if(loginAuth=== null)
     {
        isAuth = false
     } else{ isAuth=loginAuth }
    
  return (
    <Route  {...rest} render={prp => {
      
      
        if (isAuth) {      
          return <Component {...prp} />
        } else {
          return (<Redirect to={{pathname: "/login",state: {from: prp.location}}}/>)
         
        }
      }}
    />
  );
}


export default ProtectedProfileRoutes
