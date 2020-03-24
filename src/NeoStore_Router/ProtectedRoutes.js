import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from "react-redux"

const ProtectedRoutes = ({component: Component,...rest}) => {
    const localData = JSON.parse(localStorage.getItem("loginData"));
    console.log(localData);
    
  return (
    <Route  {...rest} render={props => {
        if (false) {
          return (<Redirect to={{pathname: "/",state: {from: props.location}}}/>)
        } else {
          return <Component {...props} />
        }
      }}
    />
  );
}

const mapStateToProps = state => {

	return { data: state.loginReducer.isAuthenticated };
};

export default connect(mapStateToProps,null)(ProtectedRoutes); 
